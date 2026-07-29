from __future__ import annotations

from datetime import date, datetime, time, timedelta
from typing import Any, Mapping
from zoneinfo import ZoneInfo

from venue import clean_text


TIMEZONE = "America/Bogota"
START_TIME_OPTIONS = tuple(
    datetime(2000, 1, 1, hour=hour, minute=minute).time()
    for hour in range(8, 19)
    for minute in (0, 30)
) + (time(19, 0),)
DEFAULT_FAQS = [
    (
        "¿Qué es Circle Up Community?",
        "Un proyecto de investigación que conecta tecnología, comunidad y academia mediante aprendizaje comunitario.",
    ),
    (
        "¿Cómo es el encuentro?",
        "Dura hasta una hora, reúne de 3 a 10 personas y se adapta a cualquier espacio. ¿Conoces uno? Cuéntanos y lo gestionamos.",
    ),
    (
        "¿Tiene algún costo?",
        "Participar es gratuito y Circle Up no recibe dinero por este encuentro. Algunos espacios pueden tener un consumo mínimo como parte de su acuerdo con el lugar. Si aplica, encontrarás el valor y las condiciones en la descripción del sitio en Eventbrite. Para encuentros virtuales, no aplica.",
    ),
    (
        "¿Cómo usamos tus datos?",
        "Al inscribirte, autorizas el tratamiento de los datos que proporcionas, conforme a la Ley 1581 de 2012, únicamente para gestionar tu inscripción, registrar tu asistencia, enviarte información y notificaciones relacionadas con el evento, y apoyar la actividad de investigación. Solicitamos solo la información necesaria y no compartiremos tus datos personales con terceros.",
    ),
]
DEFAULT_TICKETS = ["Entrada General"]
PRESENTER_QUESTION_TYPES = {
    "Texto abierto": "text",
    "Radio (una respuesta)": "radio",
    "Dropdown (una respuesta)": "dropdown",
    "Checkbox (varias respuestas)": "checkbox",
}
MULTIPLE_CHOICE_TYPES = {"radio", "dropdown", "checkbox"}


def local_datetime(day: date | None, clock: time | None) -> datetime | None:
    if not day or not clock:
        return None
    return datetime.combine(day, clock, tzinfo=ZoneInfo(TIMEZONE))


def utc_value(moment: datetime | None) -> str:
    return moment.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%SZ") if moment else ""


def event_start(state: Mapping[str, Any]) -> datetime | None:
    return local_datetime(state.get("event_date"), state.get("start_time"))


def event_end(state: Mapping[str, Any]) -> datetime | None:
    start = event_start(state)
    return start + timedelta(hours=1) if start else None


def event_closes_same_day(state: Mapping[str, Any]) -> bool:
    start = event_start(state)
    end = event_end(state)
    return bool(start and end and start.date() == end.date())


def registration_start(state: Mapping[str, Any]) -> datetime | None:
    start = event_start(state)
    if not start:
        return None
    return start - timedelta(days=int(state.get("registration_lead_days") or 0))


def issues_for_event(state: Mapping[str, Any]) -> list[str]:
    issues = []
    if not str(state.get("event_name", "")).strip():
        issues.append("Falta el nombre del evento.")
    if len(str(state.get("event_name", "")).strip()) > 75:
        issues.append("El nombre del evento no puede superar 75 caracteres.")
    if not state.get("event_date"):
        issues.append("Falta la fecha del evento.")
    if not state.get("start_time"):
        issues.append("Falta la hora de inicio.")
    if state.get("start_time") and state.get("start_time") not in START_TIME_OPTIONS:
        issues.append("La hora de inicio debe estar entre 8:00 a. m. y 7:00 p. m.")
    if state.get("capacity") is None:
        issues.append("Falta definir el aforo; no existe un valor predeterminado.")
    if event_start(state) and not event_closes_same_day(state):
        issues.append("El evento dura 1 hora pero cruza al dia siguiente; debe cerrar el mismo dia.")
    return issues


def issues_for_registration(state: Mapping[str, Any]) -> list[str]:
    issues = []
    if not str(state.get("ticket_name", "")).strip():
        issues.append("Falta el nombre del ticket gratuito.")
    if state.get("registration_lead_days") is None:
        issues.append("Falta definir cuantas dias antes se abren las inscripciones.")
    elif state.get("registration_lead_days") <= 0:
        issues.append("Las inscripciones deben abrir antes del inicio del evento.")
    return issues


def issues_for_content(state: Mapping[str, Any]) -> list[str]:
    issues = []
    overview = str(state.get("overview", "")).strip()
    if not overview:
        issues.append("Falta el contenido del overview nativo de Eventbrite.")
    if len(overview) > 800:
        issues.append("El overview nativo de Eventbrite no puede superar 800 caracteres.")
    presenter_name = clean_text(state.get("presenter_name", ""))
    presenter_profile = str(state.get("presenter_profile", "")).strip()
    learning_points = [
        point.strip()
        for point in str(state.get("learning_points", "")).splitlines()
        if point.strip()
    ]
    if presenter_name and not presenter_profile:
        issues.append("Falta el perfil del presentador.")
    if presenter_profile and not presenter_name:
        issues.append("Falta el nombre del presentador.")
    if len(learning_points) > 4:
        issues.append("Que aprenderas admite maximo 4 bullets.")
    for index in range(int(state.get("presenter_question_count", 0))):
        prompt = clean_text(state.get(f"presenter_question_{index}", ""))
        label = state.get(f"presenter_question_type_{index}", "Texto abierto")
        question_type = PRESENTER_QUESTION_TYPES[label]
        if not prompt:
            issues.append(f"Falta el enunciado de la pregunta opcional {index + 1}.")
        if question_type in MULTIPLE_CHOICE_TYPES:
            choices = [
                choice.strip()
                for choice in str(state.get(f"presenter_question_choices_{index}", "")).splitlines()
                if choice.strip()
            ]
            if len(choices) < 2:
                issues.append(f"La pregunta opcional {index + 1} necesita al menos dos opciones.")
    return issues


def presenter_questions(state: Mapping[str, Any]) -> list[dict]:
    questions = []
    for index in range(int(state.get("presenter_question_count", 0))):
        label = state.get(f"presenter_question_type_{index}", "Texto abierto")
        question_type = PRESENTER_QUESTION_TYPES[label]
        question = {
            "prompt": clean_text(state.get(f"presenter_question_{index}", "")),
            "type": question_type,
            "required": bool(state.get(f"presenter_question_required_{index}", False)),
            "choices": [],
        }
        if question_type in MULTIPLE_CHOICE_TYPES:
            question["choices"] = [
                choice.strip()
                for choice in str(state.get(f"presenter_question_choices_{index}", "")).splitlines()
                if choice.strip()
            ]
        questions.append(question)
    return questions


def build_draft_request(
    state: Mapping[str, Any],
    *,
    venue_consumption_note: str,
    venue_consumption_amount: int,
) -> dict:
    return {
        "name": str(state.get("event_name", "")).strip(),
        "start": utc_value(event_start(state)),
        "end": utc_value(event_end(state)),
        "timezone": TIMEZONE,
        "online_event": state.get("format") == "Online",
        "venue_id": str(state.get("venue_id", "")).strip() or None,
        "capacity": state.get("capacity"),
        "ticket_name": str(state.get("ticket_name", "")).strip(),
        "registration_opens": utc_value(registration_start(state)),
        "overview": str(state.get("overview", "")).strip(),
        "presenter_name": clean_text(state.get("presenter_name", "")),
        "presenter_profile": str(state.get("presenter_profile", "")).strip(),
        "learning_points": [
            point.strip()
            for point in str(state.get("learning_points", "")).splitlines()
            if point.strip()
        ][:4],
        "venue_consumption_note": venue_consumption_note,
        "venue_consumption_amount": venue_consumption_amount,
        "presenter_questions": presenter_questions(state),
    }

