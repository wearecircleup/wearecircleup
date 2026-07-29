"""Local-only Streamlit wireframe. It does not call Eventbrite or any API."""

from __future__ import annotations

import json
import os
from io import BytesIO
from datetime import date, datetime, time, timedelta
from zoneinfo import ZoneInfo

from PIL import Image
import httpx
import streamlit as st

from venue import clean_text, normalize_venue, venue_request, venue_validation_errors


TIMEZONE = "America/Bogota"
API_URL = os.getenv("CIRCLE_UP_API_URL", "http://127.0.0.1:8000").rstrip("/")
START_TIME_OPTIONS = tuple(
    datetime(2000, 1, 1, hour=hour, minute=minute).time()
    for hour in range(8, 19)
    for minute in (0, 30)
) + (time(19, 0),)
DEFAULT_FAQS = [
    ("Circle Up y la participacion", "Circle Up es un proyecto de investigacion que une tecnologia, personas y academia. Cada encuentro dura una hora, reune de cuatro a diez personas y es gratuito; un lugar comercial puede tener un consumo minimo previamente comunicado."),
    ("Datos y convivencia", "Solicitamos solo la informacion necesaria para organizar el encuentro, registrar asistencia y aprender de la actividad. Tratamos a todas las personas con respeto, cuidamos el espacio anfitrion y seguimos sus reglas razonables."),
]
DEFAULT_TICKETS = ["General", "Clase gratuita"]
TOPIC_INTEREST_QUESTION = "Que tema te interesa mas para este encuentro?"
TOPIC_INTEREST_CHOICES = [
    "Tecnologia y herramientas digitales",
    "Aprendizaje y estudio",
    "Comunidad y redes",
    "Bienestar y vida diaria",
    "Otro o aun no lo se",
]
EDUCATION_LEVEL_QUESTION = "Cual es tu nivel educativo actual?"
EDUCATION_LEVEL_CHOICES = [
    "Primaria",
    "Secundaria o bachillerato",
    "Tecnico o tecnologo",
    "Universitario",
    "Posgrado",
    "Prefiero no responder",
]
AGE_RANGE_QUESTION = "Selecciona tu rango de edad"
AGE_RANGE_CHOICES = [
    "14–17 años — entiendo que recibiré un formulario de autorización; deberá estar completo para su verificación el día del evento.",
    "18–24 años",
    "25–34 años",
    "35–44 años",
    "45–54 años",
    "55 años o más",
]
DEFAULT_VENUES: list[dict] = []

# Eventbrite does not offer conditional registration questions.  Keep the
# minor-participation policy in the only applicable age-range choice.
AGE_RANGE_CHOICES[0] = (
    "14-17 anos - requiere autorizacion de madre, padre o tutor; el formulario se enviara por email "
    "y debera presentarse el dia del evento. Aplican la regla de dos adultos, datos minimos y materiales adecuados a la edad."
)


def init_state() -> None:
    defaults = {
        "event_status": "draft",
        "format": "Presencial",
        "venues": [venue.copy() for venue in DEFAULT_VENUES],
        "venues_loaded": False,
        "venue_id": "",
        "venue_editor_id": "Nuevo",
        "event_name": "",
        "summary": "",
        "event_date": None,
        "start_time": None,
        "capacity": None,
        "ticket_name": "General",
        "registration_lead_days": 7,
        "description": "",
        "arrival": "",
        "materials": "",
        "draft_saved": False,
    }
    for key, value in defaults.items():
        st.session_state.setdefault(key, value)
    if not st.session_state.venues_loaded:
        st.session_state.venues = []


def local_datetime(day: date | None, clock: time | None) -> datetime | None:
    if not day or not clock:
        return None
    return datetime.combine(day, clock, tzinfo=ZoneInfo(TIMEZONE))


def utc_value(moment: datetime | None) -> str:
    return moment.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%SZ") if moment else ""


def event_start() -> datetime | None:
    return local_datetime(st.session_state.event_date, st.session_state.start_time)


def event_end() -> datetime | None:
    start = event_start()
    return start + timedelta(hours=1) if start else None


def event_arrival() -> datetime | None:
    start = event_start()
    return start - timedelta(minutes=10) if start else None


def event_closes_same_day() -> bool:
    start = event_start()
    end = event_end()
    return bool(start and end and start.date() == end.date())


def registration_start() -> datetime | None:
    start = event_start()
    if not start:
        return None
    return start - timedelta(days=int(st.session_state.registration_lead_days or 0))


def local_venues() -> list[dict]:
    return st.session_state.venues


def venue_label(venue: dict) -> str:
    city = venue.get("city") or "Sin ciudad"
    return f'{venue.get("name", "Venue")} · {city} · {venue.get("id")}'


def venue_by_id(venue_id: str | None) -> dict | None:
    if not venue_id:
        return None
    for venue in local_venues():
        if venue["id"] == venue_id:
            return venue
    return None


def ensure_venue_selection() -> None:
    if local_venues() and not venue_by_id(st.session_state.venue_id):
        st.session_state.venue_id = local_venues()[0]["id"]


def next_venue_id() -> str:
    numeric_ids = [int(venue["id"]) for venue in local_venues() if str(venue.get("id", "")).isdigit()]
    return str(max(numeric_ids, default=2998243227926000) + 1)


def upsert_venue(data: dict) -> None:
    venues = local_venues()
    updated = False
    for index, venue in enumerate(venues):
        if venue["id"] == data["id"]:
            venues[index] = data
            updated = True
            break
    if not updated:
        venues.append(data)
    st.session_state.venues = venues
    st.session_state.pending_venue_selection = data["id"]


def delete_venue(venue_id: str) -> None:
    venues = [venue for venue in local_venues() if venue["id"] != venue_id]
    st.session_state.venues = venues
    if venues:
        st.session_state.pending_venue_selection = venues[0]["id"]
    else:
        st.session_state.pending_venue_selection = ""


def apply_pending_venue_selection() -> None:
    selected = st.session_state.pop("pending_venue_selection", None)
    if selected is None:
        return
    st.session_state.venue_id = selected
    st.session_state.venue_editor_id = selected if selected else "Nuevo"


def queue_toast(message: str) -> None:
    st.session_state.pending_toast = message


def show_pending_toast() -> None:
    message = st.session_state.pop("pending_toast", None)
    if message:
        st.toast(message)


def current_venue_form() -> dict:
    selected = venue_by_id(st.session_state.venue_editor_id)
    if selected:
        return selected
    return {
        "id": next_venue_id(),
        "name": "",
        "address_1": "",
        "address_2": "",
        "city": "",
        "region": "",
        "postal_code": "",
        "country": "CO",
        "latitude": None,
        "longitude": None,
        "description": "",
    }


def issues_for_venue() -> list[str]:
    if st.session_state.format == "Online":
        return []
    if not local_venues():
        return ["Crea al menos un venue local para poder usarlo en un encuentro presencial."]
    venue = venue_by_id(st.session_state.venue_id)
    if not venue:
        return ["Selecciona un venue valido del registro local."]
    return []


def issues_for_event() -> list[str]:
    issues = []
    if not st.session_state.event_name.strip():
        issues.append("Falta el nombre del encuentro.")
    if len(st.session_state.summary.strip()) > 140:
        issues.append("El resumen supera el limite de 140 caracteres.")
    if not st.session_state.event_date:
        issues.append("Falta la fecha del encuentro.")
    if not st.session_state.start_time:
        issues.append("Falta la hora de inicio.")
    if st.session_state.start_time and st.session_state.start_time not in START_TIME_OPTIONS:
        issues.append("La hora de inicio debe estar entre 8:00 a. m. y 7:00 p. m.")
    if st.session_state.capacity is None:
        issues.append("Falta definir el aforo; no existe un valor predeterminado.")
    if event_start() and not event_closes_same_day():
        issues.append("El evento dura 1 hora pero cruza al dia siguiente; debe cerrar el mismo dia.")
    return issues


def issues_for_registration() -> list[str]:
    issues = []
    if not st.session_state.ticket_name.strip():
        issues.append("Falta el nombre del ticket gratuito.")
    if st.session_state.registration_lead_days is None:
        issues.append("Falta definir cuantas dias antes se abren las inscripciones.")
    elif st.session_state.registration_lead_days <= 0:
        issues.append("Las inscripciones deben abrir antes del inicio del encuentro.")
    return issues


def issues_for_content() -> list[str]:
    issues = []
    if not st.session_state.description.strip():
        issues.append("Falta describir el tema o la actividad del encuentro.")
    if not st.session_state.arrival.strip():
        issues.append("Faltan las instrucciones de llegada.")
    return issues


def all_issues() -> list[str]:
    return issues_for_venue() + issues_for_event() + issues_for_registration() + issues_for_content()


def content_html() -> str:
    faqs = "".join(f"<p><strong>{question}.</strong> {answer}</p>" for question, answer in DEFAULT_FAQS)
    materials = st.session_state.materials or "No necesitas llevar equipo adicional salvo que el evento lo especifique."
    return (
        f"<p><strong>Sobre este encuentro.</strong> {st.session_state.description}</p>"
        f"<p><strong>Llegada.</strong> {st.session_state.arrival}</p>"
        f"<p><strong>Que llevar.</strong> {materials}</p>"
        "<p><strong>Si no puedes asistir.</strong> Libera tu cupo en Eventbrite tan pronto como puedas para que otra persona pueda participar.</p>"
        f"{faqs}"
    )


def payload() -> dict:
    questions = [
        {
            "question": {"html": TOPIC_INTEREST_QUESTION},
            "type": "dropdown",
            "required": False,
            "choices": [{"answer": {"html": choice}} for choice in TOPIC_INTEREST_CHOICES],
            "ticket_classes": [],
        },
        {
            "question": {"html": EDUCATION_LEVEL_QUESTION},
            "type": "dropdown",
            "required": True,
            "choices": [{"answer": {"html": choice}} for choice in EDUCATION_LEVEL_CHOICES],
            "ticket_classes": [],
        },
        {
            "question": {"html": AGE_RANGE_QUESTION},
            "type": "radio",
            "required": True,
            "choices": [{"answer": {"html": choice}} for choice in AGE_RANGE_CHOICES],
            "ticket_classes": [],
        },
        {
            "question": {
                "html": "Confirmo que leere la informacion del evento, respetare a las demas personas y seguire las reglas razonables del lugar."
            },
            "type": "checkbox",
            "required": True,
            "choices": [{"answer": {"html": "Confirmo"}}],
            "ticket_classes": [],
        },
    ]

    event = {
        "name": {"html": st.session_state.event_name},
        "summary": st.session_state.summary,
        "start": {"utc": utc_value(event_start()), "timezone": TIMEZONE},
        "end": {"utc": utc_value(event_end()), "timezone": TIMEZONE},
        "status": st.session_state.event_status,
        "currency": "USD",
        "organizer_id": "121240412403",
        "online_event": st.session_state.format == "Online",
        "capacity": st.session_state.capacity,
    }
    if st.session_state.format == "Presencial":
        event["venue_id"] = st.session_state.venue_id.strip()

    return {
        "event": event,
        "ticket_class": {
            "name": st.session_state.ticket_name,
            "free": True,
            "quantity_total": st.session_state.capacity,
            "maximum_quantity": 1,
            "sales_start": utc_value(registration_start()),
            "sales_end": utc_value(event_start()),
        },
        "questions": questions,
        "structured_content": {
            "version_number": 1,
            "purpose": "listing",
            "publish": True,
            "modules": [
                {
                    "type": "text",
                    "data": {
                        "body": {
                            "type": "text",
                            "alignment": "left",
                            "text": content_html(),
                        }
                    },
                }
            ],
        },
    }


def prepare_event_image(uploaded):
    if not uploaded:
        return None, None
    try:
        image = Image.open(uploaded).convert("RGB")
    except Exception:
        return None, "La imagen no es valida. Es opcional, asi que el borrador sigue sin ella."

    width, height = image.size
    if width <= 0 or height <= 0:
        return None, "La imagen no es valida. Es opcional, asi que el borrador sigue sin ella."

    current_ratio = width / height
    if abs(current_ratio - 2) <= 0.01:
        uploaded.seek(0)
        return image, None

    if current_ratio > 2:
        target_width = height * 2
        left = max(0, (width - target_width) // 2)
        image = image.crop((left, 0, left + target_width, height))
    else:
        target_width = width if width % 2 == 0 else width - 1
        target_height = max(1, target_width // 2)
        top = max(0, (height - target_height) // 2)
        image = image.crop((0, top, target_width, top + target_height))

    uploaded.seek(0)
    return image, (
        f"La imagen se ajusto automaticamente a 2:1. Ejemplos validos: 2400x1200 px, 1600x800 px, 1200x600 px. "
        f"Tu archivo original era {width}x{height} px."
    )


def preview(data: dict) -> None:
    with st.expander("Preview tecnico", expanded=False):
        st.code(json.dumps(data, ensure_ascii=True, indent=2), language="json")


def mark_draft_ready() -> None:
    st.session_state.draft_saved = True


def api_request(method: str, path: str, body: dict | None = None) -> dict:
    response = httpx.request(method, f"{API_URL}{path}", json=body, timeout=60.0)
    response.raise_for_status()
    return response.json()


def api_post(path: str, body: dict) -> dict:
    return api_request("POST", path, body)


def api_error_message(exc: httpx.HTTPError) -> str:
    response = getattr(exc, "response", None)
    if response is not None:
        return response.text
    return f"No se pudo conectar con la API local en {API_URL}. Inicia la API con uv run uvicorn app.main:app --reload --port 8000."


def refresh_venues() -> None:
    response = httpx.get(f"{API_URL}/venues", params={"page": 1}, timeout=30.0)
    response.raise_for_status()
    st.session_state.venues = [normalize_venue(venue) for venue in response.json().get("venues", [])]
    st.session_state.venues_loaded = True
    ensure_venue_selection()


def upload_event_image(event_id: str, uploaded) -> dict:
    image, _ = prepare_event_image(uploaded)
    if not image:
        return {}
    instructions = httpx.get(f"{API_URL}/events/{event_id}/image/upload-request", timeout=30.0)
    instructions.raise_for_status()
    data = instructions.json()
    binary = BytesIO()
    image.save(binary, format="JPEG", quality=90)
    binary_upload = httpx.post(
        f"{API_URL}/events/{event_id}/image/upload-binary",
        data={
            "upload_url": data["upload_url"],
            "upload_data": json.dumps(data["upload_data"]),
            "file_parameter_name": data.get("file_parameter_name", "file"),
        },
        files={"image": ("event-image.jpg", binary.getvalue(), "image/jpeg")},
        timeout=90.0,
    )
    binary_upload.raise_for_status()
    width, height = image.size
    return api_post(
        f"/events/{event_id}/image/complete",
        {"upload_token": data["upload_token"], "crop_mask": {"top_left": {"x": 0, "y": 0}, "width": width, "height": height}},
    )


def render_blockers(issues: list[str], ready: str) -> None:
    if not issues:
        st.success(ready)
        return
    st.warning("Bloqueos faltantes")
    for issue in issues:
        st.write(f"- {issue}")


def render_venue_page() -> None:
    apply_pending_venue_selection()
    if not st.session_state.venues_loaded:
        try:
            refresh_venues()
        except httpx.HTTPError as exc:
            st.error(f"No se pudo cargar venues: {api_error_message(exc)}")
            return
    tabs = st.tabs(["Crear o editar venue", "Lista de venues"])

    with tabs[0]:
        editor_options = ["Nuevo"] + [venue["id"] for venue in local_venues()]
        st.selectbox(
            "Editar venue guardado",
            options=editor_options,
            format_func=lambda venue_id: "Nuevo" if venue_id == "Nuevo" else venue_label(venue_by_id(venue_id) or {}),
            key="venue_editor_id",
        )
        form = current_venue_form()
        with st.form("venue_form"):
            name = st.text_input("Nombre del venue *", value=form["name"])
            address_1 = st.text_input("Direccion linea 1", value=form["address_1"])
            address_2 = st.text_input("Direccion linea 2", value=form["address_2"])
            city = st.text_input("Ciudad", value=form["city"])
            region = st.text_input("Region / departamento", value=form["region"])
            postal_code = st.text_input("Codigo postal", value=form["postal_code"])
            country = st.text_input("Pais *", value=form["country"], max_chars=2)
            latitude = st.number_input(
                "Latitud",
                value=float(form["latitude"]) if form["latitude"] is not None else None,
                placeholder="Opcional",
                format="%.6f",
            )
            longitude = st.number_input(
                "Longitud",
                value=float(form["longitude"]) if form["longitude"] is not None else None,
                placeholder="Opcional",
                format="%.6f",
            )
            description = st.text_area("Descripcion", value=form["description"], height=80)
            save = st.form_submit_button("Guardar venue", type="primary", width="stretch")
        if save:
            venue_data = {
                    "id": form["id"] if st.session_state.venue_editor_id != "Nuevo" else next_venue_id(),
                    "name": clean_text(name),
                    "address_1": clean_text(address_1),
                    "address_2": clean_text(address_2),
                    "city": clean_text(city),
                    "region": clean_text(region),
                    "postal_code": clean_text(postal_code),
                    "country": clean_text(country)[:2].upper() or "CO",
                    "latitude": latitude,
                    "longitude": longitude,
                    "description": clean_text(description),
                }
            errors = venue_validation_errors(venue_data)
            if errors:
                st.error("No se guardo el venue:\n\n" + "\n".join(f"- {error}" for error in errors))
            else:
                try:
                    payload = venue_request(venue_data)
                    if st.session_state.venue_editor_id == "Nuevo":
                        response = api_post("/venues", payload)
                    else:
                        response = api_request("PATCH", f"/venues/{venue_data['id']}", payload)
                    upsert_venue(normalize_venue(response))
                    queue_toast("Venue guardado correctamente en Eventbrite.")
                    st.rerun()
                except httpx.HTTPError as exc:
                    st.error(f"No se pudo guardar el venue: {api_error_message(exc)}")
        if st.session_state.venue_editor_id != "Nuevo" and venue_by_id(st.session_state.venue_editor_id):
            if st.button("Eliminar venue seleccionado", type="secondary", width="stretch"):
                try:
                    response = httpx.delete(f"{API_URL}/venues/{st.session_state.venue_editor_id}", params={"confirm": "true"}, timeout=30.0)
                    response.raise_for_status()
                    delete_venue(st.session_state.venue_editor_id)
                    queue_toast("Venue eliminado correctamente en Eventbrite.")
                    st.rerun()
                except httpx.HTTPError as exc:
                    st.error(f"No se pudo eliminar el venue: {api_error_message(exc)}")

        render_blockers(issues_for_venue(), "Venue listo para usarse como input.")

    with tabs[1]:
        if st.button("Actualizar lista de venues", width="stretch"):
            try:
                refresh_venues()
                queue_toast("Lista de venues actualizada.")
                st.rerun()
            except httpx.HTTPError as exc:
                st.error(f"No se pudo actualizar la lista: {api_error_message(exc)}")
        if not local_venues():
            st.warning("Todavia no hay venues locales.")
        else:
            st.dataframe(
                [
                    {
                        "id": venue["id"],
                        "name": venue["name"],
                        "city": venue.get("city"),
                        "region": venue.get("region"),
                        "country": venue.get("country"),
                        "address_1": venue.get("address_1"),
                    }
                    for venue in local_venues()
                ],
                width="stretch",
                hide_index=True,
            )
        if local_venues():
            st.selectbox(
                "Venue activo para el evento",
                options=[venue["id"] for venue in local_venues()],
                format_func=lambda venue_id: venue_label(venue_by_id(venue_id) or {}),
                key="venue_id",
            )
            active = venue_by_id(st.session_state.venue_id)
            if active:
                st.info(f"Activo: {venue_label(active)}")


def render_event_page() -> None:
    st.text_input("Nombre del encuentro *", placeholder="Ejemplo: Conversacion practica sobre ...", key="event_name")
    st.text_input("Resumen publico", max_chars=140, placeholder="Invitacion breve y concreta.", key="summary")
    left, middle, right = st.columns(3)
    left.date_input("Fecha *", min_value=date.today(), key="event_date")
    middle.selectbox(
        "Hora de inicio *",
        options=START_TIME_OPTIONS,
        key="start_time",
        format_func=lambda value: value.strftime("%I:%M %p").lstrip("0"),
        help="Ventana permitida: de 8:00 a. m. a 7:00 p. m. para que el encuentro termine antes de las 8:00 p. m.",
    )
    arrival = event_arrival()
    if arrival:
        right.success(f"Llegada auto: {arrival.strftime('%I:%M %p').lstrip('0')} (-10 min)")
    else:
        right.caption("La hora de llegada se calcula automaticamente 10 min antes.")
    left, right = st.columns([1, 2])
    left.number_input("Aforo *", min_value=1, max_value=10, value=None, step=1, placeholder="4 a 10", key="capacity")
    right.caption("El encuentro dura exactamente 1 hora y el cierre debe quedar el mismo dia.")
    if st.session_state.format == "Presencial":
        venue = venue_by_id(st.session_state.venue_id)
        if venue:
            st.info(f"Venue activo: {venue_label(venue)}")
        else:
            st.warning("Selecciona primero un venue desde el panel lateral.")
    if event_start() and event_end():
        start = event_start()
        end = event_end()
        st.success(f"Inicio: {start.strftime('%d/%m/%Y %I:%M %p')} | Fin: {end.strftime('%d/%m/%Y %I:%M %p')} | Estado: {st.session_state.event_status.title()}")
    else:
        st.caption("El final se calculara automaticamente una hora despues del inicio.")
    render_blockers(issues_for_event(), "Datos del encuentro listos.")


def render_registration_page() -> None:
    left, right = st.columns([2, 1])
    left.selectbox("Ticket class base *", DEFAULT_TICKETS, key="ticket_name", help="Esta es la clase general; sobre ella se aplican cupos, preguntas y reglas.")
    right.number_input("Apertura, dias antes", min_value=1, max_value=90, step=1, key="registration_lead_days")
    st.caption("Ticket gratuito 'General' con un solo cupo por orden. La apertura se deriva del inicio del evento.")
    if registration_start() and event_start():
        st.success(
            f"Apertura: {registration_start().strftime('%d/%m/%Y %I:%M %p')} | Cierre: {event_start().strftime('%d/%m/%Y %I:%M %p')}"
        )
    st.caption("Se agregaran: interes tematico opcional, nivel educativo obligatorio, rango de edad y confirmacion de convivencia.")
    st.info(
        "Para participantes de 14-17 años: por políticas de protección de menores, se requiere autorización de madre, padre o tutor. "
        "El formulario se enviará por email y deberá presentarse el día del evento. Aplican la regla de dos adultos, "
        "la minimización de datos y contenidos adecuados a la edad."
    )
    render_blockers(issues_for_registration(), "Inscripcion lista.")


def render_content_page() -> None:
    st.text_area("Descripcion del encuentro *", placeholder="Que aprenderan o haran las personas durante esta hora?", key="description", height=96)
    st.text_area("Instrucciones de llegada *", placeholder="Ejemplo: Busca la mesa de Circle Up desde las 5:50 p. m.", key="arrival", height=72)
    st.text_input("Que llevar", placeholder="Ejemplo: Un cuaderno y curiosidad.", key="materials")
    uploaded = st.file_uploader("Imagen principal (opcional)", type=["jpg", "jpeg", "png"], key="event_image", help="JPEG o PNG, maximo 10 MB, proporcion 2:1.")
    if uploaded:
        normalized_image, image_notice = prepare_event_image(uploaded)
        if image_notice:
            st.warning(image_notice)
        if normalized_image:
            st.image(normalized_image, caption=f"{uploaded.name} | {normalized_image.width}x{normalized_image.height}px", width="stretch")
    render_blockers(issues_for_content(), "Contenido listo.")
    with st.expander("FAQs predeterminadas", expanded=False):
        for question, answer in DEFAULT_FAQS:
            st.markdown(f"**{question}**")
            st.caption(answer)


def render_review_page() -> None:
    data = payload()
    if issues:
        st.error("El borrador no esta listo. Estos son los bloqueos exactos:")
        for issue in issues:
            st.write(f"- {issue}")
    else:
        st.success("El borrador pasa todas las validaciones locales.")
    one, two, three, four = st.columns(4)
    one.metric("Estado", data["event"]["status"].title())
    two.metric("Duracion", "1 hora")
    three.metric("Ticket class", data["ticket_class"]["name"] or "General")
    four.metric("Cierre", "Mismo dia")
    if st.button("Crear y validar borrador", type="primary", width="stretch", disabled=bool(issues)):
        try:
            result = api_post("/event-instantiations", data)
            event_id = str(result["event"]["id"])
            st.session_state.created_event_id = event_id
            st.session_state.draft_saved = True
            uploaded = st.session_state.get("event_image")
            if uploaded:
                upload_event_image(event_id, uploaded)
            st.toast("Borrador creado y validado correctamente.")
            st.success(f"Borrador validado en Eventbrite: {event_id}")
        except httpx.HTTPError as exc:
            st.error(f"No se pudo crear el borrador: {api_error_message(exc)}")
    event_id = st.session_state.get("created_event_id")
    if event_id:
        uploaded = st.session_state.get("event_image")
        if uploaded and st.button("Subir o reemplazar imagen del borrador", width="stretch"):
            try:
                upload_event_image(event_id, uploaded)
                st.toast("Imagen asociada correctamente al borrador.")
            except httpx.HTTPError as exc:
                st.error(f"No se pudo asociar la imagen: {api_error_message(exc)}")
        if st.button("Publicar borrador validado", width="stretch"):
            try:
                published = api_post(f"/event-instantiations/{event_id}/publish", {})
                st.toast("Borrador publicado correctamente.")
                st.success(f"Evento publicado: {published.get('url', event_id)}")
            except httpx.HTTPError as exc:
                st.error(f"No se pudo publicar: {api_error_message(exc)}")
    st.download_button(
        "Descargar JSON del borrador",
        data=json.dumps(data, ensure_ascii=True, indent=2),
        file_name="circle_up_event_draft.json",
        mime="application/json",
        width="stretch",
        disabled=bool(issues),
    )
    preview(data)


def sanitize_start_time() -> None:
    start_time = st.session_state.get("start_time")
    if start_time is None or start_time in START_TIME_OPTIONS:
        return
    nearest = min(
        START_TIME_OPTIONS,
        key=lambda option: abs((option.hour * 60 + option.minute) - (start_time.hour * 60 + start_time.minute)),
    )
    st.session_state.start_time = nearest


st.set_page_config(page_title="Circle Up | Borrador", page_icon="CU", layout="wide")
init_state()
sanitize_start_time()
ensure_venue_selection()
show_pending_toast()

st.title("Preparar un encuentro Circle Up")
st.caption("El borrador se conserva en esta sesion y se envia a la API local solo desde Revision.")

issues = all_issues()
st.caption(f"Estado: Draft | {len(issues)} bloqueo(s) pendiente(s).")

venue_tab, event_tab, registration_tab, content_tab, review_tab = st.tabs(
    ["1. Venues", "2. Encuentro", "3. Inscripcion", "4. Contenido", "5. Revision"]
)

with venue_tab:
    st.radio("Modalidad", ["Presencial", "Online"], horizontal=True, key="format")
    render_venue_page()
with event_tab:
    render_event_page()
with registration_tab:
    render_registration_page()
with content_tab:
    render_content_page()
with review_tab:
    render_review_page()
