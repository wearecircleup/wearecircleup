from __future__ import annotations

import streamlit as st

from studio_api import (
    api_error_message,
    delete_event_permanently,
    get_attendance,
    get_event,
    list_events,
)


DELETE_STATUS_OPTIONS = ["Todos", "draft", "live", "started", "ended", "canceled"]


def init_delete_state() -> None:
    defaults = {
        "delete_events": [],
        "delete_events_loaded": False,
        "delete_event_id": "",
        "delete_event_confirmation": "",
        "delete_event_acknowledged": False,
        "delete_status_filter": "Todos",
    }
    for key, value in defaults.items():
        st.session_state.setdefault(key, value)


def event_name(event: dict) -> str:
    name = event.get("name")
    if isinstance(name, dict):
        return name.get("text") or name.get("html") or "Evento sin nombre"
    return str(name or "Evento sin nombre")


def event_start_label(event: dict) -> str:
    start = event.get("start") or {}
    return start.get("local") or start.get("utc") or "Sin fecha"


def event_label(event: dict) -> str:
    return f"{event_name(event)} | {event_start_label(event)} | {event.get('status', 'unknown')} | {event.get('id', '')}"


def selected_event_summary() -> dict | None:
    event_id = st.session_state.get("delete_event_id")
    if not event_id:
        return None
    for event in st.session_state.get("delete_events", []):
        if str(event.get("id")) == str(event_id):
            return event
    return None


def refresh_events() -> None:
    status_filter = st.session_state.get("delete_status_filter")
    filter_value = None if status_filter == "Todos" else status_filter
    st.session_state.delete_events = list_events(filter_value)
    st.session_state.delete_events_loaded = True
    current = str(st.session_state.get("delete_event_id", ""))
    valid_ids = {str(event.get("id")) for event in st.session_state.delete_events}
    if current not in valid_ids:
        st.session_state.delete_event_id = str(st.session_state.delete_events[0]["id"]) if st.session_state.delete_events else ""
    st.session_state.delete_event_confirmation = ""
    st.session_state.delete_event_acknowledged = False


def render_delete_event_page() -> None:
    st.title("Delete Event")
    st.caption("Modulo aislado para revisar y eliminar eventos sin mezclar este flujo con la creacion.")

    controls_left, controls_right = st.columns([2, 1])
    controls_left.selectbox(
        "Estado a consultar",
        DELETE_STATUS_OPTIONS,
        key="delete_status_filter",
        help="Usa este filtro para localizar el evento antes de revisar si puede eliminarse.",
    )
    if controls_right.button("Actualizar eventos", width="stretch"):
        try:
            refresh_events()
            st.toast("Listado de eventos actualizado.")
        except Exception as exc:
            st.error(f"No se pudo actualizar el listado: {api_error_message(exc)}")

    if not st.session_state.delete_events_loaded:
        try:
            refresh_events()
        except Exception as exc:
            st.error(f"No se pudo cargar eventos: {api_error_message(exc)}")
            return

    if not st.session_state.delete_events:
        st.warning("No hay eventos disponibles con el filtro actual.")
        return

    st.selectbox(
        "Evento a revisar",
        [str(event["id"]) for event in st.session_state.delete_events],
        format_func=lambda event_id: event_label(
            next(event for event in st.session_state.delete_events if str(event["id"]) == str(event_id))
        ),
        key="delete_event_id",
    )

    summary = selected_event_summary()
    if summary is None:
        st.warning("Selecciona un evento valido.")
        return

    try:
        detail = get_event(str(summary["id"]))
        attendance = get_attendance(str(summary["id"]))
    except Exception as exc:
        st.error(f"No se pudo cargar el detalle del evento: {api_error_message(exc)}")
        return

    top_left, top_mid, top_right = st.columns(3)
    top_left.metric("Estado", str(detail.get("status", "unknown")).title())
    top_mid.metric("Registrados", int(attendance.get("registered", 0)))
    top_right.metric("Check-ins", int(attendance.get("checked_in", 0)))

    st.caption(f"Inicio: {event_start_label(detail)}")
    if detail.get("url"):
        st.link_button("Abrir evento en Eventbrite", str(detail["url"]), width="stretch")

    registered = int(attendance.get("registered", 0))
    if registered > 0:
        st.error(
            "Este evento ya tiene registros. Para este caso no se debe borrar primero: el flujo recomendado es cancelar el evento en Eventbrite, avisar a asistentes y reembolsar ordenes antes de considerar cualquier eliminacion."
        )
        st.info(
            "Este modulo bloquea la eliminacion directa cuando ya existen registros, porque la API local actual no automatiza cancelacion del evento ni reembolsos de ordenes."
        )
    else:
        st.info("Este evento no tiene registros. Si confirmas, se puede eliminar permanentemente desde la API local.")

    confirmation_target = event_name(detail)
    st.checkbox(
        "Entiendo que la eliminacion permanente no debe usarse como primer paso si el evento tuvo registros.",
        key="delete_event_acknowledged",
    )
    st.text_input(
        f'Escribe exactamente "{confirmation_target}" para confirmar',
        key="delete_event_confirmation",
    )

    can_delete = (
        registered == 0
        and st.session_state.delete_event_acknowledged
        and st.session_state.delete_event_confirmation.strip() == confirmation_target
    )

    if st.button("Eliminar evento permanentemente", type="primary", width="stretch", disabled=not can_delete):
        try:
            delete_event_permanently(str(detail["id"]))
            st.toast("Evento eliminado correctamente.")
            refresh_events()
            st.success(f"Evento eliminado: {confirmation_target}")
            st.rerun()
        except Exception as exc:
            st.error(f"No se pudo eliminar el evento: {api_error_message(exc)}")
