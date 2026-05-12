import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: '01', title: 'CONSULT', copy: 'Tell us your vehicle, your music, your budget. We listen first.' },
  { n: '02', title: 'QUOTE',   copy: 'Transparent line-item pricing. No surprise upsell.' },
  { n: '03', title: 'INSTALL', copy: 'Clean wiring, factory-grade fitment, sound-deadened cabin.' },
  { n: '04', title: 'TUNE',    copy: 'DSP-tuned for your cabin. You walk out smiling.' },
];

export default function Process() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const total = trackRef.current.scrollWidth - window.innerWidth;
      gsap.to(trackRef.current, {
        x: -total,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-process" id="process" ref={sectionRef}>
      <div className="ksa-process__head">
        <span className="ksa-badge">How It Works</span>
        <h2 className="ksa-process__title">From Quote to Cabin</h2>
      </div>
      <div className="ksa-process__track" ref={trackRef}>
        {STEPS.map((s) => (
          <article key={s.n} className="ksa-process__step">
            <span className="ksa-process__num">{s.n}</span>
            <h3 className="ksa-process__step-title">{s.title}</h3>
            <p className="ksa-process__copy">{s.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
