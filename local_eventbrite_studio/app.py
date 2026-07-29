"""Local-only Streamlit app that prepares data and submits it to the local API."""

from __future__ import annotations

import json
from datetime import date

import httpx
import streamlit as st

from delete_events import init_delete_state, render_delete_event_page
from drafting import (
    DEFAULT_FAQS,
    DEFAULT_TICKETS,
    MULTIPLE_CHOICE_TYPES,
    PRESENTER_QUESTION_TYPES,
    START_TIME_OPTIONS,
    build_draft_request,
    event_end,
    event_start,
    issues_for_content,
    issues_for_event,
    issues_for_registration,
    registration_start,
)
from image_utils import prepare_event_image
from studio_api import api_error_message, api_post, api_request, refresh_venues, upload_event_image
from venue import clean_text, minimum_consumption_cop, normalize_venue, venue_request, venue_validation_errors


DEFAULT_VENUES: list[dict] = []


def init_state() -> None:
    defaults = {
        "format": "Presencial",
        "venues": [venue.copy() for venue in DEFAULT_VENUES],
        "venues_loaded": False,
        "venue_id": "",
        "venue_editor_id": "Nuevo",
        "event_name": "",
        "event_date": None,
        "start_time": None,
        "capacity": 3,
        "ticket_name": "Entrada General",
        "registration_lead_days": 7,
        "presenter_question_count": 0,
        "overview": "",
        "presenter_name": "",
        "presenter_profile": "",
        "learning_points": "",
    }
    for key, value in defaults.items():
        st.session_state.setdefault(key, value)
    if not st.session_state.venues_loaded:
        st.session_state.venues = []


def local_venues() -> list[dict]:
    return st.session_state.venues


def venue_label(venue: dict) -> str:
    city = venue.get("city") or "Sin ciudad"
    return f'{venue.get("name", "Venue")} - {city} - {venue.get("id")}'


def venue_by_id(venue_id: str | None) -> dict | None:
    if not venue_id:
        return None
    for venue in local_venues():
        if venue["id"] == venue_id:
            return venue
    return None


def active_venue() -> dict | None:
    return venue_by_id(st.session_state.venue_id)


def venue_consumption_note() -> str:
    venue = active_venue()
    return clean_text(venue.get("address_2")) if venue else ""


def venue_consumption_amount() -> int:
    return minimum_consumption_cop(venue_consumption_note())


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
    }


def issues_for_venue() -> list[str]:
    if st.session_state.format == "Online":
        return []
    if not local_venues():
        return ["Crea al menos un venue local para poder usarlo en un evento presencial."]
    if not venue_by_id(st.session_state.venue_id):
        return ["Selecciona un venue valido del registro local."]
    return []


def all_issues() -> list[str]:
    return (
        issues_for_venue()
        + issues_for_event(st.session_state)
        + issues_for_registration(st.session_state)
        + issues_for_content(st.session_state)
    )


def draft_request() -> dict:
    return build_draft_request(
        st.session_state,
        venue_consumption_note=venue_consumption_note(),
        venue_consumption_amount=venue_consumption_amount(),
    )


def preview(data: dict) -> None:
    with st.expander("Preview tecnico", expanded=False):
        st.code(json.dumps(data, ensure_ascii=True, indent=2), language="json")


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
            refresh_venues(st.session_state)
            ensure_venue_selection()
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
            address_2 = st.text_area(
                "Disclaimer del lugar y consumo minimo (se guarda en Direccion linea 2)",
                value=form["address_2"],
                height=96,
                help="Incluye el texto visible para asistentes y, si aplica, un patron como $2.000 COP para detectar automaticamente el consumo minimo.",
            )
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
            }
            errors = venue_validation_errors(venue_data)
            if errors:
                st.error("No se guardo el venue:\n\n" + "\n".join(f"- {error}" for error in errors))
            else:
                try:
                    venue_payload = venue_request(venue_data)
                    if st.session_state.venue_editor_id == "Nuevo":
                        response = api_post("/venues", venue_payload)
                    else:
                        response = api_request("PATCH", f"/venues/{venue_data['id']}", venue_payload)
                    upsert_venue(normalize_venue(response))
                    queue_toast("Venue guardado correctamente en Eventbrite.")
                    st.rerun()
                except httpx.HTTPError as exc:
                    st.error(f"No se pudo guardar el venue: {api_error_message(exc)}")
        if local_venues():
            st.info(
                "Eventbrite no permite borrar venues por su API publica. Si uno ya no se usa, editalo o gestionarlo manualmente en Eventbrite."
            )

        render_blockers(issues_for_venue(), "Venue listo para usarse como input.")

    with tabs[1]:
        if st.button("Actualizar lista de venues", width="stretch"):
            try:
                refresh_venues(st.session_state)
                ensure_venue_selection()
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
    st.text_input(
        "Nombre del evento *",
        placeholder="Ejemplo: Conversacion practica sobre ...",
        key="event_name",
        max_chars=75,
        help="Este flujo simplificado no envia un resumen publico separado a Eventbrite.",
    )
    left, middle = st.columns(2)
    left.date_input("Fecha *", min_value=date.today(), key="event_date")
    middle.selectbox(
        "Hora de inicio *",
        options=START_TIME_OPTIONS,
        key="start_time",
        format_func=lambda value: value.strftime("%I:%M %p").lstrip("0"),
        help="Ventana permitida: de 8:00 a. m. a 7:00 p. m. para que la sesion termine antes de las 8:00 p. m.",
    )
    left, right = st.columns([1, 2])
    left.number_input("Aforo *", min_value=3, max_value=10, value=3, step=1, key="capacity")
    right.caption("La sesion dura exactamente 1 hora y el cierre debe quedar el mismo dia.")
    if st.session_state.format == "Presencial":
        venue = venue_by_id(st.session_state.venue_id)
        if venue:
            st.info(f"Venue activo: {venue_label(venue)}")
        else:
            st.warning("Selecciona primero un venue desde el panel lateral.")
    if event_start(st.session_state) and event_end(st.session_state):
        start = event_start(st.session_state)
        end = event_end(st.session_state)
        st.success(f"Inicio: {start.strftime('%d/%m/%Y %I:%M %p')} | Fin: {end.strftime('%d/%m/%Y %I:%M %p')} | Estado: Draft")
    else:
        st.caption("El final se calculara automaticamente una hora despues del inicio.")
    render_blockers(issues_for_event(st.session_state), "Datos del evento listos.")


def render_registration_page() -> None:
    left, right = st.columns([2, 1])
    left.selectbox("Ticket class base *", DEFAULT_TICKETS, key="ticket_name", help="Esta es la clase general; sobre ella se aplican cupos, preguntas y reglas.")
    right.number_input("Apertura, dias antes", min_value=1, max_value=90, step=1, key="registration_lead_days")
    st.caption("Ticket gratuito 'General' con un solo cupo por orden. La apertura se deriva del inicio del evento.")
    if st.session_state.format == "Presencial":
        note = venue_consumption_note()
        if note:
            st.info(note)
        if venue_consumption_amount():
            st.info("La persona debera confirmar este consumo antes de completar la orden.")
        elif active_venue():
            st.caption("Si el lugar requiere consumo minimo, agregalo en el disclaimer del venue usando un patron como $2.000 COP.")
    else:
        st.caption("Encuentro virtual: no aplica consumo minimo del lugar.")
    if registration_start(st.session_state) and event_start(st.session_state):
        st.success(
            f"Apertura: {registration_start(st.session_state).strftime('%d/%m/%Y %I:%M %p')} | Cierre: {event_start(st.session_state).strftime('%d/%m/%Y %I:%M %p')}"
        )
    st.caption("Se agregaran: telefono opcional, nivel educativo obligatorio, rango de edad obligatorio en dropdown y aceptaciones requeridas.")
    st.info(
        "Para participantes de 14-17 anos: por politicas de proteccion de menores, se requiere autorizacion de madre, padre o tutor. "
        "El formulario se enviara por email y debera presentarse el dia del evento. Aplican la regla de dos adultos, "
        "la minimizacion de datos y contenidos adecuados a la edad."
    )
    render_blockers(issues_for_registration(st.session_state), "Inscripcion lista.")


def render_content_page() -> None:
    st.text_area(
        "Overview nativo de Eventbrite *",
        placeholder="Texto principal que quieres mostrar en el overview nativo de Eventbrite, sin repetir el nombre del evento.",
        key="overview",
        height=96,
        max_chars=800,
    )
    st.caption("Si la primera linea coincide con el nombre del evento, la API la omitira para evitar el titulo duplicado en Eventbrite.")
    presenter_left, presenter_right = st.columns(2)
    presenter_left.text_input("Nombre del presentador", key="presenter_name", max_chars=80)
    presenter_right.text_area(
        "Perfil del presentador",
        key="presenter_profile",
        height=96,
        max_chars=320,
        placeholder="Breve contexto humano del presentador. Su nombre ira en bold dentro de un quote.",
    )
    st.text_area(
        "Que aprenderas",
        key="learning_points",
        height=110,
        max_chars=360,
        placeholder="Un aprendizaje por linea.\nMaximo 4 lineas.\nCada linea se publicara como ✅ bullet.",
    )
    st.number_input(
        "Preguntas opcionales del presentador",
        min_value=0,
        max_value=2,
        step=1,
        key="presenter_question_count",
        help="Se enviaran en el formulario de registro para conocer mejor a la audiencia.",
    )
    st.caption("Tipos compatibles: texto abierto, radio, dropdown y checkbox. Radio, dropdown y checkbox requieren al menos dos opciones.")
    for index in range(int(st.session_state.presenter_question_count)):
        with st.expander(f"Pregunta {index + 1}", expanded=True):
            st.text_input("Enunciado *", key=f"presenter_question_{index}")
            st.selectbox("Tipo *", list(PRESENTER_QUESTION_TYPES), key=f"presenter_question_type_{index}")
            st.checkbox("Obligatoria", key=f"presenter_question_required_{index}")
            selected_type = PRESENTER_QUESTION_TYPES[st.session_state[f"presenter_question_type_{index}"]]
            if selected_type in MULTIPLE_CHOICE_TYPES:
                st.text_area(
                    "Opciones, una por linea *",
                    key=f"presenter_question_choices_{index}",
                    placeholder="Opcion 1\nOpcion 2",
                    height=100,
                )
    uploaded = st.file_uploader("Imagen principal (opcional)", type=["jpg", "jpeg", "png"], key="event_image", help="JPEG o PNG, maximo 10 MB, proporcion 2:1.")
    if uploaded:
        normalized_image, image_notice = prepare_event_image(uploaded)
        if image_notice:
            st.warning(image_notice)
        if normalized_image:
            st.image(normalized_image, caption=f"{uploaded.name} | {normalized_image.width}x{normalized_image.height}px", width="stretch")
    render_blockers(issues_for_content(st.session_state), "Contenido listo.")
    with st.expander("FAQs", expanded=False):
        for question, answer in DEFAULT_FAQS:
            st.markdown(f"**{question}**")
            st.markdown(f"*{answer}*")


def render_review_page() -> None:
    data = draft_request()
    current_issues = all_issues()
    if current_issues:
        st.error("El borrador no esta listo. Estos son los bloqueos exactos:")
        for issue in current_issues:
            st.write(f"- {issue}")
    else:
        st.success("El borrador pasa todas las validaciones locales.")
    one, two, three, four = st.columns(4)
    one.metric("Estado final", "Live")
    two.metric("Duracion", "1 hora")
    three.metric("Ticket class", data["ticket_name"] or "General")
    four.metric("Cierre", "Mismo dia")
    st.caption("La accion principal crea el evento, sube la imagen si existe y lo publica para que quede listo con reserva activa en Eventbrite.")
    if st.button("Crear y publicar evento", type="primary", width="stretch", disabled=bool(current_issues)):
        try:
            result = api_post("/event-instantiations", data)
            event_id = str(result["event"]["id"])
            st.session_state.created_event_id = event_id
            uploaded = st.session_state.get("event_image")
            if uploaded:
                upload_event_image(event_id, uploaded)
            published = api_post(f"/event-instantiations/{event_id}/publish", {})
            st.toast("Evento creado, validado y publicado correctamente.")
            st.success(f"Evento listo en Eventbrite: {published.get('url', event_id)}")
        except httpx.HTTPError as exc:
            st.error(f"No se pudo crear o publicar el evento: {api_error_message(exc)}")
    event_id = st.session_state.get("created_event_id")
    if event_id:
        uploaded = st.session_state.get("event_image")
        if uploaded and st.button("Subir o reemplazar imagen del evento", width="stretch"):
            try:
                upload_event_image(event_id, uploaded)
                st.toast("Imagen asociada correctamente al evento.")
            except httpx.HTTPError as exc:
                st.error(f"No se pudo asociar la imagen: {api_error_message(exc)}")
        if st.button("Publicar evento pendiente", width="stretch"):
            try:
                published = api_post(f"/event-instantiations/{event_id}/publish", {})
                st.toast("Evento publicado correctamente.")
                st.success(f"Evento publicado: {published.get('url', event_id)}")
            except httpx.HTTPError as exc:
                st.error(f"No se pudo publicar: {api_error_message(exc)}")
    st.download_button(
        "Descargar JSON del evento",
        data=json.dumps(data, ensure_ascii=True, indent=2),
        file_name="circle_up_event.json",
        mime="application/json",
        width="stretch",
        disabled=bool(current_issues),
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


def render_create_event_page() -> None:
    st.title("Preparar un evento Circle Up")
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


st.set_page_config(page_title="Circle Up | Studio", page_icon="CU", layout="wide")
init_state()
init_delete_state()
sanitize_start_time()
ensure_venue_selection()
show_pending_toast()

navigation = st.navigation(
    [
        st.Page(render_create_event_page, title="Create Event", default=True),
        st.Page(render_delete_event_page, title="Delete Event"),
    ]
)
navigation.run()
