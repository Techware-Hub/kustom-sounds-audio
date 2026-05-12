import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSignupWall } from '../context/SignupWallContext';
import EqualizerBars from './EqualizerBars';
import './SignupWall.css';

export default function SignupWall() {
  const { isOpen, close } = useSignupWall();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ksa-wall"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <div className="ksa-wall__grid" aria-hidden="true" />
          <motion.div
            className="ksa-wall__panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="ksa-wall-title"
          >
            <button className="ksa-wall__close" onClick={close} aria-label="Close">×</button>

            <EqualizerBars count={5} height={56} gap={6} className="ksa-wall__eq" />

            <span className="ksa-badge ksa-wall__badge">LOCKED · SIGNAL CUT</span>
            <h2 id="ksa-wall-title" className="ksa-wall__title">FREQUENCY BLOCKED</h2>
            <p className="ksa-wall__copy">
              Sign up to tune in to the full Kustom Sounds experience — gallery, custom builds, and pro install booking.
            </p>

            <button className="ksa-btn ksa-wall__cta" onClick={close}>
              Sign Up <span aria-hidden="true">→</span>
            </button>
            <button className="ksa-wall__later" onClick={close}>Maybe later</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
