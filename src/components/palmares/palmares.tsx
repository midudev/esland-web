import Styles from "./palmares.module.css";
import palmares from "@/data/editions-info.json";

import { useEffect, useState } from "preact/hooks";
import { Container } from "../containers/container";
import { NoDataSection } from "../containers/no-data-section";
import { Title } from "../titles/title";
import { Card } from "./card";
import { Category } from "./category";
import { useI18n } from "@/hooks/useI18n";

export const Palmares = ({ edition }: { edition: string }) => {
  const { i18n } = useI18n();
  const [categorySelected, setCategorySelected] = useState(0);
  const [edicion, setEdicion] = useState(
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
    setEdicion(palmares.find((p) => p.edition === edition));
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
      {!edicion && (
        <NoDataSection>
          <h1>{i18n.AWARDS.NOT_FOUND}</h1>
        </NoDataSection>
      )}
      {edicion && (
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
              {edicion.info.map((inf, index) => (
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
                    edition={edition}
                    position={1}
                    info={edicion.info[categorySelected]}
                  />
                  <Card
                    edition={edition}
                    position={2}
                    info={edicion.info[categorySelected]}
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
