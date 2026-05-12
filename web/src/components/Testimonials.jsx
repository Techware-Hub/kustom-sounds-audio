import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const QUOTES = [
  {
    quote: 'Replaced my whole front stage and added a sealed 12 in the trunk. Sounds like a different car. These guys are the real deal.',
    name: 'Marcus T.',
    ride: '2019 Civic Si',
  },
  {
    quote: "I've had three trucks built by Kustom over the years. Wiring is always clean, tune is always dialed. Won't go anywhere else.",
    name: 'Dave R.',
    ride: '2022 F-250',
  },
  {
    quote: 'Got my pontoon done for the lake. Sounds incredible over the engine noise, no static, fully waterproof. Worth every dollar.',
    name: 'Lena P.',
    ride: '2021 Bennington',
  },
];

export default function Testimonials() {
  const sectionRef = useScrollReveal();

  return (
    <section className="ksa-section ksa-testimonials" id="testimonials" ref={sectionRef}>
      <div className="ksa-testimonials__head">
        <span className="ksa-badge" data-reveal>Word From The Bay</span>
        <h2 className="ksa-testimonials__title" data-reveal>Real Customers. Real Builds.</h2>
        <p className="ksa-testimonials__lede" data-reveal>
          The work speaks for itself — but they say it better.
        </p>
      </div>

      <div className="ksa-testimonials__grid">
        {QUOTES.map((q) => (
          <figure key={q.name} className="ksa-testimonial" data-reveal>
            <span className="ksa-testimonial__mark" aria-hidden="true">“</span>
            <blockquote className="ksa-testimonial__quote">{q.quote}</blockquote>
            <figcaption className="ksa-testimonial__cite">
              <span className="ksa-testimonial__dash" aria-hidden="true">—</span>
              <span className="ksa-testimonial__name">{q.name}</span>
              <span className="ksa-testimonial__sep" aria-hidden="true">·</span>
              <span className="ksa-testimonial__ride">{q.ride}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
