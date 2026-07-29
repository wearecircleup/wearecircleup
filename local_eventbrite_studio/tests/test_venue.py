from venue import minimum_consumption_cop, normalize_venue, venue_request, venue_validation_errors


def test_normalize_venue_converts_eventbrite_nulls_to_safe_empty_strings() -> None:
    venue = normalize_venue(
        {
            "id": "venue-1", "name": "Venue actualizado",
            "address": {"address_1": None, "address_2": None, "city": "Bogota", "region": None, "postal_code": None, "country": None},
        }
    )

    assert venue["postal_code"] == ""
    assert venue["address_1"] == ""
    assert venue["country"] == "CO"
    assert venue_request(venue) == {"name": "Venue actualizado", "city": "Bogota", "country": "CO"}


def test_venue_request_never_forwards_null_or_empty_values() -> None:
    payload = venue_request({"id": "venue-1", "name": "Casa", "city": None, "region": "", "country": "CO", "description": "No soportada"})

    assert payload == {"name": "Casa", "country": "CO"}
    assert all(value is not None for value in payload.values())


def test_venue_validation_requires_the_api_required_fields() -> None:
    errors = venue_validation_errors({"name": " ", "country": "COL"})

    assert "Nombre del venue es obligatorio." in errors
    assert "Pais debe usar un codigo ISO de 2 letras, por ejemplo CO." in errors


def test_minimum_consumption_cop_reads_the_amount_from_a_disclaimer() -> None:
    text = (
        "La Duqueza abre su espacio en Tocancipa para que la comunidad participe. "
        "El ticket de consumo minimo es de $2.000 COP y puedes usarlo en el lugar."
    )

    assert minimum_consumption_cop(text) == 2000
    assert minimum_consumption_cop("Texto sin patron monetario") == 0
