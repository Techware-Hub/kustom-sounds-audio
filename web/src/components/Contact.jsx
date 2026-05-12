import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

export default function Contact() {
  const sectionRef = useScrollReveal();
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

  return (
    <section className="ksa-section ksa-contact" id="contact" ref={sectionRef}>
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
    </section>
  );
}
