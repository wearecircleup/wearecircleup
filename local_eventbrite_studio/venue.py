"""Provider-response normalization and validation for the venue editor."""


REQUIRED_VENUE_FIELDS = ("name", "country")


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
        "latitude": data.get("latitude"), "longitude": data.get("longitude"), "description": clean_text(data.get("description")),
    }


def venue_request(data: dict) -> dict:
    """Build a JSON-safe partial update: never forward empty or null values."""
    return {key: value for key, value in data.items() if key != "id" and value not in ("", None)}


def venue_validation_errors(data: dict) -> list[str]:
    """Validate the fields required by the local API before making a request."""
    labels = {"name": "Nombre del venue", "country": "Pais"}
    errors = [f"{labels[field]} es obligatorio." for field in REQUIRED_VENUE_FIELDS if not clean_text(data.get(field))]
    country = clean_text(data.get("country"))
    if country and len(country) != 2:
        errors.append("Pais debe usar un codigo ISO de 2 letras, por ejemplo CO.")
    return errors
