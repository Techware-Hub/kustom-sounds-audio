import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './FAQ.css';

const ITEMS = [
  {
    q: 'How long does an install take?',
    a: 'Most car systems take 1–2 days. Custom enclosure builds run 3–5 days. Marine installs are typically 1–2 days. You\'ll get an exact ETA at quote.',
  },
  {
    q: 'Do you warranty your work?',
    a: 'Yes. 3-year install warranty on labor and craftsmanship, plus the full manufacturer warranty on every component. Keep your receipt — that\'s it.',
  },
  {
    q: 'Do you sell gear if I just want it shipped?',
    a: "We do, but we don’t recommend it. The value of what we do is in the install and the tune — not the box on your porch. We’d rather build it right than ship it raw.",
  },
  {
    q: 'Can you tune a system I had installed elsewhere?',
    a: 'Yes. Tune-only appointments are $200 flat — 2-hour session, full DSP and EQ pass with measurement mics. Walk in louder than you walked out.',
  },
  {
    q: 'Do you work on stock systems or only aftermarket?',
    a: 'Both. We do head-unit retains, factory amp integrations, and full rip-and-replace builds. We\'ll tell you straight up which makes sense for your car.',
  },
  {
    q: 'What payment do you accept?',
    a: 'Cash, all major cards, and 0% financing on builds over $1,500 via our finance partner. Approval is usually instant at the counter.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ksa-faq__item ${open ? 'is-open' : ''}`} data-reveal>
      <button
        type="button"
        className="ksa-faq__q"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ksa-faq__q-text">{q}</span>
        <span className="ksa-faq__icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22">
            <path d="M5 8 L11 14 L17 8" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className="ksa-faq__a" role="region" aria-hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useScrollReveal();

  return (
    <section className="ksa-section ksa-faq" id="faq" ref={sectionRef}>
      <div className="ksa-faq__head">
        <span className="ksa-badge" data-reveal>FAQ · Common Questions</span>
        <h2 className="ksa-faq__title" data-reveal>Before You Book</h2>
        <p className="ksa-faq__lede" data-reveal>
          The questions we get every week. Still got more? Hit the form below.
        </p>
      </div>

      <div className="ksa-faq__list">
        {ITEMS.map((it) => (
          <FAQItem key={it.q} q={it.q} a={it.a} />
        ))}
      </div>
    </section>
  );
}
