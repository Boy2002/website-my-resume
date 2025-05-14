"use client";

import React, { JSX, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface SplitTextsProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

type SplitTextInstance = {
  lines: Element[];
  revert: () => void;
};

export default function SplitTexts({
  children,
  animateOnScroll = true,
  delay = 0,
}: SplitTextsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLElement[]>([]);
  const SplitRef = useRef<SplitTextInstance[]>([]);
  const lines = useRef<HTMLElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      SplitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements: HTMLElement[] = [];

      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children) as HTMLElement[];
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        elementRef.current.push(element);

        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "lines**",
        }) as SplitTextInstance;

        SplitRef.current.push(split);

        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent === "0px" && split.lines.length > 0) {
          const firstLine = split.lines[0] as HTMLElement;
          firstLine.style.paddingLeft = textIndent;
          element.style.textIndent = "0";
        }

        lines.current.push(...(split.lines as HTMLElement[]));
      });

      gsap.set(lines.current, { y: "100%" });

      const animationProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        SplitRef.current.forEach((split) => {
          split.revert();
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    }
  );

  if (
    React.Children.count(children) === 1 &&
    React.isValidElement(children) &&
    typeof children.type === "string"
  ) {
    return React.cloneElement(
      children as React.ReactElement<
        JSX.IntrinsicElements[keyof JSX.IntrinsicElements]
      >,
      { ref: containerRef }
    );
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
}
