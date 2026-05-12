import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import { SignupWallProvider } from './context/SignupWallContext';
import Grain from './components/Grain';
import SignupWall from './components/SignupWall';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Brands from './components/Brands';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useLenis();

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh, { once: true });
    }
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <SignupWallProvider>
      <Grain />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Process />
      <Brands />
      <Contact />
      <Footer />
      <SignupWall />
    </SignupWallProvider>
  );
}
