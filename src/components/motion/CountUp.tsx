"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function parseValue(raw: string) {
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, suffix: raw, decimals: 0 };
  const num = Number(match[1]);
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { num, suffix: match[2], decimals };
}

type CountUpProps = {
  value: string;
  className?: string;
  duration?: number;
};

export default function CountUp({ value, className = "", duration = 1.6 }: CountUpProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { num, suffix, decimals } = parseValue(value);

  useEffect(() => {
    if (!inView || reduced || !ref.current) return;

    const controls = animate(0, num, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = `${decimals ? latest.toFixed(decimals) : Math.round(latest)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, num, suffix, decimals, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {reduced ? value : `0${suffix}`}
    </span>
  );
}
