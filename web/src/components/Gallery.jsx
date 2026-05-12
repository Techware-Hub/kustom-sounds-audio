import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSignupWall } from '../context/SignupWallContext';
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
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      const items = pinRef.current.querySelectorAll('.ksa-gal__item');

      if (reduceMotion) return;

      if (isMobile) {
        gsap.from(pinRef.current.querySelectorAll('[data-reveal]'), {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
        gsap.from(items, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: pinRef.current, start: 'top 75%' },
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          pin: pinRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.from('.ksa-gallery__badge', { opacity: 0, y: 40, duration: 0.6 }, 0)
        .from('.ksa-gallery__title', { opacity: 0, y: 60, duration: 0.8 }, 0.2);

      items.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        const start = 1 + i * 0.55;
        tl.from(el, {
          opacity: 0,
          x: fromLeft ? -120 : 120,
          y: 40,
          scale: 0.94,
          duration: 0.8,
        }, start);
      });

      tl.to({}, { duration: 0.6 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-section ksa-gallery" id="gallery" ref={sectionRef}>
      <div className="ksa-gallery__pin" ref={pinRef}>
        <div className="ksa-gallery__head">
          <span className="ksa-badge ksa-gallery__badge" data-reveal>Recent Builds · 06</span>
          <h2 className="ksa-gallery__title" data-reveal>From the Bay</h2>
        </div>

        <div className="ksa-gal__grid">
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
      </div>
    </section>
  );
}
