# Local Eventbrite Studio

Local Streamlit application for preparing and submitting one Circle Up
Eventbrite event through the local API. It stores no Eventbrite credentials.

The app guides the required human review through five tabs:

1. Venue and format.
2. Event details and capacity.
3. Free registration and attendee questions.
4. Listing copy, default FAQs and image validation.
5. Final review and JSON payload preview.

The fixed Circle Up organization and organizer are visible only as reference.
`USD` remains fixed because this Eventbrite organization currently rejects COP.

## Run with uv

```powershell
cd local_eventbrite_studio
uv sync
uv run streamlit run app.py
```

Open the local URL displayed by Streamlit, normally
`http://localhost:8501`.

The app retains inputs only during the active browser session. It creates and
validates a draft first; publication is a separate explicit action. Start the
API with `uv run uvicorn app.main:app --reload --port 8000`, then run Studio.
Set `CIRCLE_UP_API_URL` only when the API is not at `http://127.0.0.1:8000`.

## Reload after updating the local API

The Studio loads venues from the local API, which then calls Eventbrite. After
pulling or editing this project, restart the API if it was started without
`--reload`, then refresh the browser tab running Streamlit. With the documented
commands (`uv run uvicorn app.main:app --reload` and `uv run streamlit run
app.py`), saving a Python file reloads each server automatically; a browser
refresh is enough.

Venue listings send only `page=1`. Eventbrite returns 50 venues per page by
default and rejects `page_size` for this endpoint.
