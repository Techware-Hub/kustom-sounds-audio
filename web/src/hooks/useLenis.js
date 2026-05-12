import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  // Lenis disabled: native browser scroll. Each mouse-wheel tick advances directly with no smoothing.
}
