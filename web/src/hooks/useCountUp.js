import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(target, duration = 1.8) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => setValue(Math.round(counter.val)),
      });
    }, ref);
    return () => ctx.revert();
  }, [target, duration]);

  return { ref, value };
}
