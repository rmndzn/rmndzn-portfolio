import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-left, .slide-right, .zoom-in'
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export const useElementAnimation = (deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    if (ref.current) {
      const els = ref.current.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in');
      els.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, deps);

  return ref;
};
