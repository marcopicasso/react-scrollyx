import { useState } from 'react';

const useScrollToSection = (
  setActiveSection: (sectionId: string) => void,
  divRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
) => {
  const [isObserverActive, setIsObserverActive] = useState<boolean>(true);

  const handleScrollOnClick = (section: string) => {
    setIsObserverActive(false);
    setActiveSection(section);

    const element = divRefs.current[section];

    if (element) {
      const offset = 100; // Adjust this value to your needs
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    // Use a timeout to re-enable the observer after scrolling
    setTimeout(() => setIsObserverActive(true), 500);
  };

  return {
    isObserverActive,
    handleScrollOnClick,
  };
};

export default useScrollToSection;
