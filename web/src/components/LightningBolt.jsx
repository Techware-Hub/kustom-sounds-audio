export default function LightningBolt({ width = 80, color = '#a3ff12', flipped = false, style = {}, className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 96"
      width={width}
      aria-hidden="true"
      style={{
        transform: flipped ? 'scaleX(-1)' : 'none',
        filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 18px ${color})`,
        ...style,
      }}
    >
      <path
        d="M18 0 L4 52 L14 52 L8 96 L28 40 L18 40 L24 0 Z"
        fill={color}
      />
    </svg>
  );
}
