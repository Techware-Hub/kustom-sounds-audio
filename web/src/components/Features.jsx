import { useScrollReveal } from '../hooks/useScrollReveal';
import './Features.css';

const FEATURES = [
  {
    glyph: '▲',
    title: 'DSP-Tuned From Day One',
    copy: 'Every install ends with a custom DSP tune for your specific cabin acoustics. Measurement mics, time alignment, the works.',
    img: 'https://images.unsplash.com/photo-1535992165812-68d1861aa71e?auto=format&fit=crop&w=900&q=70',
  },
  {
    glyph: '◆',
    title: 'Clean, Factory-Grade Wiring',
    copy: 'No tape splices. No exposed runs. Looms loomed, grounds grounded, looks factory under the dash and behind the trim.',
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=70',
  },
  {
    glyph: '⚡',
    title: 'Warranty Backed',
    copy: '3-year install warranty on labor and craftsmanship, plus full manufacturer warranty on every component we put in.',
    img: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=70',
  },
  {
    glyph: '◉',
    title: 'Big-Name Brands Only',
    copy: 'JBL, Pioneer, Kicker, Rockford Fosgate, Alpine. No knockoffs, no grey-market gear. Authorized dealer or we don\'t carry it.',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=70',
  },
];

export default function Features() {
  const sectionRef = useScrollReveal();

  return (
    <section className="ksa-section ksa-features" id="features" ref={sectionRef}>
      <div className="ksa-features__head">
        <span className="ksa-badge" data-reveal>Why Kustom · 04 Reasons</span>
        <h2 className="ksa-features__title" data-reveal>Why Choose Us</h2>
        <p className="ksa-features__lede" data-reveal>
          Anyone can sell you a speaker. We make sure it actually sounds like one.
        </p>
      </div>

      <div className="ksa-features__grid">
        {FEATURES.map((f) => (
          <article key={f.title} className="ksa-feature" data-reveal>
            <div
              className="ksa-feature__bg"
              style={{ backgroundImage: `url(${f.img})` }}
              aria-hidden="true"
            />
            <div className="ksa-feature__content">
              <div className="ksa-feature__icon" aria-hidden="true">{f.glyph}</div>
              <h3 className="ksa-feature__title">{f.title}</h3>
              <p className="ksa-feature__copy">{f.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
