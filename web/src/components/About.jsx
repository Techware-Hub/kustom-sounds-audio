import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import './About.css';

function Stat({ value, label, suffix = '+' }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="ksa-about__stat" ref={ref}>
      <div className="ksa-about__stat-val">
        {v}<span>{suffix}</span>
      </div>
      <div className="ksa-about__stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useScrollReveal('[data-reveal]');
  return (
    <section className="ksa-section ksa-about" id="about" ref={ref}>
      <div className="ksa-about__grid">
        <div className="ksa-about__copy">
          <span className="ksa-badge" data-reveal>About · Workshop</span>
          <h2 className="ksa-about__title" data-reveal>
            We don't sell speakers.<br/>We engineer the moment the bass hits.
          </h2>
          <p data-reveal>
            Kustom Sounds &amp; Audio is a dedicated install shop for drivers who actually
            care what their car sounds like. Daily commuters, weekend show cars, lifted trucks,
            boats — if it has a battery, we can dial it in.
          </p>
          <p data-reveal>
            Every build starts with how you drive and ends with a DSP tune. No off-the-shelf
            packages. No "good enough." Just clean wiring, factory-grade fitment, and a system
            you'll keep coming back to.
          </p>
        </div>

        <div className="ksa-about__stats">
          <Stat value={800} label="Installs Done" />
          <Stat value={25} label="Pro Brands" />
          <Stat value={12} label="Years Dialed In" />
        </div>
      </div>
    </section>
  );
}
