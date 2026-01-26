import { useState, useEffect } from 'react';
import EventCard from '../EventCard';
import Button from '../Button';

/**
 * EventsTab Component
 * 
 * Displays Circle Up Volunteer's Eventbrite events
 * Similar structure to presentations tab
 */
const EventsTab = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/eventbrite-events');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al cargar eventos');
      }

      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error('Error loading events:', err);
      setError(err.message || 'Error al cargar los eventos de Eventbrite');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 mb-4 border-4 border-color-1 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-n-4">Cargando eventos...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-16 h-16 mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-n-2 text-lg font-semibold mb-2">Error al cargar eventos</p>
        <p className="text-n-4 text-sm mb-4 text-center max-w-md">{error}</p>
        <Button onClick={loadEvents} white>
          Reintentar
        </Button>
      </div>
    );
  }

  // Empty state
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-20 h-20 mb-6 bg-n-7 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-n-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-n-1 mb-2">No hay eventos disponibles</h3>
        <p className="text-n-4 text-center max-w-md mb-6">
          Actualmente no hay eventos programados. Vuelve pronto para ver nuestros próximos talleres y actividades.
        </p>
        <Button onClick={loadEvents} white>
          Actualizar
        </Button>
      </div>
    );
  }

  // Events grid
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-n-1">Eventos Circle Up</h2>
          <p className="text-n-4 text-sm mt-1">
            {events.length} {events.length === 1 ? 'evento disponible' : 'eventos disponibles'}
          </p>
        </div>
        <Button onClick={loadEvents} className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </Button>
      </div>

      {/* Events grid - Responsive with equal height cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Info footer */}
      <div className="mt-8 p-3 sm:p-4 bg-n-7/50 border border-n-6 rounded-xl">
        <div className="flex items-start gap-2 sm:gap-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-color-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-n-2 text-xs sm:text-sm font-medium mb-1">Eventos de Circle Up Volunteer</p>
            <p className="text-n-4 text-xs leading-relaxed">
              Mostrando solo eventos próximos y en curso. Los datos se actualizan cada 10 minutos para optimizar el uso de la API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsTab;
