import { useState, useEffect } from 'react';
import EventCard from '../EventCard';
import Button from '../Button';

const FILTERS = [
  { key: 'available', label: 'Disponibles' },
  { key: 'sold_out', label: 'Agotados' },
  { key: 'historical', label: 'Historicos' }
];

const FILTER_EMPTY_COPY = {
  available: {
    title: 'No hay eventos disponibles ahora',
    description: 'Revisa los eventos agotados o historicos para ver el movimiento reciente de Circle Up.'
  },
  sold_out: {
    title: 'No hay eventos agotados por ahora',
    description: 'Buen momento para revisar los eventos disponibles y asegurar tu cupo.'
  },
  historical: {
    title: 'Aun no hay historico de eventos',
    description: 'Cuando los eventos finalicen, podras consultarlos aqui como referencia.'
  }
};

const EventsTab = () => {
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState({ available: 0, sold_out: 0, historical: 0 });
  const [activeFilter, setActiveFilter] = useState('available');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const visibleFilters = FILTERS.filter(({ key }) => (groups[key] || 0) > 0);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (visibleFilters.length === 0) {
      return;
    }

    const activeFilterExists = visibleFilters.some(({ key }) => key === activeFilter);
    if (!activeFilterExists) {
      setActiveFilter(visibleFilters[0].key);
    }
  }, [activeFilter, visibleFilters]);

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
      setGroups(data.groups || { available: 0, sold_out: 0, historical: 0 });
    } catch (err) {
      console.error('Error loading events:', err);
      setError(err.message || 'Error al cargar los eventos de Eventbrite');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => event.collection === activeFilter);
  const totalEvents = events.length;
  const emptyCopy = FILTER_EMPTY_COPY[activeFilter];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 mb-4 border-4 border-color-1 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-n-4">Cargando eventos...</p>
      </div>
    );
  }

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

  if (totalEvents === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-20 h-20 mb-6 bg-n-7 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-n-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-n-1 mb-2">No hay eventos cargados</h3>
        <p className="text-n-4 text-center max-w-md mb-6">
          Aun no hay eventos visibles para mostrar. Vuelve pronto para revisar nuevas actividades de Circle Up.
        </p>
        <Button onClick={loadEvents} white>
          Actualizar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-start">
          <Button onClick={loadEvents} className="px-5 py-3 text-sm sm:text-base">
            Actualizar
          </Button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-n-1">Eventos Circle Up</h2>
          <p className="text-n-4 text-sm mt-1">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'evento visible' : 'eventos visibles'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleFilters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeFilter === key
                  ? 'bg-color-1 text-n-1'
                  : 'bg-n-7/50 text-n-4 hover:bg-n-7 hover:text-n-2'
              }`}
            >
              {label} ({groups[key] || 0})
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[30vh] px-4 py-10 bg-n-7/30 border border-n-6 rounded-2xl">
          <div className="w-16 h-16 mb-4 bg-n-7 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-n-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-n-1 mb-2 text-center">{emptyCopy.title}</h3>
          <p className="text-n-4 text-center max-w-md">{emptyCopy.description}</p>
        </div>
      )}

      <div className="mt-8 p-3 sm:p-4 bg-n-7/50 border border-n-6 rounded-xl">
        <div className="flex flex-col gap-4 sm:gap-5">
          {activeFilter === 'sold_out' && (
            <div className="flex justify-start">
              <Button
                href="mailto:hola@circleup.com.co?subject=Solicitud%20de%20cupo%20adicional%20Circle%20Up"
                className="text-xs sm:text-sm"
                white
              >
                Solicitar Cupo Extra
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsTab;
