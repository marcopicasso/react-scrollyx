import { useState, useRef, useEffect } from "react";

const useScrollToButton = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const divRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToButton = (button: HTMLButtonElement | null) => {
    if (!button) {
      return;
    }

    const container = button?.parentElement; // Get the scrollable container

    if (container) {
      const buttonOffset = button.getBoundingClientRect().left; // Get button's position
      const containerOffset = container.getBoundingClientRect().left; // Get container's position
      const scrollLeft = buttonOffset - containerOffset + container.scrollLeft; // Calculate scroll position

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (activeSection && buttonRefs.current[activeSection]) {
      const button = buttonRefs.current[activeSection];
      if (button) {
        scrollToButton(button);
      }
    }
  }, [activeSection]);

  return {
    activeSection,
    setActiveSection,
    buttonRefs,
    divRefs,
  };
};

export default useScrollToButton;
