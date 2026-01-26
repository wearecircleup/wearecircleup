import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import Button from '../Button';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * AnalyticsTab Component
 * 
 * Simple analytics dashboard with 4 charts
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

  // Chart.js theme colors (Spotify-inspired)
  const chartColors = {
    primary: '#AC6AFF',
    secondary: '#0E73F6',
    success: '#1DB954',
    warning: '#FFA500',
    gradient1: 'rgba(172, 106, 255, 0.8)',
    gradient2: 'rgba(14, 115, 246, 0.8)',
    background: 'rgba(172, 106, 255, 0.1)',
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#CAC6DD',
          padding: 15,
          font: {
            size: 11,
            family: "'Sora', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(11, 11, 15, 0.95)',
        titleColor: '#FFFFFF',
        bodyColor: '#CAC6DD',
        borderColor: 'rgba(172, 106, 255, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6C7275',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(108, 114, 117, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#6C7275',
          font: {
            size: 11
          },
          precision: 0
        }
      }
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

  // Chart 1: Presentations by Theme (Doughnut)
  const themeData = {
    labels: Object.keys(analytics.presentationsByTheme),
    datasets: [{
      data: Object.values(analytics.presentationsByTheme),
      backgroundColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.success
      ],
      borderWidth: 0,
      hoverOffset: 8
    }]
  };

  // Chart 2: Presentations Over Time (Line)
  const timeData = {
    labels: Object.keys(analytics.presentationsByMonth),
    datasets: [{
      label: 'Creaciones',
      data: Object.values(analytics.presentationsByMonth),
      borderColor: chartColors.primary,
      backgroundColor: chartColors.background,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: chartColors.primary,
      pointBorderColor: '#0B0B0F',
      pointBorderWidth: 2
    }]
  };

  // Chart 3: Users by Role (Bar)
  const roleData = {
    labels: Object.keys(analytics.usersByRole),
    datasets: [{
      label: 'Usuarios',
      data: Object.values(analytics.usersByRole),
      backgroundColor: chartColors.gradient1,
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  // Chart 4: Users by Age Group (Bar)
  const ageData = {
    labels: Object.keys(analytics.usersByAge),
    datasets: [{
      label: 'Usuarios',
      data: Object.values(analytics.usersByAge),
      backgroundColor: chartColors.gradient2,
      borderRadius: 8,
      borderSkipped: false
    }]
  };

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
          <div className="mb-4">
            <h3 className="text-lg font-bold text-n-1 mb-1">Temas favoritos</h3>
            <p className="text-xs text-n-4">
              Descubre qué estilos prefiere tu comunidad
            </p>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-[280px]">
              <Doughnut 
                data={themeData} 
                options={{
                  ...chartOptions,
                  cutout: '65%',
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      ...chartOptions.plugins.legend,
                      position: 'right'
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Chart 2: Presentations Over Time */}
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-n-1 mb-1">Creaciones en el tiempo</h3>
            <p className="text-xs text-n-4">
              Tu comunidad está creciendo cada día
            </p>
          </div>
          <div className="h-64">
            <Line data={timeData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 3: Users by Role */}
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-n-1 mb-1">Usuarios por rol</h3>
            <p className="text-xs text-n-4">
              Conoce quiénes forman parte de Circle Up
            </p>
          </div>
          <div className="h-64">
            <Bar data={roleData} options={chartOptions} />
          </div>
        </div>

        {/* Chart 4: Users by Age Group */}
        <div className="bg-n-7/50 border border-n-6 rounded-xl p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-n-1 mb-1">Rango de edades</h3>
            <p className="text-xs text-n-4">
              Diversidad que enriquece la experiencia
            </p>
          </div>
          <div className="h-64">
            <Bar data={ageData} options={chartOptions} />
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
