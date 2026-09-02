import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (reducedMotion) return;

  const hero = document.querySelector('[data-hero]');
  if (hero) {
    gsap.from(hero.children, {
      opacity: 0,
      duration: 0.45,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'all',
    });
  }

  gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        once: true,
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-animate-stagger]').forEach((container) => {
    const children = gsap.utils.toArray<HTMLElement>(':scope > *', container);
    if (children.length === 0) return;
    gsap.from(children, {
      opacity: 0,
      duration: 0.35,
      stagger: 0.06,
      ease: 'power2.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: container,
        start: 'top 92%',
        once: true,
      },
    });
  });
}

initAnimations();
