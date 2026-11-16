import { AppProvider } from './context/AppContext';
import { IconSprite } from './components/ui/Icon';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Toast } from './components/layout/Toast';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Team } from './components/sections/Team';
import { Gallery } from './components/sections/Gallery';
import { Reviews } from './components/sections/Reviews';
import { Location } from './components/sections/Location';
import { CtaBand } from './components/sections/CtaBand';
import { BookingSection } from './components/booking/BookingSection';
import { LoyaltySection } from './components/loyalty/LoyaltySection';
import { TeamArea } from './components/management/TeamArea';

export default function App() {
  return (
    <AppProvider>
      <IconSprite />
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Team />
        <BookingSection />
        <Gallery />
        <LoyaltySection />
        <Reviews />
        <Location />
        <CtaBand />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <TeamArea />
      <Toast />
    </AppProvider>
  );
}
