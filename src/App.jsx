import { useState } from 'react';
import Home from "./pages/Home";
import Features from "./pages/Features";
import HowToUseBusiness from "./pages/HowToUseBusiness";
import HowToUseVolunteer from "./pages/HowToUseVolunteer";
import HowToUseParticipant from "./pages/HowToUseParticipant";
import RoadmapDocs from "./pages/RoadmapDocs";
import PoliciesDocs from "./pages/PoliciesDocs";
import Login from "./pages/Login";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  try {
    return (
      <div>
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'features' && <Features setCurrentPage={setCurrentPage} />}
        {currentPage === 'aliados' && <HowToUseBusiness setCurrentPage={setCurrentPage} />}
        {currentPage === 'voluntarios' && <HowToUseVolunteer setCurrentPage={setCurrentPage} />}
        {currentPage === 'participantes' && <HowToUseParticipant setCurrentPage={setCurrentPage} />}
        {currentPage === 'roadmap' && <RoadmapDocs setCurrentPage={setCurrentPage} />}
        {currentPage === 'policies' && <PoliciesDocs setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
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
