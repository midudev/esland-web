import { CountUp } from "@/components/CountUp";
import NumerosItem from "@/components/NumerosItem.tsx";

import editionsInfo from "@/data/editions-info.json";
import { useI18n } from "@/hooks/useI18n";
import { useEffect, useRef, useState } from "preact/hooks";

export default function Numeros({ edicion }: { edicion: string }) {
  const { i18n } = useI18n();
  const [metrics, setMetrics] = useState({ views: 0, news: 0, media: 0 });
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!isIntersecting) return;
    const _metric = editionsInfo[Number(edicion) - 1].metrics;
    setMetrics(_metric);
  }, [edicion, isIntersecting]);

  const numeros = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio > 0) {
        setIsIntersecting(true);
      }
    });
    if (!numeros.current) return;

    observer.observe(numeros.current);

    return () => {
      if (!numeros.current) return;
      observer.unobserve(numeros.current);
    };
  }, []);

  return (
    <section class="max-w-6xl mx-auto py-20 px-20">
      <h2 class="text-4xl lg:text-6xl font-tomaso text-center text-balance mb-10 lg:mb-20">{i18n.ARCHIVO.COUNTER_TITLE}</h2>
      {
        <div ref={numeros} class={`grid grid-cols-1 lg:grid-cols-3 gap-y-10`}>
          <NumerosItem title={i18n.ARCHIVO.COUNTER_VIEWS}>
            <CountUp initial={0} final={metrics.views ?? 0} decimals={1} />M
          </NumerosItem>
          <NumerosItem title={i18n.ARCHIVO.COUNTER_NEWS}>
            <CountUp initial={0} final={metrics.news ?? 0} />
          </NumerosItem>
          <NumerosItem title={i18n.ARCHIVO.COUNTER_MEDIA}>
            <CountUp initial={0} final={metrics.media ?? 0} decimals={1} />
            M€
          </NumerosItem>
        </div>
      }
    </section>
  );
}
