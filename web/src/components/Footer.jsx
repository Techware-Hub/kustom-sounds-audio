import { useSignupWall } from '../context/SignupWallContext';
import logo from '../assets/logo.png';
import './Footer.css';

const NAV = ['About', 'Services', 'Gallery', 'Brands', 'Contact'];
const SOCIAL = ['Instagram', 'Facebook', 'TikTok', 'YouTube'];

export default function Footer() {
  const { open } = useSignupWall();
  return (
    <footer className="ksa-footer">
      <div className="ksa-footer__grid">
        <div className="ksa-footer__brand">
          <img src={logo} alt="Kustom Sounds & Audio" className="ksa-footer__logo" />
          <p>Engineered loud. Tuned right.<br/>Pro audio install since 2014.</p>
        </div>

        <nav className="ksa-footer__nav">
          <span className="ksa-badge">Navigate</span>
          <ul>
            {NAV.map((n) => (
              <li key={n}>
                <button type="button" onClick={open}>{n}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ksa-footer__social">
          <span className="ksa-badge">Follow</span>
          <ul>
            {SOCIAL.map((s) => (
              <li key={s}>
                <button type="button" onClick={open}>{s}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ksa-footer__bottom">
        <span>© {new Date().getFullYear()} Kustom Sounds &amp; Audio.</span>
        <span>Built loud.</span>
      </div>
    </footer>
  );
}
