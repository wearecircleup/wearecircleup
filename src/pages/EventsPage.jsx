import Header from "../components/Header";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import NeedHelp from "../components/NeedHelp";
import EventsTab from "../components/dashboard/EventsTab";
import PublicPageHero from "../components/PublicPageHero";

const EventsPage = ({ setCurrentPage }) => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] min-h-screen bg-n-8">
        <Header setCurrentPage={setCurrentPage} />

        <PublicPageHero
          heroLabel="Eventos"
          heroTitle="Eventos CircleUp"
          readTime="Eventos activos"
          lastUpdated="Actualizacion en tiempo real"
          location="Tocancipa, Cundinamarca"
        />

        <section className="relative py-10 sm:py-12 lg:py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <EventsTab />
          </div>
        </section>

        <NeedHelp
          title="Quieres participar en un proximo evento?"
          subtitle="Si necesitas ayuda con inscripciones, talleres o colaboraciones, estamos listos para acompanarte."
          cards={[
            {
              iconType: "community",
              title: "Quiero asistir",
              description: "Explora eventos disponibles, proximos agotados e historicos desde una misma vista. Si un evento ya no tiene cupo, escribenos al correo y, si es posible, te ayudaremos.",
            },
            {
              iconType: "email",
              title: "Quiero colaborar",
              description: "No te inscribas mas de una vez al mismo evento. Espera hasta 5 minutos para recibir tu invitacion y, si no llega, escribenos. Tambien puedes contactarnos para proponer espacios, actividades o nuevas alianzas.",
              email: "hola@circleup.com.co",
            },
          ]}
        />

        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default EventsPage;
