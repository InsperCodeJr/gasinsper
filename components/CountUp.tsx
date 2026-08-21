"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value?: string | number | null;
  className?: string;
}

function parse(val: string) {
  const m = val.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  return { pre: m[1], num: parseFloat(m[2].replace(",", ".")), suf: m[3] };
}

export default function CountUp({ value, className = "" }: Props) {
  // O conteúdo vem do Sanity e pode chegar vazio/nulo — normaliza antes de usar.
  const text = value == null ? "" : String(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    const parts = parse(text);
    if (!parts || parts.num < 2) {
      setShown(text);
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
  }, [text]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
