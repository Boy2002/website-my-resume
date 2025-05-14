import React, { useEffect, useRef, useState } from "react";

function SideInRight1({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.2,
      }
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        isVisible
          ? "animate-slide-in-right animation-delay-0 opacity-100"
          : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function SideInRight2({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.2,
      }
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        isVisible
          ? "animate-slide-in-right animation-delay-600 opacity-100"
          : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function SideInRight3({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      {
        threshold: 0.2,
      }
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${
        isVisible
          ? "animate-slide-in-right animation-delay-1200 opacity-100"
          : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export { SideInRight1, SideInRight2, SideInRight3 };
