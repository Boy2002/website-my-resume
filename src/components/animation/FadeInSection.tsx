"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeInSection({
  children,
  direction = "up",
}: {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setTimeout(() => setIsVisible(false), 300);
        }
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -10% 0px",
      }
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const translateMap = {
    up: "translate-y-16",
    left: "-translate-x-16",
    right: "translate-x-16",
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${
          isVisible
            ? "opacity-100 translate-x-0 translate-y-0"
            : "opacity-0 " + translateMap[direction]
        }
      `}
    >
      {children}
    </div>
  );
}
