"""Provider-response normalization and validation for the venue editor."""

import re


REQUIRED_VENUE_FIELDS = ("name", "country")
VENUE_REQUEST_FIELDS = {
    "name", "address_1", "address_2", "city", "region", "postal_code",
    "country", "latitude", "longitude",
}


def clean_text(value: object) -> str:
    """Eventbrite may return null for optional venue fields."""
    return value.strip() if isinstance(value, str) else ""


def normalize_venue(data: dict) -> dict:
    address = data.get("address") or {}
    return {
        "id": str(data["id"]), "name": clean_text(data.get("name")),
        "address_1": clean_text(address.get("address_1")), "address_2": clean_text(address.get("address_2")),
        "city": clean_text(address.get("city")), "region": clean_text(address.get("region")),
        "postal_code": clean_text(address.get("postal_code")), "country": clean_text(address.get("country")) or "CO",
        "latitude": address.get("latitude", data.get("latitude")), "longitude": address.get("longitude", data.get("longitude")),
    }


def venue_request(data: dict) -> dict:
    """Build a JSON-safe request from the Eventbrite venue fields we support."""
    return {key: value for key, value in data.items() if key in VENUE_REQUEST_FIELDS and value not in ("", None)}


def minimum_consumption_cop(text: object) -> int:
    """Extract a minimum-consumption amount from a venue disclaimer."""
    if not isinstance(text, str):
        return 0
    match = re.search(r"\$([\d\.,]+)\s*COP\b", text, flags=re.IGNORECASE)
    if not match:
        return 0
    digits = re.sub(r"[^\d]", "", match.group(1))
    return int(digits) if digits else 0


def venue_validation_errors(data: dict) -> list[str]:
    """Validate the fields required by the local API before making a request."""
    labels = {"name": "Nombre del venue", "country": "Pais"}
    errors = [f"{labels[field]} es obligatorio." for field in REQUIRED_VENUE_FIELDS if not clean_text(data.get(field))]
    country = clean_text(data.get("country"))
    if country and len(country) != 2:
        errors.append("Pais debe usar un codigo ISO de 2 letras, por ejemplo CO.")
    return errors
