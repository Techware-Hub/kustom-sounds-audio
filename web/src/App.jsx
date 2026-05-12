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

export default function App() {
  useLenis();
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
