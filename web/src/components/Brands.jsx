import { useScrollReveal } from '../hooks/useScrollReveal';
import './Brands.css';

const BRANDS = ['JBL', 'PIONEER', 'KICKER', 'ROCKFORD FOSGATE', 'ALPINE', 'SONY', 'KENWOOD', 'FOCAL'];

export default function Brands() {
  const sectionRef = useScrollReveal();
  return (
    <section className="ksa-brands" aria-label="Brands we carry" ref={sectionRef} data-reveal>
      <div className="ksa-brands__marquee">
        <div className="ksa-brands__track">
          {BRANDS.map((b, i) => (
            <span key={b} className="ksa-brands__item">
              <span>{b}</span>
              {i < BRANDS.length - 1 && <span className="ksa-brands__sep">|</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
