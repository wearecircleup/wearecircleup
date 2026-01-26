/**
 * Vercel Serverless Function: Eventbrite Events
 * 
 * Fetches events from Circle Up Volunteer's Eventbrite organization
 * Uses Private Token for server-side authentication
 * 
 * Eventbrite API Documentation:
 * - Authentication: https://www.eventbrite.com/platform/docs/authentication
 * - API Basics: https://www.eventbrite.com/platform/docs/api-basics
 * - Events Endpoint: https://www.eventbrite.com/platform/api#/reference/event
 */

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

    // Fetch events from Eventbrite API
    // Using organization events endpoint to get all events for Circle Up Volunteer
    const eventbriteUrl = `https://www.eventbriteapi.com/v3/organizations/${EVENTBRITE_ORGANIZATION_ID}/events/?status=live&order_by=start_asc&expand=venue,ticket_availability`;
    
    console.log(`Fetching events from Eventbrite for organization: ${EVENTBRITE_ORGANIZATION_ID}`);

    const response = await fetch(eventbriteUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EVENTBRITE_PRIVATE_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Eventbrite API error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Failed to fetch events from Eventbrite',
        details: errorData.error_description || errorData.error || 'Unknown error'
      });
    }

    const data = await response.json();
    
    // Transform Eventbrite events to our format
    const events = data.events?.map(event => ({
      id: event.id,
      name: event.name.text,
      description: event.description.text,
      summary: event.summary || event.description.text?.substring(0, 200) + '...',
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
      ticket_availability: event.ticket_availability,
      category: event.category ? {
        id: event.category.id,
        name: event.category.name
      } : null,
      format: event.format ? {
        id: event.format.id,
        name: event.format.name
      } : null
    })) || [];

    console.log(`Successfully fetched ${events.length} events from Eventbrite`);

    return res.status(200).json({
      success: true,
      events: events,
      count: events.length,
      pagination: data.pagination
    });

  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
