import { useEffect, useRef } from "react";

const useScrollAnimation = (trigger = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!trigger || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-in");
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger]);

  return ref;
};

export default useScrollAnimation;
