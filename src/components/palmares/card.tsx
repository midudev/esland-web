import { useI18n } from "@/hooks/useI18n";
import Styles from "./card.module.css";

import palmares from "@/data/editions-info.json";

export const Card = ({ edition, info, isMobile = false, position }: CardProps) => {
  const { i18n } = useI18n();

  const name = position === 1 ? info.ganador : info.finalista;
  const photo = position === 1 ? info.foto1 : info.foto2;
  const communityVotes = position === 1 ? info.comunidad1 : info.comunidad2;
  const streamersVotes = position === 1 ? info.streamers1 : info.streamers2;
  const totalVotes = position === 1 ? info.total1 : info.total2;

  return (
    <>
      <article className={Styles.container} data-featured={position === 1}>
        <header>
          <div className={Styles.image}>
            <img src={`/archivo-page/${edition}/palmares/${isMobile ? "mobile" : "desktop"}/${photo}.webp`} alt={info.ganador} />
          </div>
          <div className={Styles.position}>{position}º</div>
        </header>
        <div className={Styles.info}>
          <div>
            <h3>{name}</h3>
            <p>
              {i18n.ARCHIVO.COMMUNITY}: {communityVotes}%
            </p>
            <p>
              {i18n.ARCHIVO.STREAMERS}: {streamersVotes}%
            </p>
            <p className={Styles.total}>
              {i18n.ARCHIVO.TOTAL}: {totalVotes}%
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

interface CardProps {
  edition: string;
  info: (typeof palmares)[0]["info"][0];
  isMobile?: boolean;
  position: number;
}
