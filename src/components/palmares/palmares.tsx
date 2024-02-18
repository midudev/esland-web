import Styles from "./palmares.module.css";
import palmares from "@/data/editions-info.json";

import { useEffect, useState } from "preact/hooks";
import { Container } from "../containers/container";
import { NoDataSection } from "../containers/no-data-section";
import { Title } from "../titles/title";
import { Card } from "./card";
import { Category } from "./category";

export const Palmares = ({ i18n, edition }: PalmaresProps) => {
  const [categorySelected, setCategorySelected] = useState(0);
  const [selectedEdition, setSelectedEdition] = useState(
    palmares.find((p) => p.edition === edition)
  );
  const [isMobile, setIsMobile] = useState(false);
  const [hideCards, setHideCards] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
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

  const checkScreenSize = () => {
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
          <h1>{i18n.AWARDS.NOT_FOUND}</h1>
        </NoDataSection>
      )}
      {selectedEdition && (
        <Container>
          <Title
            tag="h2"
            center
            uppercase
            space="space-medium"
            weight="weight-bold"
          >
            {i18n.AWARDS.TITLE}
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
                  <Card
                    i18n={i18n}
                    edition={edition}
                    position={1}
                    info={selectedEdition.info[categorySelected]}
                  />
                  <Card
                    i18n={i18n}
                    edition={edition}
                    position={2}
                    info={selectedEdition.info[categorySelected]}
                  />
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
  i18n: any;
}
