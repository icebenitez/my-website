import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  if (reducedMotion) return;

  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const headline = hero.querySelector('h1');
    if (headline) {
      const split = new SplitText(headline, { type: 'chars' });
      const tl = gsap.timeline({ onComplete: () => split.revert() });
      tl.from(split.chars, {
        opacity: 0,
        y: 12,
        rotateX: -40,
        duration: 0.6,
        stagger: 0.015,
        ease: 'expo.out',
        clearProps: 'all',
      });
      const rest = Array.from(hero.children).filter((child) => child !== headline);
      if (rest.length > 0) {
        tl.from(rest, {
          opacity: 0,
          y: 12,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power1.out',
          clearProps: 'all',
        }, '-=0.3');
      }
    } else {
      gsap.from(hero.children, {
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
      });
    }
  }

  gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 12,
      duration: 0.35,
      ease: 'power1.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-animate-stagger]').forEach((container) => {
    const children = gsap.utils
      .toArray<HTMLElement>(':scope > *', container)
      .slice(0, 8);
    if (children.length === 0) return;
    gsap.from(children, {
      opacity: 0,
      y: 8,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power1.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        once: true,
      },
    });
  });
}

initAnimations();
