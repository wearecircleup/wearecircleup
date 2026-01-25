import { useState, useEffect } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { GitHubAuthService } from "../shared/utils/github";
import DashboardHome from "../components/dashboard/DashboardHome";
import CreatePresentation from "../components/dashboard/CreatePresentation";
import PresentationViewerComponent from "../components/dashboard/PresentationViewerComponent";
import curve from "../assets/hero/curve.png";

const Dashboard = ({ setCurrentPage }) => {
  const user = GitHubAuthService.getUser();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'create' | 'view'
  const [dashboardTab, setDashboardTab] = useState('presentations'); // 'presentations' | 'profile'
  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileAction, setProfileAction] = useState(null); // 'view' | 'delete'

  const handleLogout = () => {
    GitHubAuthService.logout();
    // Redirect to root URL to clear any callback parameters
    window.location.href = '/';
  };

  const handleNavigate = (view, data) => {
    setCurrentView(view);
    if (view === 'view' && data) {
      setSelectedPresentation(data);
    }
  };

  const handleProfileAction = (action) => {
    setDashboardTab('profile');
    setProfileAction(action);
  };

  const handleCreateSuccess = () => {
    // Return to home after successful creation
    setTimeout(() => setCurrentView('home'), 2000);
  };

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      {/* Stars background */}
      <div className="absolute inset-0 opacity-20">
        <img src="./assets/hero/stars.svg" alt="" className="w-full h-full object-cover" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 lg:top-20 lg:left-20 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-r from-color-1/20 to-color-2/20 rounded-full blur-xl"></div>
      <div className="absolute top-32 right-16 lg:top-40 lg:right-32 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-color-2/20 to-color-3/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-16 lg:bottom-32 lg:left-32 w-12 h-12 lg:w-20 lg:h-20 bg-gradient-to-r from-color-3/20 to-color-1/20 rounded-full blur-xl"></div>

      <Section className="min-h-screen py-6 lg:py-10">
        <div className="container max-w-7xl mx-auto px-4">
          
          {/* Logo - Top Left */}
          <div className="mb-6">
            <Logo 
              logoSize={{ width: 32, height: 32 }}
              textSize="text-base"
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-n-1 mb-2">
                  Dashboard{" "}
                  <span className="inline-block relative font-semibold">
                    Circle Up
                    <img
                      src={curve}
                      className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                      width={624}
                      height={28}
                      alt="Curve"
                    />
                  </span>
                </h1>
                <p className="text-n-4 text-base lg:text-lg">
                  Bienvenido, <span className="text-color-1 font-medium">{user?.username || 'Usuario'}</span>
                </p>
              </div>
              <div className="flex gap-2 w-full lg:w-auto">
                <Button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setCurrentPage('home');
                  }} 
                  className="text-xs sm:text-sm whitespace-nowrap flex-1 lg:flex-initial"
                >
                  ← Inicio
                </Button>
                <Button 
                  onClick={handleLogout} 
                  white 
                  className="text-xs sm:text-sm whitespace-nowrap flex-1 lg:flex-initial"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>

            {/* Tab Navigation - Only show if user has profile */}
            {hasProfile && (
              <div className="flex gap-1 sm:gap-2 border-b border-n-6 overflow-x-auto">
                <button
                  onClick={() => setDashboardTab('presentations')}
                  className={`relative px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                    dashboardTab === 'presentations'
                      ? 'text-n-1'
                      : 'text-n-4 hover:text-n-2'
                  }`}
                >
                  Presentaciones
                  {dashboardTab === 'presentations' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-color-1 to-color-2"></div>
                  )}
                </button>
                <button
                  onClick={() => setDashboardTab('profile')}
                  className={`relative px-4 sm:px-6 py-3 font-semibold text-xs sm:text-sm whitespace-nowrap transition-all ${
                    dashboardTab === 'profile'
                      ? 'text-n-1'
                      : 'text-n-4 hover:text-n-2'
                  }`}
                >
                  Perfil
                  {dashboardTab === 'profile' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-color-1 to-color-2"></div>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {currentView === 'home' && (
            <DashboardHome 
              user={user} 
              onNavigate={handleNavigate}
              profileAction={dashboardTab === 'profile' ? (profileAction || 'view') : null}
              onProfileActionComplete={() => {
                setProfileAction(null);
                setDashboardTab('presentations');
              }}
              onProfileStatusChange={setHasProfile}
              showPresentations={dashboardTab === 'presentations'}
            />
          )}
          
          {currentView === 'create' && (
            <CreatePresentation 
              user={user}
              onBack={() => handleNavigate('home')}
              onSuccess={handleCreateSuccess}
            />
          )}
          
          {currentView === 'view' && selectedPresentation && (
            <PresentationViewerComponent 
              presentation={selectedPresentation}
              onBack={() => handleNavigate('home')}
              onUpdate={(updatedPresentation) => {
                setSelectedPresentation(updatedPresentation);
              }}
            />
          )}

        </div>
      </Section>
    </div>
  );
};

export default Dashboard;
