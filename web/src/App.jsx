import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import { SignupWallProvider } from './context/SignupWallContext';
import Grain from './components/Grain';
import SignupWall from './components/SignupWall';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import About from './components/About';
import Services from './components/Services';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Brands from './components/Brands';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useLenis();

  return (
    <SignupWallProvider>
      <Grain />
      <Hero />
      <MarqueeStrip />
      <About />
      <div className="ksa-accent-strip" aria-hidden="true" />
      <Services />
      <Features />
      <div className="ksa-accent-strip" aria-hidden="true" />
      <Gallery />
      <Process />
      <Brands />
      <div className="ksa-accent-strip" aria-hidden="true" />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <SignupWall />
    </SignupWallProvider>
  );
}
