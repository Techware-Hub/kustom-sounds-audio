import './EqualizerBars.css';

export default function EqualizerBars({ count = 24, height = 80, gap = 4, className = '' }) {
  const bars = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      className={`ksa-eq ${className}`}
      style={{ height, gap }}
      aria-hidden="true"
    >
      {bars.map((i) => (
        <span
          key={i}
          className="ksa-eq__bar"
          style={{ animationDelay: `${(i * 73) % 900}ms` }}
        />
      ))}
    </div>
  );
}
