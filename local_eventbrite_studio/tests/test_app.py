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

    preview = next(code.value for code in app.code if '"Selecciona tu rango de edad"' in code.value)
    assert '"respondent"' not in preview
    assert '"answer": {' in preview
    assert '"html": "Confirmo"' in preview
    assert '"html": "Cual es tu nivel educativo actual?"' in preview
    assert '"type": "dropdown"' in preview
    assert '"html": "Selecciona tu rango de edad"' in preview
    assert "14-17 anos" in preview
    assert "Circle Up y la participacion" in preview
    assert "<h2>" not in preview


def test_venue_register_renders_when_eventbrite_returns_null_optional_fields(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(httpx, "get", lambda *_, **__: venue_with_null_postal_code_response())
    app = run_app()

    assert not app.exception
