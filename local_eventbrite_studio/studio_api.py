from __future__ import annotations

import json
import os
from io import BytesIO

import httpx

from image_utils import prepare_event_image
from venue import normalize_venue


API_URL = os.getenv("CIRCLE_UP_API_URL", "http://127.0.0.1:8000").rstrip("/")


def api_request(method: str, path: str, body: dict | None = None, params: dict | None = None) -> dict:
    response = httpx.request(method, f"{API_URL}{path}", json=body, params=params, timeout=60.0)
    response.raise_for_status()
    return response.json() if response.content else {}


def api_post(path: str, body: dict) -> dict:
    return api_request("POST", path, body)


def api_get(path: str, params: dict | None = None) -> dict:
    return api_request("GET", path, params=params)


def api_error_message(exc: httpx.HTTPError) -> str:
    response = getattr(exc, "response", None)
    if response is not None:
        return response.text
    return f"No se pudo conectar con la API local en {API_URL}. Inicia la API con uv run uvicorn app.main:app --reload --port 8000."


def refresh_venues(state) -> None:
    response = httpx.get(f"{API_URL}/venues", params={"page": 1}, timeout=30.0)
    response.raise_for_status()
    state.venues = [normalize_venue(venue) for venue in response.json().get("venues", [])]
    state.venues_loaded = True


def list_events(status_filter: str | None = None) -> list[dict]:
    params = {"page": 1, "page_size": 50}
    if status_filter:
        params["status"] = status_filter
    return api_get("/events", params).get("events", [])


def get_event(event_id: str) -> dict:
    return api_get(f"/events/{event_id}")


def get_attendance(event_id: str) -> dict:
    return api_get(f"/events/{event_id}/attendance")


def delete_event_permanently(event_id: str) -> None:
    api_request("DELETE", f"/events/{event_id}", params={"confirm": "true"})


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
