import { AppProvider } from './context/AppContext';
import { IconSprite } from './components/ui/Icon';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Toast } from './components/layout/Toast';
import { Hero } from './components/sections/Hero';
import { Personalize } from './components/sections/Personalize';
import { Solutions } from './components/sections/Solutions';
import { SiteDemo } from './components/sections/SiteDemo';
import { Roadmap } from './components/sections/Roadmap';
import { Contact } from './components/sections/Contact';
import { BookingSection } from './components/booking/BookingSection';
import { ManagementSection } from './components/management/ManagementSection';
import { LoyaltySection } from './components/loyalty/LoyaltySection';

export default function App() {
  return (
    <AppProvider>
      <IconSprite />
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Personalize />
        <Solutions />
        <div className="pole-divider" aria-hidden="true" />
        <SiteDemo />
        <BookingSection />
        <ManagementSection />
        <LoyaltySection />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <Toast />
    </AppProvider>
  );
}
