"""Network-free tests for the fixed Circle Up instantiation sequence."""

import asyncio

import pytest
from pydantic import ValidationError

from app.config import Settings
from app.instantiation import EventInstantiationManager
from app.schemas import EventInstantiation


def valid_payload() -> dict:
    return {
        "event": {
            "name": {"html": "Clase de prueba"}, "summary": "Una clase.",
            "start": {"utc": "2026-08-04T15:00:00Z"}, "end": {"utc": "2026-08-04T16:00:00Z"},
            "online_event": False, "venue_id": "venue-1", "capacity": 4,
        },
        "ticket_class": {
            "name": "General", "free": True, "quantity_total": 4, "maximum_quantity": 1,
            "sales_start": "2026-07-28T15:00:00Z", "sales_end": "2026-08-04T15:00:00Z",
        },
        "questions": [{"question": {"html": "Aprendizaje"}}, {"question": {"html": "Convivencia"}}],
        "structured_content": {"version_number": 1, "purpose": "listing", "publish": True, "modules": []},
    }


class FakeEventbriteClient:
    def __init__(self, fail_questions: bool = False, fail_delete: bool = False):
        self.calls: list[str] = []
        self.structured_content: dict | None = None
        self.fail_questions = fail_questions
        self.fail_delete = fail_delete

    async def create_event(self, event):
        self.calls.append("event")
        return {"id": "event-1", **event}

    async def create_ticket(self, event_id, ticket):
        self.calls.append("ticket")
        return {"id": "ticket-1", **ticket}

    async def create_question(self, event_id, question):
        self.calls.append("question")
        if self.fail_questions:
            raise RuntimeError("question failed")
        return question

    async def create_structured_content(self, event_id, version, content):
        self.calls.append("content")
        self.structured_content = {"version": version, "content": content}
        return content

    async def get_structured_content(self, event_id):
        self.calls.append("content_readback")
        return {"modules": self.structured_content["content"]["modules"]}

    async def get_event(self, event_id, params=None):
        self.calls.append("validate")
        return {"id": event_id, "status": "draft"}

    async def delete_event(self, event_id):
        self.calls.append("delete")
        if self.fail_delete:
            raise RuntimeError("cleanup failed")


def manager(client):
    settings = Settings("org", "organizer-1", "token", "USD")
    return EventInstantiationManager(client, settings)


def test_instantiation_validates_the_fixed_contract() -> None:
    EventInstantiation(**valid_payload())
    invalid = valid_payload()
    invalid["ticket_class"]["quantity_total"] = 3
    with pytest.raises(ValidationError, match="must match"):
        EventInstantiation(**invalid)


def test_manager_runs_event_ticket_questions_content_then_validation() -> None:
    client = FakeEventbriteClient()
    result = asyncio.run(manager(client).create_and_validate(valid_payload()))
    assert client.calls == ["event", "ticket", "question", "question", "content", "content_readback", "validate"]
    assert result["validated"] is True
    assert result["questions"][0]["ticket_classes"] == [{"id": "ticket-1"}]
    assert client.structured_content == {
        "version": 1,
        "content": {"purpose": "listing", "publish": True, "modules": []},
    }


def test_manager_deletes_partial_draft_on_failure() -> None:
    client = FakeEventbriteClient(fail_questions=True)
    with pytest.raises(RuntimeError, match="question failed"):
        asyncio.run(manager(client).create_and_validate(valid_payload()))
    assert client.calls == ["event", "ticket", "question", "delete"]


def test_manager_preserves_the_original_error_when_cleanup_fails() -> None:
    client = FakeEventbriteClient(fail_questions=True, fail_delete=True)
    with pytest.raises(RuntimeError, match="question failed"):
        asyncio.run(manager(client).create_and_validate(valid_payload()))
    assert client.calls == ["event", "ticket", "question", "delete"]
