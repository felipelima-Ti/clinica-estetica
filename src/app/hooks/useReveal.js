import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add("opacity-100", "translate-y-0");
        }
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}