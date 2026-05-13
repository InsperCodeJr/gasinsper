"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  className?: string;
}

function parse(val: string) {
  const m = val.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  return { pre: m[1], num: parseFloat(m[2].replace(",", ".")), suf: m[3] };
}

export default function CountUp({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const parts = parse(value);
    if (!parts || parts.num < 2) {
      setShown(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1400;

          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - (1 - t) ** 3;
            const cur = Math.round(eased * parts.num);
            setShown(`${parts.pre}${cur}${parts.suf}`);
            if (t < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
