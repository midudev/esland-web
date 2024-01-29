import Styles from "./palmares.module.css";

import palmares from "@/data/editions-info.json";

import { useI18n } from "@/hooks/useI18n";
import { useEffect, useState } from "preact/hooks";
import { Container } from "../containers/container";
import { NoDataSection } from "../containers/no-data-section";
import { Title } from "../titles/title";
import { Card } from "./card";
import { Category } from "./category";

export const Palmares = ({ edition }: PalmaresProps) => {
  const { i18n } = useI18n();

  const [categorySelected, setCategorySelected] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState(palmares.find((p) => p.edition === edition));
  const [isMobile, setIsMobile] = useState(false);
  const [hideCards, setHideCards] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    chekScreenSize();
    window.addEventListener("resize", chekScreenSize);
    return () => window.removeEventListener("resize", chekScreenSize);
  }, []);

  useEffect(() => {
    setCategorySelected(0);
    setSelectedEdition(palmares.find((p) => p.edition === edition));
  }, [edition]);

  useEffect(() => {
    setShowCards(true);
    setHideCards(false);
  }, [categorySelected]);

  const categoryHandle = (index: number) => {
    if (categorySelected === index) return;

    setHideCards(true);

    if (isMobile) {
      setCategorySelected(index);
      return;
    }

    setTimeout(() => {
      setCategorySelected(index);
    }, 500);
  };

  const chekScreenSize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  return (
    <>
      {!selectedEdition && (
        <NoDataSection>
          <h1>{i18n.ARCHIVO.EDITION_NOT_FOUND}</h1>
        </NoDataSection>
      )}
      {selectedEdition && (
        <Container>
          <Title tag="h2" center uppercase space="space-medium" weight="weight-bold">
            {i18n.ARCHIVO.PALMARES}
          </Title>
          <section className={Styles.container}>
            <div className={Styles.info}>
              {selectedEdition.info.map((inf, index) => (
                <Category
                  key={`${index}-${inf.categoria}`}
                  edition={edition}
                  info={inf}
                  open={categorySelected === index}
                  isMobile={isMobile}
                  onClick={() => {
                    categoryHandle(index);
                  }}
                />
              ))}
            </div>
            {!isMobile && (
              <div className={Styles.details}>
                <div data-show={showCards} data-hide={hideCards}>
                  <Card edition={edition} position={1} info={selectedEdition.info[categorySelected]} />
                  <Card edition={edition} position={2} info={selectedEdition.info[categorySelected]} />
                </div>
              </div>
            )}
          </section>
        </Container>
      )}
    </>
  );
};

interface PalmaresProps {
  edition: string;
}
