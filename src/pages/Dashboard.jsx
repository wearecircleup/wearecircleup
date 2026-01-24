import { useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { GitHubAuthService } from "../shared/utils/github";
import DashboardHome from "../components/dashboard/DashboardHome";
import CreatePresentation from "../components/dashboard/CreatePresentation";
import curve from "../assets/hero/curve.png";

const Dashboard = ({ setCurrentPage }) => {
  const user = GitHubAuthService.getUser();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'create'
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    GitHubAuthService.logout();
    // Redirect to root URL to clear any callback parameters
    window.location.href = '/';
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
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
            <div className="flex flex-col gap-3">
              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-color-1/20 to-color-2/20 hover:from-color-1/30 hover:to-color-2/30 border border-color-1/30 rounded-xl transition-all group"
                >
                  <img
                    src={user?.avatarUrl}
                    alt={user?.username}
                    className="w-10 h-10 rounded-lg border-2 border-color-1/50"
                  />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-n-1 group-hover:text-color-1 transition-colors">
                      {user?.username || 'Usuario'}
                    </p>
                    <p className="text-xs text-n-4">Ver perfil</p>
                  </div>
                  <svg className="w-5 h-5 text-n-3 group-hover:text-color-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-full bg-n-7 border border-n-6 rounded-xl shadow-xl overflow-hidden z-50">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        // Trigger profile view in DashboardHome
                      }}
                      className="w-full px-4 py-3 text-left text-n-2 hover:bg-n-6 hover:text-color-1 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        // Trigger delete account
                      }}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2 border-t border-n-6"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar Cuenta
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={() => setCurrentPage('home')} className="text-sm lg:text-base flex-1">
                  ← Inicio
                </Button>
                <Button onClick={handleLogout} white className="text-sm lg:text-base flex-1">
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          {currentView === 'home' && (
            <DashboardHome 
              user={user} 
              onNavigate={handleNavigate}
            />
          )}
          
          {currentView === 'create' && (
            <CreatePresentation 
              user={user}
              onBack={() => handleNavigate('home')}
              onSuccess={handleCreateSuccess}
            />
          )}

        </div>
      </Section>
    </div>
  );
};

export default Dashboard;
