import ButtonGradient from "../assets/svg/ButtonGradient";
import Benefits from "../components/Benefits";
import Collaboration from "../components/Collaboration";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NeedHelp from "../components/NeedHelp";
import Pricing from "../components/Pricing";
import Roadmap from "../components/Roadmap";
import Services from "../components/Services";

const Home = ({ setCurrentPage }) => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header setCurrentPage={setCurrentPage} />
        <Hero />
        <Benefits />
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
        <div className="w-full bg-n-8 border-t border-n-6">
          <NeedHelp 
            title="¿Necesitas ayuda?"
            subtitle="No encuentras tu respuesta, contáctanos"
            cards={[
              {
                icon: "💬",
                title: "Únete a nuestra comunidad",
                description: "Discute cualquier tema con otros usuarios"
              },
              {
                icon: "📧",
                title: "Escríbenos",
                description: "",
                email: "hola@circleup.org"
              }
            ]}
          />
        </div>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default Home;
