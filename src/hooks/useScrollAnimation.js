import { useEffect, useRef, useState } from 'react';

/**
 * Bejubaan Ann Seva Foundation – useScrollAnimation
 *
 * Observes an element and toggles a `visible` class when it enters the viewport.
 * Respects `prefers-reduced-motion`.
 *
 * @param {object} options
 * @param {number}  [options.threshold=0.15]     – Intersection ratio to trigger
 * @param {string}  [options.rootMargin='0px 0px -40px 0px'] – Observer margin
 * @param {boolean} [options.triggerOnce=true]   – Animate only the first time
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollAnimation({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
