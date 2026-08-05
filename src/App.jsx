import { useState, useEffect } from 'react';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HowToUseBusiness from "./pages/HowToUseBusiness";
import HowToUseVolunteer from "./pages/HowToUseVolunteer";
import HowToUseParticipant from "./pages/HowToUseParticipant";
import PresentationViewer from "./pages/PresentationViewer";
import RoadmapDocs from "./pages/RoadmapDocs";
import PoliciesDocs from "./pages/PoliciesDocs";
import EventsPage from "./pages/EventsPage";
import CommunityPage from "./pages/CommunityPage";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";
import ParticleLogoTest from "./pages/ParticleLogoTest";

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

const pagePathByKey = {
  home: "/",
  community: "/comunidad",
  events: "/eventos",
  aliados: "/aliados",
  voluntarios: "/voluntarios",
  participantes: "/participantes",
  roadmap: "/core",
  policies: "/politicas",
  login: "/login",
};

const pageByPath = {
  "/": "home",
  "/comunidad": "community",
  "/eventos": "events",
  "/aliados": "aliados",
  "/voluntarios": "voluntarios",
  "/participantes": "participantes",
  "/core": "roadmap",
  "/roadmap": "roadmap",
  "/politicas": "policies",
  "/policies": "policies",
  "/login": "login",
};

const App = () => {
  const [currentPage, setCurrentPageState] = useState("home");

  const syncPageWithLocation = () => {
    const normalizedPath = normalizePath(window.location.pathname);
    const matchedPage = pageByPath[normalizedPath];

    if (matchedPage) {
      setCurrentPageState(matchedPage);
      return true;
    }

    return false;
  };

  const setCurrentPage = (page, options = {}) => {
    const { replace = false } = options;
    const targetPath = pagePathByKey[page];

    setCurrentPageState(page);

    if (!targetPath) {
      return;
    }

    const normalizedPath = normalizePath(window.location.pathname);

    if (normalizedPath === targetPath) {
      return;
    }

    window.history[replace ? "replaceState" : "pushState"]({}, "", targetPath);
  };

  useEffect(() => {
    // Detect OAuth callback from hash or pathname
    const hash = window.location.hash.substring(1); // Remove #
    const pathname = normalizePath(window.location.pathname);
    
    // Handle particle logo test
    if (pathname === "/particle-test") {
      setCurrentPageState("particle-test");
      return;
    }
    
    // Handle presentation viewer
    const presentationMatch = pathname.match(/^\/p\/([^/]+)\/([^/]+)/);
    if (presentationMatch) {
      setCurrentPageState("presentation-viewer");
      return;
    }
    
    // Handle hash routing (for GitHub Pages)
    if (hash === "auth-callback" || hash.startsWith("auth-callback?")) {
      setCurrentPageState("auth-callback");
    }
    // Handle path routing (for local dev)
    else if (pathname === "/auth/callback") {
      setCurrentPageState("auth-callback");
    } else if (!syncPageWithLocation()) {
      setCurrentPageState("home");
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const pathname = normalizePath(window.location.pathname);
      const presentationMatch = pathname.match(/^\/p\/([^/]+)\/([^/]+)/);

      if (pathname === "/particle-test") {
        setCurrentPageState("particle-test");
        return;
      }

      if (presentationMatch) {
        setCurrentPageState("presentation-viewer");
        return;
      }

      if (pathname === "/auth/callback") {
        setCurrentPageState("auth-callback");
        return;
      }

      if (!syncPageWithLocation()) {
        setCurrentPageState("home");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  try {
    return (
      <div className="w-full">
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'community' && <CommunityPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'events' && <EventsPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'aliados' && <HowToUseBusiness setCurrentPage={setCurrentPage} />}
        {currentPage === 'voluntarios' && <HowToUseVolunteer setCurrentPage={setCurrentPage} />}
        {currentPage === 'participantes' && <HowToUseParticipant setCurrentPage={setCurrentPage} />}
        {currentPage === 'roadmap' && <RoadmapDocs setCurrentPage={setCurrentPage} />}
        {currentPage === 'policies' && <PoliciesDocs setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === 'auth-callback' && <AuthCallback setCurrentPage={setCurrentPage} />}
        {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
        {currentPage === 'presentation-viewer' && <PresentationViewer setCurrentPage={setCurrentPage} />}
        {currentPage === 'particle-test' && <ParticleLogoTest />}
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
