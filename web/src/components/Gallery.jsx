import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSignupWall } from '../context/SignupWallContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const SHOTS = [
  { src: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=1100&q=70', span: 'big', tag: 'CUSTOM ENCLOSURE' },
  { src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=70', span: 'small', tag: 'AMP RACK' },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=70', span: 'small', tag: 'SUB INSTALL' },
  { src: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=900&q=70', span: 'tall', tag: 'WIRING' },
  { src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1100&q=70', span: 'wide', tag: 'SHOW CAR BUILD' },
  { src: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=70', span: 'small', tag: 'BOAT AUDIO' },
];

export default function Gallery() {
  const { open } = useSignupWall();
  const ref = useScrollReveal('[data-reveal]');
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const items = trackRef.current.querySelectorAll('.ksa-gal__item');
    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        const speed = (i % 2 === 0 ? -30 : 30);
        gsap.fromTo(el, { y: speed * -1 }, {
          y: speed,
          ease: 'none',
          scrollTrigger: { trigger: trackRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-section ksa-gallery" id="gallery" ref={ref}>
      <div className="ksa-gallery__head">
        <span className="ksa-badge" data-reveal>Recent Builds · 06</span>
        <h2 className="ksa-gallery__title" data-reveal>From the Bay</h2>
      </div>

      <div className="ksa-gal__grid" ref={trackRef}>
        {SHOTS.map((shot, i) => (
          <button
            key={i}
            type="button"
            className={`ksa-gal__item ksa-gal__item--${shot.span}`}
            onClick={open}
            aria-label={`View ${shot.tag} build`}
          >
            <img src={shot.src} alt="" loading="lazy" />
            <span className="ksa-gal__tag">{shot.tag}</span>
            <span className="ksa-gal__lock">LOCKED</span>
          </button>
        ))}
      </div>
    </section>
  );
}
