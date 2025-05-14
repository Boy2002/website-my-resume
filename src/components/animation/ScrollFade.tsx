"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFade({
  children,
  from = "bottom", // left, right, bottom
  delay = 0,
}: {
  children: React.ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      console.warn("💥 Element not found");
      return;
    }
    console.log("✅ ScrollTrigger targeting:", el);
    let x = 0,
      y = 0;
    if (from === "left") x = -100;
    if (from === "right") x = 100;
    if (from === "bottom") y = 100;

    const anim = gsap.fromTo(
      el,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 10%",
          scrub: true,
          markers: true,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill(); // แก้ kill ให้ถูกจุด
      anim.kill();
    };
  }, [from, delay]);

  return <div ref={ref}>{children}</div>;
}
