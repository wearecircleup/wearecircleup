from datetime import datetime, timedelta, timezone

from pydantic import BaseModel, Field, model_validator


class EventCreate(BaseModel):
    name: str = Field(examples=["Taller de prueba Circle Up"])
    start: datetime = Field(examples=["2026-07-27T10:00:00-05:00"])
    end: datetime = Field(examples=["2026-07-27T11:00:00-05:00"])
    timezone: str = Field(default="America/Bogota", examples=["America/Bogota"])
    currency: str | None = Field(default=None, min_length=3, max_length=3, examples=["USD"])
    description: str | None = Field(default=None, examples=["Una prueba creada desde la API local."])
    online_event: bool = True
    listed: bool = True
    shareable: bool = True
    ticket_name: str = Field(default="Entrada general")
    ticket_quantity: int = Field(default=100, gt=0)
    publish: bool = True

    @model_validator(mode="after")
    def validate_dates(self) -> "EventCreate":
        if self.start.tzinfo is None or self.end.tzinfo is None:
            raise ValueError("start and end must include a UTC offset, for example -05:00.")
        if self.end <= self.start:
            raise ValueError("end must be after start.")
        return self

    def eventbrite_payload(self, default_currency: str) -> dict:
        event = {
            "name": {"html": self.name},
            "start": {"timezone": self.timezone, "utc": self.start.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")},
            "end": {"timezone": self.timezone, "utc": self.end.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")},
            "currency": (self.currency or default_currency).upper(),
            "online_event": self.online_event,
            "listed": self.listed,
            "shareable": self.shareable,
        }
        if self.description:
            event["description"] = {"html": self.description}
        return event


class EventUpdate(BaseModel):
    name: str | None = None
    summary: str | None = Field(default=None, max_length=140)
    start: datetime | None = None
    end: datetime | None = None
    timezone: str | None = None
    online_event: bool | None = None
    listed: bool | None = None
    shareable: bool | None = None

    def eventbrite_payload(self) -> dict:
        event: dict = {}
        if self.name is not None:
            event["name"] = {"html": self.name}
        if self.summary is not None:
            event["summary"] = self.summary
        for field in ("start", "end"):
            value = getattr(self, field)
            if value is not None:
                if value.tzinfo is None:
                    raise ValueError(f"{field} must include a UTC offset.")
                event[field] = {"timezone": self.timezone or "America/Bogota", "utc": value.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}
        for field in ("online_event", "listed", "shareable"):
            value = getattr(self, field)
            if value is not None:
                event[field] = value
        return event


class VenueBase(BaseModel):
    name: str = Field(examples=["Casa de la Cultura"])
    address_1: str | None = Field(default=None, examples=["Calle 10 # 20-30"])
    address_2: str | None = Field(default=None, examples=["Piso 2"])
    city: str | None = Field(default=None, examples=["Bogota"])
    region: str | None = Field(default=None, examples=["Cundinamarca"])
    postal_code: str | None = Field(default=None, examples=["110111"])
    country: str = Field(default="CO", min_length=2, max_length=2, examples=["CO"])
    latitude: float | None = Field(default=None, examples=[4.711])
    longitude: float | None = Field(default=None, examples=[-74.0721])
    description: str | None = Field(default=None, examples=["Sede local para actividades Circle Up."])


class VenueCreate(VenueBase):
    def eventbrite_payload(self) -> dict:
        venue = {
            "name": self.name,
            "address": {
                "country": self.country.upper(),
            },
        }
        if self.address_1 is not None:
            venue["address"]["address_1"] = self.address_1
        if self.address_2 is not None:
            venue["address"]["address_2"] = self.address_2
        if self.city is not None:
            venue["address"]["city"] = self.city
        if self.region is not None:
            venue["address"]["region"] = self.region
        if self.postal_code is not None:
            venue["address"]["postal_code"] = self.postal_code
        if self.latitude is not None:
            venue["address"]["latitude"] = self.latitude
        if self.longitude is not None:
            venue["address"]["longitude"] = self.longitude
        if self.description is not None:
            venue["description"] = self.description
        return venue


class VenueUpdate(BaseModel):
    name: str | None = None
    address_1: str | None = None
    address_2: str | None = None
    city: str | None = None
    region: str | None = None
    postal_code: str | None = None
    country: str | None = Field(default=None, min_length=2, max_length=2)
    latitude: float | None = None
    longitude: float | None = None
    description: str | None = None

    def eventbrite_payload(self) -> dict:
        venue: dict = {}
        if self.name is not None:
            venue["name"] = self.name
        address: dict = {}
        for field in ("address_1", "address_2", "city", "region", "postal_code", "latitude", "longitude"):
            value = getattr(self, field)
            if value is not None:
                address[field] = value
        if self.country is not None:
            address["country"] = self.country.upper()
        if address:
            venue["address"] = address
        for field in ("description",):
            value = getattr(self, field)
            if value is not None:
                venue[field] = value
        return venue


class ImageUploadCompletion(BaseModel):
    """JSON returned by the Studio after the signed binary upload succeeds."""

    upload_token: str = Field(min_length=1)
    crop_mask: dict


class EventInstantiation(BaseModel):
    event: dict
    ticket_class: dict
    questions: list[dict]
    structured_content: dict

    @model_validator(mode="after")
    def validate_circle_up_contract(self) -> "EventInstantiation":
        event, ticket = self.event, self.ticket_class
        try:
            start = datetime.fromisoformat(event["start"]["utc"].replace("Z", "+00:00"))
            end = datetime.fromisoformat(event["end"]["utc"].replace("Z", "+00:00"))
            sales_start = datetime.fromisoformat(ticket["sales_start"].replace("Z", "+00:00"))
            sales_end = datetime.fromisoformat(ticket["sales_end"].replace("Z", "+00:00"))
        except (KeyError, TypeError, ValueError) as exc:
            raise ValueError("Event and sales timestamps must be ISO 8601 UTC values.") from exc
        if not event.get("name", {}).get("html", "").strip():
            raise ValueError("event.name.html is required.")
        if len(event.get("summary", "")) > 140:
            raise ValueError("event.summary cannot exceed 140 characters.")
        if end - start != timedelta(hours=1) or start.date() != end.date():
            raise ValueError("Events must last exactly one hour and end on the same day.")
        if not sales_start < sales_end <= start:
            raise ValueError("Ticket sales must open before they close, on or before the event start.")
        if event.get("capacity") not in range(1, 11):
            raise ValueError("event.capacity must be an integer from 1 through 10.")
        if ticket.get("quantity_total") != event["capacity"]:
            raise ValueError("ticket_class.quantity_total must match event.capacity.")
        if ticket.get("maximum_quantity") != 1 or ticket.get("free") is not True:
            raise ValueError("Only one free ticket per order is allowed.")
        if event.get("online_event") is False and not event.get("venue_id"):
            raise ValueError("In-person events require an existing venue_id.")
        if event.get("online_event") is True and event.get("venue_id"):
            raise ValueError("Online events cannot include venue_id.")
        if len(self.questions) < 2:
            raise ValueError("The two default attendee questions are required.")
        return self
