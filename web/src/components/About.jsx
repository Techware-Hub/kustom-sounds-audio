import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 800, label: 'Installs Done', suffix: '+' },
  { value: 25,  label: 'Pro Brands',    suffix: '+' },
  { value: 12,  label: 'Years Dialed In', suffix: '+' },
];

export default function About() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
      const statVals = pinRef.current.querySelectorAll('.ksa-about__stat-val');
      const stats = pinRef.current.querySelectorAll('.ksa-about__stat');

      // Init stat numbers at 0 so they tick in sync with scroll
      statVals.forEach((el) => { el.firstChild && (el.firstChild.nodeValue = '0'); });

      if (reduceMotion) {
        // Just paint final values, no pin
        statVals.forEach((el, i) => {
          if (el.firstChild) el.firstChild.nodeValue = String(STATS[i].value);
        });
        return;
      }

      if (isMobile) {
        // Simple mobile reveal — no pin
        gsap.from(pinRef.current.querySelectorAll('[data-reveal]'), {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
        // Count up once when stats reach viewport
        STATS.forEach((s, i) => {
          const counter = { v: 0 };
          gsap.to(counter, {
            v: s.value,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: stats[i], start: 'top 85%', once: true },
            onUpdate: () => {
              const node = statVals[i] && statVals[i].firstChild;
              if (node) node.nodeValue = String(Math.round(counter.v));
            },
          });
        });
        return;
      }

      // Desktop: pinned scrub timeline
      const counters = STATS.map(() => ({ v: 0 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: pinRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.from('.ksa-about__badge',  { opacity: 0, x: -60, duration: 0.6 }, 0)
        .from('.ksa-about__title',  { opacity: 0, x: -80, duration: 0.8 }, 0.2)
        .from('.ksa-about__p1',     { opacity: 0, x: -60, duration: 0.8 }, 0.6)
        .from('.ksa-about__p2',     { opacity: 0, x: -60, duration: 0.8 }, 1.0)
        .from(stats, { opacity: 0, x: 60, duration: 0.7, stagger: 0.25 }, 1.2);

      STATS.forEach((s, i) => {
        tl.to(counters[i], {
          v: s.value,
          duration: 0.7,
          ease: 'none',
          onUpdate: () => {
            const node = statVals[i] && statVals[i].firstChild;
            if (node) node.nodeValue = String(Math.round(counters[i].v));
          },
        }, 1.2 + i * 0.25);
      });

      // Hold the final state for the last stretch
      tl.to({}, { duration: 0.6 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-section ksa-about" id="about" ref={sectionRef}>
      <div className="ksa-about__pin" ref={pinRef}>
        <div className="ksa-about__grid">
          <div className="ksa-about__copy">
            <span className="ksa-badge ksa-about__badge" data-reveal>About · Workshop</span>
            <h2 className="ksa-about__title" data-reveal>
              We don't sell speakers.<br/>We engineer the moment the bass hits.
            </h2>
            <p className="ksa-about__p1" data-reveal>
              Kustom Sounds &amp; Audio is a dedicated install shop for drivers who actually
              care what their car sounds like. Daily commuters, weekend show cars, lifted trucks,
              boats — if it has a battery, we can dial it in.
            </p>
            <p className="ksa-about__p2" data-reveal>
              Every build starts with how you drive and ends with a DSP tune. No off-the-shelf
              packages. No "good enough." Just clean wiring, factory-grade fitment, and a system
              you'll keep coming back to.
            </p>
          </div>

          <div className="ksa-about__stats">
            {STATS.map((s) => (
              <div className="ksa-about__stat" key={s.label}>
                <div className="ksa-about__stat-val">
                  {'0'}<span>{s.suffix}</span>
                </div>
                <div className="ksa-about__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
