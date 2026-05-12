import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import './About.css';

const STATS = [
  { value: 800, label: 'Installs Done',    suffix: '+' },
  { value: 25,  label: 'Pro Brands',       suffix: '+' },
  { value: 12,  label: 'Years Dialed In',  suffix: '+' },
];

function StatCard({ value, label, suffix }) {
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
  const sectionRef = useScrollReveal();

  return (
    <section className="ksa-section ksa-about" id="about" ref={sectionRef}>
      <div className="ksa-about__grid">
        <div className="ksa-about__copy">
          <span className="ksa-badge ksa-about__badge" data-reveal>About · Workshop</span>
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
          <p data-reveal>
            Our workshop sits in the heart of the bay — six bays, three full-time installers,
            a dedicated tuning room with measurement mics, and a wall of demo gear you can
            actually listen to before you buy. Walk in any time during shop hours.
          </p>
          <span className="ksa-badge ksa-about__hours" data-reveal>Workshop Hours · Mon–Sat · 9a–7p</span>
        </div>

        <div className="ksa-about__stats" data-reveal>
          {STATS.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}
