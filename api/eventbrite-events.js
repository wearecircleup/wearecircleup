/**
 * Vercel Serverless Function: Eventbrite Events
 * 
 * Fetches events from Circle Up Volunteer's Eventbrite organization
 * Uses Private Token for server-side authentication
 * Implements caching to optimize API usage and avoid rate limits
 * 
 * Eventbrite API Documentation:
 * - Authentication: https://www.eventbrite.com/platform/docs/authentication
 * - API Basics: https://www.eventbrite.com/platform/docs/api-basics
 * - Events Endpoint: https://www.eventbrite.com/platform/api#/reference/event
 */

// In-memory cache for events
let eventsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const EVENT_STATUSES = ['live', 'started', 'ended', 'canceled'];

const getEventCollection = (event, now) => {
  const start = new Date(event.start.local);
  const end = new Date(event.end.local);
  const hasAvailableTickets = event.ticket_availability?.has_available_tickets === true;
  const isSoldOut = event.ticket_availability?.is_sold_out === true || event.ticket_availability?.has_available_tickets === false;

  if (event.status === 'canceled') {
    return 'canceled';
  }

  if (event.status === 'ended' || end < now) {
    return 'historical';
  }

  if (start > now && isSoldOut) {
    return 'sold_out';
  }

  if (hasAvailableTickets || now >= start) {
    return 'available';
  }

  return 'available';
};

const normalizeEvent = (event, now) => {
  const collection = getEventCollection(event, now);

  return {
    id: event.id,
    name: event.name.text,
    description: event.description?.text || null,
    url: event.url,
    start: {
      local: event.start.local,
      timezone: event.start.timezone,
      utc: event.start.utc
    },
    end: {
      local: event.end.local,
      timezone: event.end.timezone,
      utc: event.end.utc
    },
    created: event.created,
    status: event.status,
    collection,
    currency: event.currency,
    online_event: event.online_event,
    is_free: event.is_free,
    venue: event.venue ? {
      name: event.venue.name,
      address: event.venue.address ? {
        address_1: event.venue.address.address_1,
        address_2: event.venue.address.address_2,
        city: event.venue.address.city,
        region: event.venue.address.region,
        postal_code: event.venue.address.postal_code,
        country: event.venue.address.country,
        localized_address_display: event.venue.address.localized_address_display
      } : null,
      latitude: event.venue.latitude,
      longitude: event.venue.longitude
    } : null,
    logo: event.logo ? {
      url: event.logo.url,
      original: event.logo.original
    } : null,
    capacity: event.capacity,
    ticket_availability: event.ticket_availability || null,
    category: event.category ? {
      id: event.category.id,
      name: event.category.name
    } : null,
    format: event.format ? {
      id: event.format.id,
      name: event.format.name
    } : null
  };
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if we have valid cached data
    const currentTime = Date.now();
    if (eventsCache && cacheTimestamp && (currentTime - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached events data');
      return res.status(200).json({
        ...eventsCache,
        cached: true,
        cacheAge: Math.floor((currentTime - cacheTimestamp) / 1000) // seconds
      });
    }
    const EVENTBRITE_PRIVATE_TOKEN = process.env.EVENTBRITE_PRIVATE_TOKEN;
    const EVENTBRITE_ORGANIZATION_ID = process.env.EVENTBRITE_ORGANIZATION_ID;

    if (!EVENTBRITE_PRIVATE_TOKEN) {
      console.error('EVENTBRITE_PRIVATE_TOKEN not configured');
      return res.status(500).json({ 
        error: 'Eventbrite integration not configured',
        details: 'Missing private token'
      });
    }

    if (!EVENTBRITE_ORGANIZATION_ID) {
      console.error('EVENTBRITE_ORGANIZATION_ID not configured');
      return res.status(500).json({ 
        error: 'Eventbrite integration not configured',
        details: 'Missing organization ID'
      });
    }

    console.log(`Fetching events from Eventbrite for organization: ${EVENTBRITE_ORGANIZATION_ID}`);
    const responses = await Promise.all(
      EVENT_STATUSES.map(async (status) => {
        const eventbriteUrl = `https://www.eventbriteapi.com/v3/organizations/${EVENTBRITE_ORGANIZATION_ID}/events/?status=${status}&time_filter=all&order_by=start_asc&expand=venue,ticket_availability&page_size=50`;

        const response = await fetch(eventbriteUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${EVENTBRITE_PRIVATE_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error_description || errorData.error || `Failed to fetch ${status} events`);
        }

        return response.json();
      })
    );

    const rawEventsMap = new Map();
    responses.forEach((payload) => {
      (payload.events || []).forEach((event) => {
        rawEventsMap.set(event.id, event);
      });
    });

    const now = new Date();
    const events = Array.from(rawEventsMap.values())
      .map((event) => normalizeEvent(event, now))
      .filter((event) => event.collection !== 'canceled')
      .sort((a, b) => new Date(a.start.local) - new Date(b.start.local));

    const groups = {
      available: events.filter((event) => event.collection === 'available').length,
      sold_out: events.filter((event) => event.collection === 'sold_out').length,
      historical: events.filter((event) => event.collection === 'historical').length
    };

    console.log(`Successfully fetched ${events.length} visible events from Eventbrite`);

    // Cache the response
    const responseData = {
      success: true,
      events: events,
      count: events.length,
      groups,
      cached: false
    };
    
    eventsCache = responseData;
    cacheTimestamp = Date.now();

    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
