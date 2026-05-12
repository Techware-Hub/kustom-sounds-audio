import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const SERVICES = [
  {
    title: 'CARS',
    copy: 'Daily drivers, sport sedans, show cars. Subs, amps, head units, sound deadening.',
    img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=70',
    features: ['Subwoofer installs', 'Head unit upgrades', 'Sound deadening'],
  },
  {
    title: 'TRUCKS',
    copy: 'Lifted off-road, work trucks, overlanders. Sealed enclosures sized for the cab.',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=70',
    features: ['Under-seat subs', 'Roll-cage tweeters', 'Dual-battery wiring'],
  },
  {
    title: 'MARINE',
    copy: 'Boats and jet skis. Sealed, salt-rated, weather-built audio that survives the lake.',
    img: 'https://images.unsplash.com/photo-1599582909646-2126052dc6cd?auto=format&fit=crop&w=900&q=70',
    features: ['Salt-rated speakers', 'Wakeboard tower pods', 'Marine amp racks'],
  },
  {
    title: 'HOME & CUSTOM',
    copy: 'Garage theaters, custom enclosures, vintage car builds, full DSP tunes.',
    img: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=70',
    features: ['Garage theaters', 'One-off enclosures', 'DSP tune sessions'],
  },
];

export default function Services() {
  const sectionRef = useScrollReveal();

  return (
    <section className="ksa-section ksa-services" id="services" ref={sectionRef}>
      <div className="ksa-services__head">
        <span className="ksa-badge ksa-services__badge" data-reveal>Services · 04</span>
        <h2 className="ksa-services__title" data-reveal>What We Install</h2>
        <p className="ksa-services__lede" data-reveal>
          Four lanes. Same standard of work. Pick yours.
        </p>
      </div>
      <div className="ksa-services__grid">
        {SERVICES.map((s, i) => (
          <article key={s.title} className="ksa-service" data-reveal>
            <div className="ksa-service__img" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="ksa-service__body">
              <span className="ksa-service__num">0{i + 1}</span>
              <h3 className="ksa-service__title">{s.title}</h3>
              <p className="ksa-service__copy">{s.copy}</p>
              <ul className="ksa-service__features">
                {s.features.map((f) => (
                  <li key={f}><span aria-hidden="true">✓</span>{f}</li>
                ))}
              </ul>
              <span className="ksa-service__arrow">→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
