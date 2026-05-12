import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', message: '' });

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', phone: '', vehicle: '', message: '' });
    }, 4000);
  };

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const ctx = gsap.context(() => {
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
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: pinRef.current,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.from('.ksa-contact__badge', { opacity: 0, y: 40, duration: 0.5 }, 0)
        .from('.ksa-contact__title', { opacity: 0, y: 60, duration: 0.7 }, 0.15)
        .from('.ksa-contact__sub',   { opacity: 0, y: 30, duration: 0.5 }, 0.4)
        .from('.ksa-contact__form label', {
          opacity: 0, x: -80, duration: 0.6, stagger: 0.15,
        }, 0.6)
        .from('.ksa-contact__form button', { opacity: 0, x: -80, duration: 0.5 }, 1.4)
        .from('.ksa-contact__cta', { opacity: 0, x: 100, duration: 0.9 }, 0.7)
        .to({}, { duration: 0.5 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ksa-section ksa-contact" id="contact" ref={sectionRef}>
      <div className="ksa-contact__pin" ref={pinRef}>
        <div className="ksa-contact__head">
          <span className="ksa-badge ksa-contact__badge" data-reveal>Get a Quote · Free</span>
          <h2 className="ksa-contact__title" data-reveal>Let's Build It Loud.</h2>
          <p className="ksa-contact__sub" data-reveal>Reply within 24h. WhatsApp is fastest.</p>
        </div>

        <div className="ksa-contact__grid">
          <form className="ksa-contact__form" onSubmit={submit} data-reveal>
            <label>
              <span>Name</span>
              <input value={form.name} onChange={update('name')} required />
            </label>
            <label>
              <span>Phone</span>
              <input value={form.phone} onChange={update('phone')} required type="tel" />
            </label>
            <label>
              <span>Vehicle (year / make / model)</span>
              <input value={form.vehicle} onChange={update('vehicle')} />
            </label>
            <label>
              <span>What are you looking to install?</span>
              <textarea value={form.message} onChange={update('message')} rows={4} required />
            </label>
            <button type="submit" className="ksa-btn">{sent ? 'Sent ✓' : 'Send Request →'}</button>
          </form>

          <aside className="ksa-contact__cta" data-reveal>
            <a className="ksa-contact__whats" href="https://wa.me/000000000" target="_blank" rel="noopener">
              <span className="ksa-contact__whats-icon" aria-hidden="true">●</span>
              <span>
                <small>Faster</small>
                <strong>WhatsApp Us</strong>
              </span>
            </a>
            <a className="ksa-contact__line" href="tel:+10000000000">
              <small>Call</small>
              <strong>(000) 000-0000</strong>
            </a>
            <a className="ksa-contact__line" href="mailto:hello@kustomsounds.audio">
              <small>Email</small>
              <strong>hello@kustomsounds.audio</strong>
            </a>
            <div className="ksa-contact__addr">
              <small>Workshop</small>
              <strong>123 Bassline Ave.<br/>Open Mon–Sat · 9a–7p</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
