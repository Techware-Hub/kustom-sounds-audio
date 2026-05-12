import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Brands.css';

gsap.registerPlugin(ScrollTrigger);

const BRANDS = ['JBL', 'PIONEER', 'KICKER', 'ROCKFORD FOSGATE', 'ALPINE', 'SONY', 'KENWOOD', 'FOCAL'];

export default function Brands() {
  const sectionRef = useRef(null);
  const sequence = [...BRANDS, ...BRANDS];

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-brands" aria-label="Brands we carry" ref={sectionRef}>
      <div className="ksa-brands__marquee">
        <div className="ksa-brands__track">
          {sequence.map((b, i) => (
            <span key={i} className="ksa-brands__item">
              <span>{b}</span>
              <span className="ksa-brands__sep">|</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
