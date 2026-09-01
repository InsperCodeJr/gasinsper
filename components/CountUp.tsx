"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value?: string | number | null;
  className?: string;
}

interface Parsed {
  pre: string;
  suf: string;
  num: number;
  decimals: number;
  grouped: boolean;
}

/**
 * Le numeros escritos no padrao brasileiro, como "+10.000", "1.055", "12,5 mil".
 * O ponto e tratado como separador de milhar (e nao como decimal), que era o bug
 * de "+10.000" aparecer como "10" no site.
 */
function parse(val: string): Parsed | null {
  const m = val.match(/^(\D*?)([\d][\d.,]*)([\s\S]*)$/);
  if (!m) return null;

  const [, pre, rawNumber, suf] = m;

  const lastComma = rawNumber.lastIndexOf(",");
  const lastDot = rawNumber.lastIndexOf(".");
  const lastSeparator = Math.max(lastComma, lastDot);

  let decimalPart = "";
  let integerPart = rawNumber;

  if (lastSeparator !== -1) {
    const tail = rawNumber.slice(lastSeparator + 1);
    // So e decimal quando o ultimo separador nao delimita um grupo de milhar.
    const isThousandGroup = tail.length === 3 && /^\d{3}$/.test(tail);
    if (!isThousandGroup) {
      decimalPart = tail.replace(/\D/g, "");
      integerPart = rawNumber.slice(0, lastSeparator);
    }
  }

  const digitsOnly = integerPart.replace(/\D/g, "");
  if (!digitsOnly && !decimalPart) return null;

  const num = parseFloat(`${digitsOnly || "0"}.${decimalPart || "0"}`);
  if (!Number.isFinite(num)) return null;

  return {
    pre,
    suf,
    num,
    decimals: decimalPart.length,
    grouped: /[.,]/.test(integerPart),
  };
}

function format(value: number, parts: Parsed): string {
  const body = value.toLocaleString("pt-BR", {
    minimumFractionDigits: parts.decimals,
    maximumFractionDigits: parts.decimals,
    useGrouping: parts.grouped,
  });
  return `${parts.pre}${body}${parts.suf}`;
}

export default function CountUp({ value, className = "" }: Props) {
  // O conteúdo vem do Sanity e pode chegar vazio/nulo — normaliza antes de usar.
  const text = value == null ? "" : String(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);
  const [lastText, setLastText] = useState(text);
  const done = useRef(false);

  // Quando o valor cadastrado muda, o texto exibido volta a ser exatamente ele.
  if (text !== lastText) {
    setLastText(text);
    setShown(text);
  }

  useEffect(() => {
    const parts = parse(text);
    if (!parts || parts.num < 2) return;

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
            if (t >= 1) {
              setShown(text);
              return;
            }
            const eased = 1 - (1 - t) ** 3;
            setShown(format(eased * parts.num, parts));
            requestAnimationFrame(tick);
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
