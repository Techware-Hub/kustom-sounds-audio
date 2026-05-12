import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: 'CARS',
    copy: 'Daily drivers, sport sedans, show cars. Subs, amps, head units, sound deadening.',
    img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=70',
  },
  {
    title: 'TRUCKS',
    copy: 'Lifted off-road, work trucks, overlanders. Sealed enclosures sized for the cab.',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=70',
  },
  {
    title: 'MARINE',
    copy: 'Boats and jet skis. Sealed, salt-rated, weather-built audio that survives the lake.',
    img: 'https://images.unsplash.com/photo-1599582909646-2126052dc6cd?auto=format&fit=crop&w=900&q=70',
  },
  {
    title: 'HOME & CUSTOM',
    copy: 'Garage theaters, custom enclosures, vintage car builds, full DSP tunes.',
    img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=70',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      const cards = pinRef.current.querySelectorAll('.ksa-service');

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
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          stagger: 0.12,
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

      tl.from('.ksa-services__badge', { opacity: 0, y: 40, duration: 0.6 }, 0)
        .from('.ksa-services__title', { opacity: 0, y: 60, duration: 0.8 }, 0.2);

      cards.forEach((card, i) => {
        // Each card window spans ~25% of pin distance, starting after head reveal
        const start = 1 + i * 0.9;
        tl.from(card, { opacity: 0, y: 100, duration: 0.8 }, start)
          .fromTo(card,
            { scale: 0.92, boxShadow: '0 0 0 rgba(163,255,18,0)' },
            { scale: 1, boxShadow: '0 0 24px rgba(163,255,18,0.25)', duration: 0.8 },
            start);
      });

      // Hold final state
      tl.to({}, { duration: 0.6 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-section ksa-services" id="services" ref={sectionRef}>
      <div className="ksa-services__pin" ref={pinRef}>
        <div className="ksa-services__head">
          <span className="ksa-badge ksa-services__badge" data-reveal>Services · 04</span>
          <h2 className="ksa-services__title" data-reveal>What We Install</h2>
        </div>
        <div className="ksa-services__grid">
          {SERVICES.map((s, i) => (
            <article key={s.title} className="ksa-service" data-reveal>
              <div className="ksa-service__img" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="ksa-service__body">
                <span className="ksa-service__num">0{i + 1}</span>
                <h3 className="ksa-service__title">{s.title}</h3>
                <p className="ksa-service__copy">{s.copy}</p>
                <span className="ksa-service__arrow">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
