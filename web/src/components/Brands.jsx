import './Brands.css';

const BRANDS = ['JBL', 'PIONEER', 'KICKER', 'ROCKFORD FOSGATE', 'ALPINE', 'SONY', 'KENWOOD', 'FOCAL'];

export default function Brands() {
  const sequence = [...BRANDS, ...BRANDS];
  return (
    <section className="ksa-brands" aria-label="Brands we carry">
      <div className="ksa-brands__marquee">
        <div className="ksa-brands__track">
          {sequence.map((b, i) => (
            <span key={i} className="ksa-brands__item">
              <span>{b}</span>
              <span className="ksa-brands__sep">|</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
