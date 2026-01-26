/**
 * EventCard Component
 * 
 * Displays Eventbrite event information in a card format
 * Similar to PresentationCard but adapted for events
 */

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getEventStatus = () => {
    const now = new Date();
    const start = new Date(event.start.local);
    const end = new Date(event.end.local);

    if (now < start) return { text: 'Próximo', color: 'bg-blue-500/20 text-blue-400 border-blue-500/50' };
    if (now >= start && now <= end) return { text: 'En curso', color: 'bg-green-500/20 text-green-400 border-green-500/50' };
    return { text: 'Finalizado', color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' };
  };

  const status = getEventStatus();

  return (
    <div className="group relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-xl overflow-hidden hover:border-color-1/50 transition-all duration-300 w-full h-full flex flex-col">
      {/* Event Image/Thumbnail */}
      <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-br from-n-8 via-n-7 to-n-8 overflow-hidden border-b border-n-6/50 flex-shrink-0">
        {event.logo?.url ? (
          <img 
            src={event.logo.url} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Background decoration if no image */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-color-1 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-color-2 rounded-full blur-3xl"></div>
            </div>
            
            {/* Event icon */}
            <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
              <svg className="w-16 h-16 text-color-1/50 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-n-2 text-sm font-medium">
                {event.format?.name || 'Evento'}
              </p>
            </div>
          </>
        )}
        
        {/* Status badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${status.color}`}>
          {status.text}
        </div>

        {/* Free badge if applicable */}
        {event.is_free && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-green-500/20 text-green-400 border-green-500/50">
            Gratis
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-n-1 mb-2 line-clamp-2">{event.name}</h3>
        <p className="text-n-4 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{event.summary}</p>
        
        {/* Event details */}
        <div className="space-y-2 mb-3 sm:mb-4 flex-1">
          {/* Date and time */}
          <div className="flex items-start gap-2 text-xs sm:text-sm text-n-3">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-color-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="font-medium text-n-2">{formatDate(event.start.local)}</p>
              <p className="text-n-4">{formatTime(event.start.local)} - {formatTime(event.end.local)}</p>
            </div>
          </div>

          {/* Location */}
          {event.venue && (
            <div className="flex items-start gap-2 text-xs sm:text-sm text-n-3">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-color-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-medium text-n-2">{event.venue.name}</p>
                {event.venue.address?.localized_address_display && (
                  <p className="text-n-4 line-clamp-1">{event.venue.address.localized_address_display}</p>
                )}
              </div>
            </div>
          )}

          {/* Online event */}
          {event.online_event && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-n-3">
              <svg className="w-4 h-4 text-color-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-medium text-n-2">Evento en línea</span>
            </div>
          )}

          {/* Category */}
          {event.category && (
            <div className="flex items-center gap-2 text-xs text-n-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{event.category.name}</span>
            </div>
          )}
        </div>

        {/* Action button */}
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative group mt-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-color-1 via-color-2 to-color-1 rounded-lg opacity-100 group-hover:opacity-80 transition-opacity"></div>
          <div className="relative bg-n-8 m-[2px] rounded-[6px] py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 text-center">
            <span className="text-n-1 text-xs sm:text-sm md:text-base font-semibold flex items-center justify-center gap-1.5 sm:gap-2">
              <span className="hidden xs:inline">Ver en Eventbrite</span>
              <span className="xs:hidden">Eventbrite</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default EventCard;
