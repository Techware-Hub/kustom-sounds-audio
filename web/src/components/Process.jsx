import { useScrollReveal } from '../hooks/useScrollReveal';
import './Process.css';

const STEPS = [
  { n: '01', title: 'CONSULT', copy: 'Tell us your vehicle, your music, your budget. We listen first, sketch second.' },
  { n: '02', title: 'QUOTE',   copy: 'Transparent line-item pricing — gear, install hours, materials. No surprise upsell.' },
  { n: '03', title: 'INSTALL', copy: 'Clean wiring, factory-grade fitment, sound-deadened cabin. Done in the shop, not your driveway.' },
  { n: '04', title: 'TUNE',    copy: 'DSP-tuned for your cabin acoustics with measurement mics. You walk out smiling.' },
];

export default function Process() {
  const sectionRef = useScrollReveal();

  return (
    <section className="ksa-section ksa-process" id="process" ref={sectionRef}>
      <div className="ksa-process__head">
        <span className="ksa-badge" data-reveal>How It Works · 04 Steps</span>
        <h2 className="ksa-process__title" data-reveal>From Quote to Cabin</h2>
        <p className="ksa-process__lede" data-reveal>
          The same four-step run on every build. No shortcuts, no detours.
        </p>
      </div>

      <ol className="ksa-process__timeline">
        {STEPS.map((s, i) => (
          <li key={s.n} className="ksa-process__step" data-reveal>
            <div className="ksa-process__rail" aria-hidden="true">
              <span className="ksa-process__dot" />
              {i < STEPS.length - 1 && <span className="ksa-process__line" />}
            </div>
            <article className="ksa-process__card">
              <span className="ksa-process__num">{s.n}</span>
              <h3 className="ksa-process__step-title">{s.title}</h3>
              <p className="ksa-process__copy">{s.copy}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
