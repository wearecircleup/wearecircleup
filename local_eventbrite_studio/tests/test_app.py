"""Render-level QA for the Streamlit application.

These tests exercise Streamlit's runner, catching initialization and widget
state errors that a Python syntax check cannot detect.
"""

from pathlib import Path

import httpx
import pytest
from streamlit.testing.v1 import AppTest


APP_PATH = Path(__file__).resolve().parents[1] / "app.py"


def venue_response() -> httpx.Response:
    request = httpx.Request("GET", "http://127.0.0.1:8000/venues?page=1&page_size=50")
    return httpx.Response(200, request=request, json={"venues": [], "pagination": {"has_more_items": False}})


def venue_with_null_postal_code_response() -> httpx.Response:
    request = httpx.Request("GET", "http://127.0.0.1:8000/venues?page=1")
    venue = {
        "id": "venue-1", "name": "Venue de prueba", "description": None,
        "address": {"address_1": None, "address_2": None, "city": "Bogota", "region": None, "postal_code": None, "country": "CO"},
        "latitude": None, "longitude": None,
    }
    return httpx.Response(200, request=request, json={"venues": [venue], "pagination": {"has_more_items": False}})


def venue_with_consumption_disclaimer_response() -> httpx.Response:
    request = httpx.Request("GET", "http://127.0.0.1:8000/venues?page=1")
    venue = {
        "id": "venue-1", "name": "La Duqueza", "description": None,
        "address": {
            "address_1": "Cra 1 # 2-3",
            "address_2": "La Duqueza abre su espacio en Tocancipa para que la comunidad participe, comparta y aprenda. El ticket de consumo minimo es de $2.000 COP y puedes usarlo para acompanar la sesion con un cafe, una aromatica, una galleta o algo mas del lugar.",
            "city": "Tocancipa", "region": "Cundinamarca", "postal_code": None, "country": "CO",
        },
        "latitude": None, "longitude": None,
    }
    return httpx.Response(200, request=request, json={"venues": [venue], "pagination": {"has_more_items": False}})


def run_app() -> AppTest:
    app = AppTest.from_file(str(APP_PATH))
    app.run(timeout=15)
    return app


def test_app_renders_the_expected_top_level_structure(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        httpx,
        "get",
        lambda *_, **__: venue_response(),
    )
    app = run_app()
    assert not app.exception
    labels = [tab.label for tab in app.tabs]
    assert {"1. Venues", "2. Encuentro", "3. Inscripcion", "4. Contenido", "5. Revision"} <= set(labels)


def test_venue_page_handles_an_unavailable_remote_register(monkeypatch: pytest.MonkeyPatch) -> None:
    def unavailable(*_, **__):
        raise httpx.ConnectError("API offline")

    monkeypatch.setattr(httpx, "get", unavailable)
    app = run_app()
    assert "Venues" in app.tabs[0].label
    assert any("No se pudo cargar venues" in error.value for error in app.error)


def test_app_renders_a_healthy_empty_venue_register_without_network(monkeypatch: pytest.MonkeyPatch) -> None:
    def venues(*_, **__):
        return venue_response()

    monkeypatch.setattr(httpx, "get", venues)
    app = run_app()

    assert not app.exception
    assert not any("No se pudo cargar venues" in error.value for error in app.error)
    assert any("Todavia no hay venues locales." in warning.value for warning in app.warning)


def test_required_fields_keep_draft_creation_disabled_when_api_is_healthy(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(
        httpx,
        "get",
        lambda *_, **__: venue_response(),
    )
    app = run_app()

    create_button = next(button for button in app.button if button.label == "Crear y validar borrador")
    assert create_button.disabled is True


def test_draft_preview_uses_trackable_dropdown_questions(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(httpx, "get", lambda *_, **__: venue_response())
    app = run_app()

    preview = next(code.value for code in app.code if '"Primaria"' in code.value)
    assert '"respondent"' not in preview
    assert '"answer": {' in preview
    assert '"html": "Confirmo"' in preview
    assert '"type": "dropdown"' in preview
    assert '"type": "radio"' in preview


def test_presenter_can_add_a_dropdown_question(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(httpx, "get", lambda *_, **__: venue_response())
    app = run_app()

    next(widget for widget in app.number_input if widget.label == "Preguntas opcionales del presentador").set_value(1).run()
    next(widget for widget in app.text_input if widget.label == "Enunciado *").set_value("Que nivel de experiencia tienes?").run()
    next(widget for widget in app.selectbox if widget.label == "Tipo *").set_value("Dropdown (una respuesta)").run()
    next(widget for widget in app.text_area if widget.label == "Opciones, una por linea *").set_value("Inicial\nIntermedio\nAvanzado").run()

    preview = next(code.value for code in app.code if "Que nivel de experiencia tienes?" in code.value)
    assert '"type": "dropdown"' in preview
    assert '"html": "Intermedio"' in preview


def test_minimum_consumption_requires_an_order_confirmation(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(httpx, "get", lambda *_, **__: venue_with_consumption_disclaimer_response())
    app = run_app()

    preview = next(code.value for code in app.code if "no un cobro de Circle Up" in code.value)
    assert "consumo minimo de $2.000 COP" in preview
    assert '"type": "checkbox"' in preview
    assert '"required": true' in preview


def test_venue_register_renders_when_eventbrite_returns_null_optional_fields(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(httpx, "get", lambda *_, **__: venue_with_null_postal_code_response())
    app = run_app()

    assert not app.exception
