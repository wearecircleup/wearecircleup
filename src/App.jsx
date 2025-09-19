import { useState } from 'react';
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import HowToUseBusiness from "./pages/HowToUseBusiness";
import HowToUseVolunteer from "./pages/HowToUseVolunteer";
import HowToUseParticipant from "./pages/HowToUseParticipant";
import RoadmapDocs from "./pages/RoadmapDocs";
import PoliciesDocs from "./pages/PoliciesDocs";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'features' && <Features setCurrentPage={setCurrentPage} />}
      {currentPage === 'pricing' && <Pricing setCurrentPage={setCurrentPage} />}
      {currentPage === 'aliados' && <HowToUseBusiness setCurrentPage={setCurrentPage} />}
      {currentPage === 'voluntarios' && <HowToUseVolunteer setCurrentPage={setCurrentPage} />}
      {currentPage === 'participantes' && <HowToUseParticipant setCurrentPage={setCurrentPage} />}
      {currentPage === 'roadmap' && <RoadmapDocs setCurrentPage={setCurrentPage} />}
      {currentPage === 'policies' && <PoliciesDocs setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;
