import './MarqueeStrip.css';

const PHRASES = [
  'DSP TUNED',
  'CLEAN WIRING',
  'FACTORY-GRADE FITMENT',
  'WARRANTY BACKED',
  '12 YRS IN THE BAY',
  'BASS THAT HITS',
];

export default function MarqueeStrip() {
  // Double the array so the marquee loops seamlessly with translateX(-50%)
  const sequence = [...PHRASES, ...PHRASES];

  return (
    <section className="ksa-marquee" aria-hidden="true">
      <div className="ksa-marquee__viewport">
        <div className="ksa-marquee__track">
          {sequence.map((p, i) => (
            <span key={i} className="ksa-marquee__item">
              <span className="ksa-marquee__star">★</span>
              <span className="ksa-marquee__phrase">{p}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
