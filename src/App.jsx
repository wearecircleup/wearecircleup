import { useState, useEffect } from 'react';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HowToUseBusiness from "./pages/HowToUseBusiness";
import HowToUseVolunteer from "./pages/HowToUseVolunteer";
import HowToUseParticipant from "./pages/HowToUseParticipant";
import PresentationViewer from "./pages/PresentationViewer";
import RoadmapDocs from "./pages/RoadmapDocs";
import PoliciesDocs from "./pages/PoliciesDocs";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Detect OAuth callback from hash or pathname
    const hash = window.location.hash.substring(1); // Remove #
    const pathname = window.location.pathname;
    
    // Handle presentation viewer
    const presentationMatch = pathname.match(/^\/p\/([^/]+)\/([^/]+)/);
    if (presentationMatch) {
      setCurrentPage('presentation-viewer');
      return;
    }
    
    // Handle hash routing (for GitHub Pages)
    if (hash === 'auth-callback' || hash.startsWith('auth-callback?')) {
      setCurrentPage('auth-callback');
    }
    // Handle path routing (for local dev)
    else if (pathname === '/auth/callback') {
      setCurrentPage('auth-callback');
    }
  }, []);

  try {
    return (
      <div>
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'aliados' && <HowToUseBusiness setCurrentPage={setCurrentPage} />}
        {currentPage === 'voluntarios' && <HowToUseVolunteer setCurrentPage={setCurrentPage} />}
        {currentPage === 'participantes' && <HowToUseParticipant setCurrentPage={setCurrentPage} />}
        {currentPage === 'roadmap' && <RoadmapDocs setCurrentPage={setCurrentPage} />}
        {currentPage === 'policies' && <PoliciesDocs setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === 'auth-callback' && <AuthCallback setCurrentPage={setCurrentPage} />}
        {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
        {currentPage === 'presentation-viewer' && <PresentationViewer setCurrentPage={setCurrentPage} />}
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#ff0000', color: 'white' }}>
        <h1>Error en la aplicación:</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
};

export default App;
