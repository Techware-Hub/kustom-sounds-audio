import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../assets/logo.png';
import EqualizerBars from './EqualizerBars';
import LightningBolt from './LightningBolt';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=70';

export default function Hero() {
  const rootRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // Load-in timeline (always runs, even on mobile / reduced motion is short anyway)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ksa-hero__logo', { opacity: 0, scale: 0.9, duration: 0.7 })
        .from('.ksa-hero__char', { opacity: 0, y: 40, stagger: 0.04, duration: 0.6 }, '-=0.2')
        .from('.ksa-hero__sub', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
        .from('.ksa-hero__ctas > *', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.2')
        .from('.ksa-hero__bolt', { opacity: 0, x: (i) => (i === 0 ? -40 : 40), duration: 0.6 }, '-=0.4');

      if (reduceMotion || isMobile) return;

      // Scroll-jacked exit timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=80%',
          pin: pinRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
        .to('.ksa-hero__headline', { opacity: 0, y: -40, duration: 1 }, 0)
        .to('.ksa-hero__sub', { opacity: 0, y: -30, duration: 1 }, 0)
        .to('.ksa-hero__ctas', { opacity: 0, y: -30, duration: 1 }, 0)
        .to('.ksa-hero__logo', { scale: 0.7, duration: 1 }, 0)
        .to('.ksa-hero__bg', { opacity: 0.06, duration: 1 }, 0)
        .to('.ksa-hero__vignette', { opacity: 0.7, duration: 1 }, 0)
        .to('.ksa-hero__cue', { opacity: 0, duration: 0.4 }, 0);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const headline = 'WE BUILD THE BASS';

  return (
    <section className="ksa-hero" ref={rootRef} id="top">
      <div className="ksa-hero__pin" ref={pinRef}>
        <div className="ksa-hero__bg" style={{ backgroundImage: `url(${HERO_BG})` }} aria-hidden="true" />
        <div className="ksa-hero__vignette" aria-hidden="true" />

        <LightningBolt className="ksa-hero__bolt ksa-hero__bolt--l" />
        <LightningBolt className="ksa-hero__bolt ksa-hero__bolt--r" flipped />

        <div className="ksa-hero__inner">
          <img className="ksa-hero__logo" src={logo} alt="Kustom Sounds & Audio" />

          <h1 className="ksa-hero__headline">
            {headline.split(' ').map((word, wi) => (
              <span key={wi} className="ksa-hero__word">
                {word.split('').map((ch, ci) => (
                  <span key={ci} className="ksa-hero__char">{ch}</span>
                ))}
                {' '}
              </span>
            ))}
          </h1>

          <p className="ksa-hero__sub">
            Pro audio install for cars, trucks, marine &amp; home — engineered loud, tuned right.
          </p>

          <div className="ksa-hero__ctas">
            <a className="ksa-btn" href="#contact">Get a Quote →</a>
            <a className="ksa-btn ksa-btn--ghost" href="#gallery">See Our Work</a>
          </div>
        </div>

        <EqualizerBars count={32} height={90} gap={3} className="ksa-hero__eq" />

        <div className="ksa-hero__cue" aria-hidden="true">
          <span>SCROLL</span>
          <span className="ksa-hero__cue-arrow">▾</span>
        </div>
      </div>
    </section>
  );
}
