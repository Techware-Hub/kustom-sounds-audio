import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSignupWall } from '../context/SignupWallContext';
import logo from '../assets/logo.png';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const NAV = ['About', 'Services', 'Gallery', 'Brands', 'Contact'];
const SOCIAL = ['Instagram', 'Facebook', 'TikTok', 'YouTube'];

export default function Footer() {
  const { open } = useSignupWall();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="ksa-footer" ref={ref}>
      <div className="ksa-footer__grid">
        <div className="ksa-footer__brand" data-reveal>
          <img src={logo} alt="Kustom Sounds & Audio" className="ksa-footer__logo" />
          <p>Engineered loud. Tuned right.<br/>Pro audio install since 2014.</p>
        </div>

        <nav className="ksa-footer__nav" data-reveal>
          <span className="ksa-badge">Navigate</span>
          <ul>
            {NAV.map((n) => (
              <li key={n}>
                <button type="button" onClick={open}>{n}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ksa-footer__social" data-reveal>
          <span className="ksa-badge">Follow</span>
          <ul>
            {SOCIAL.map((s) => (
              <li key={s}>
                <button type="button" onClick={open}>{s}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ksa-footer__bottom" data-reveal>
        <span>© {new Date().getFullYear()} Kustom Sounds &amp; Audio.</span>
        <span>Built loud.</span>
      </div>
    </footer>
  );
}
