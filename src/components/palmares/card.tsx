import Styles from "./card.module.css";
import { CountUp } from "@/components/CountUp";
import palmares from "@/data/editions-info.json";
import { useI18n } from "@/hooks/useI18n";

export const Card = ({
  edition,
  info,
  isMobile = false,
  position,
}: CardProps) => {
  const { i18n } = useI18n();
  const isWinnerInfoAvailable = position === 1 && info?.ganador && info?.foto1;
  const isFinalistInfoAvailable =
    position !== 1 && info?.finalista && info?.foto2;

  if (!isWinnerInfoAvailable && !isFinalistInfoAvailable) {
    return null;
  }

  const {
    ganador,
    finalista,
    foto1,
    foto2,
    comunidad1,
    comunidad2,
    streamers1,
    streamers2,
    total1,
    total2,
  } = info || {};
  const name = position === 1 ? ganador : finalista;
  const photo = position === 1 ? foto1 : foto2;

  const voteTypes = [
    {
      key: "community",
      label: i18n.AWARDS.COMMUNITY,
      value: position === 1 ? comunidad1 : comunidad2,
    },
    {
      key: "streamers",
      label: i18n.AWARDS.STREAMERS,
      value: position === 1 ? streamers1 : streamers2,
    },
    {
      key: "total",
      label: i18n.AWARDS.TOTAL,
      value: position === 1 ? total1 : total2,
    },
  ];

  return (
    <article className={Styles.container} data-featured={position === 1}>
      <header>
        <div className={Styles.image}>
          <img
            src={`/archivo-page/${edition}/palmares/${
              isMobile ? "mobile" : "desktop"
            }/${photo}.webp`}
            alt={name}
          />
        </div>
        <div className={Styles.position}>{position}º</div>
      </header>
      <div className={Styles.info}>
        <div>
          <h3>{name}</h3>
          {voteTypes.map(
            ({ key, label, value }) =>
              value !== undefined && (
                <p key={key} className={key === "total" ? Styles.total : ""}>
                  {label}:{" "}
                  <CountUp initial={0} final={value || 0} decimals={1} />%
                </p>
              )
          )}
        </div>
      </div>
    </article>
  );
};

interface CardProps {
  edition: string;
  info: (typeof palmares)[0]["info"][0];
  isMobile?: boolean;
  position: number;
}
