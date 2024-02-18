import Styles from "./category.module.css";

import palmares from "@/data/editions-info.json";
import { useEffect, useRef, useState } from "preact/hooks";
import { Card } from "./card";
import { getI18N } from "@/i18n";

export const Category = ({
  info,
  edition,
  isMobile = false,
  open = false,
  onClick,
}: CategoryCardProps) => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(open);
      setHeight(0);
      return;
    }

    if (open) {
      setIsOpen(true);
      setTimeout(() => {
        setHeight(cardsRef.current?.scrollHeight || 201);
      }, 50);
    } else {
      setTimeout(() => {
        setHeight(0);
      }, 50);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
    }
  }, [open]);

  useEffect(() => {
    if (!isMobile) return;

    if (isOpen) {
      setHeight(cardsRef.current?.scrollHeight || 201);
    } else {
      setHeight(0);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleSetInnerHeight);

    return () => window.removeEventListener("resize", handleSetInnerHeight);
  }, []);

  const handleSetInnerHeight = () => {
    if (!isMobile) return;

    setHeight(0);
    setTimeout(() => {
      setHeight(cardsRef.current?.scrollHeight || 201);
    }, 300);
  };

  return (
    <>
      <article className={Styles.container} onClick={onClick}>
        <header data-selected={isOpen}>
          <div className={Styles.category}>{info.categoria}</div>
          <div className={Styles.winner}>{info.ganador}</div>
        </header>
        {isOpen && isMobile && (
          <section ref={cardsRef} style={{ height }}>
            <div>
              <Card
                i18n={getI18N}
                edition={edition}
                position={1}
                info={info}
                isMobile={isMobile}
              />
              <Card
                i18n={getI18N}
                edition={edition}
                position={2}
                info={info}
                isMobile={isMobile}
              />
            </div>
          </section>
        )}
      </article>
    </>
  );
};

interface CategoryCardProps {
  info: (typeof palmares)[0]["info"][0];
  isMobile?: boolean;
  edition: string;
  open?: boolean;
  onClick?: () => void;
}
