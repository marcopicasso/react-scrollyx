import { useEffect, useRef } from 'react';

const useIntersectionObserver = (
  setActiveSection: (sectionId: string) => void,
  isObserverActive: boolean
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!isObserverActive) return;

    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 1, rootMargin: '0px 0px -55% 0px' }
    );

    const sections = document.querySelectorAll('div[id]');
    sections.forEach(section => {
      observer.current?.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.current?.unobserve(section);
      });
    };
  }, [isObserverActive, setActiveSection]);
};

export default useIntersectionObserver;
