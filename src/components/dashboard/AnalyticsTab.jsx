import { useState, useEffect } from 'react';
import Button from '../Button';

/**
 * AnalyticsTab Component (Simple Version - No Chart.js)
 * 
 * Simple analytics dashboard with visual bars and metrics
 * Spotify-inspired minimalist design
 */
const AnalyticsTab = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analytics');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al cargar analítica');
      }

      const data = await response.json();
      setAnalytics(data.analytics);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError(err.message || 'Error al cargar los datos de analítica');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 mb-4 border-4 border-color-1 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-n-4">Cargando analítica...</p>
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
        <p className="text-n-2 text-lg font-semibold mb-2">Error al cargar analítica</p>
        <p className="text-n-4 text-sm mb-4 text-center max-w-md">{error}</p>
        <Button onClick={loadAnalytics} white>
          Reintentar
        </Button>
      </div>
    );
  }

  if (!analytics) return null;

  // Helper to calculate percentage for bar charts
  const getPercentage = (value, total) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  // Get max value for scaling
  const getMaxValue = (obj) => Math.max(...Object.values(obj));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-n-1">Analítica</h2>
          <p className="text-n-4 text-sm mt-1">
            Visualiza el crecimiento de tu comunidad
          </p>
        </div>
        <Button onClick={loadAnalytics} className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Actualizar
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4">
          <p className="text-n-4 text-xs mb-1">Total Usuarios</p>
          <p className="text-2xl font-bold text-n-1">{analytics.totalUsers}</p>
        </div>
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4">
          <p className="text-n-4 text-xs mb-1">Total Creaciones</p>
          <p className="text-2xl font-bold text-n-1">{analytics.totalPresentations}</p>
        </div>
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4">
          <p className="text-n-4 text-xs mb-1">Promedio por Usuario</p>
          <p className="text-2xl font-bold text-n-1">{analytics.averagePresentationsPerUser}</p>
        </div>
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4">
          <p className="text-n-4 text-xs mb-1">Nuevos (7 días)</p>
          <p className="text-2xl font-bold text-n-1">{analytics.recentActivity.newUsersLast7Days}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Chart 1: Presentations by Theme */}
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-n-1 mb-1">Temas favoritos</h3>
            <p className="text-xs text-n-4">
              Descubre qué estilos prefiere tu comunidad
            </p>
          </div>
          <div className="space-y-4">
            {Object.entries(analytics.presentationsByTheme).map(([theme, count], index) => {
              const total = Object.values(analytics.presentationsByTheme).reduce((a, b) => a + b, 0);
              const percentage = getPercentage(count, total);
              const colors = ['#AC6AFF', '#0E73F6', '#1DB954'];
              
              return (
                <div key={theme}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-n-2">{theme}</span>
                    <span className="text-sm font-semibold text-n-1">{count}</span>
                  </div>
                  <div className="h-2 bg-n-8 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: colors[index % colors.length]
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Presentations Over Time */}
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-n-1 mb-1">Creaciones en el tiempo</h3>
            <p className="text-xs text-n-4">
              Tu comunidad está creciendo cada día
            </p>
          </div>
          <div className="space-y-3">
            {Object.entries(analytics.presentationsByMonth).map(([month, count]) => {
              const max = getMaxValue(analytics.presentationsByMonth);
              const percentage = getPercentage(count, max);
              
              return (
                <div key={month} className="flex items-center gap-3">
                  <span className="text-xs text-n-4 w-16 flex-shrink-0">{month}</span>
                  <div className="flex-1 h-8 bg-n-8 rounded-lg overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-color-1 to-color-2 rounded-lg transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-end pr-3 text-xs font-semibold text-n-1">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 3: Users by Role */}
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-n-1 mb-1">Usuarios por rol</h3>
            <p className="text-xs text-n-4">
              Conoce quiénes forman parte de Circle Up
            </p>
          </div>
          <div className="space-y-4">
            {Object.entries(analytics.usersByRole).map(([role, count]) => {
              const max = getMaxValue(analytics.usersByRole);
              const percentage = getPercentage(count, max);
              
              return (
                <div key={role}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-n-2">{role}</span>
                    <span className="text-sm font-semibold text-n-1">{count}</span>
                  </div>
                  <div className="h-3 bg-n-8 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 4: Users by Age Group */}
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-n-1 mb-1">Rango de edades</h3>
            <p className="text-xs text-n-4">
              Diversidad que enriquece la experiencia
            </p>
          </div>
          <div className="space-y-4">
            {Object.entries(analytics.usersByAge).map(([age, count]) => {
              const max = getMaxValue(analytics.usersByAge);
              const percentage = getPercentage(count, max);
              
              return (
                <div key={age}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-n-2">{age} años</span>
                    <span className="text-sm font-semibold text-n-1">{count}</span>
                  </div>
                  <div className="h-3 bg-n-8 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Info footer */}
      <div className="mt-8 p-3 sm:p-4 bg-n-7/50 border border-n-6 rounded-xl">
        <div className="flex items-start gap-2 sm:gap-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-color-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <div>
            <p className="text-n-2 text-xs sm:text-sm font-medium mb-1">Datos en tiempo real</p>
            <p className="text-n-4 text-xs leading-relaxed">
              Los datos se actualizan cada 5 minutos. Última actualización: {new Date(analytics.timestamp).toLocaleTimeString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
