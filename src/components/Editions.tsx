import editions from "@/data/editions-info.json";
import { useState } from "preact/hooks";

import { I18nProvider } from "@/providers/i18n";
import Galeria from "./Galeria";
import Numeros from "./Numeros";
import { Palmares } from "./palmares/palmares";

export default function Editions({ locale }: EditionsProps) {
  const [editionSelected, setEditionSelected] = useState("1");

  return (
    <>
      <I18nProvider locale={locale}>
        <div className="flex h-24 mt-4">
          {editions.map(({ edition, name }) => {
            return (
              <button
                className={`
                  flex-1 transition-colors uppercase text-white text-xl font-semibold 
                  ${editionSelected == edition ? "z/10 cursor-default" : "bg-[#346cb6] textShadow"}
                `}
                onClick={() => setEditionSelected(edition)}
              >
                {name}
              </button>
            );
          })}
        </div>

        <Palmares edition={editionSelected} />
        <Galeria edicion={editionSelected} />
        <Numeros edicion={editionSelected} />
      </I18nProvider>
    </>
  );
}

interface EditionsProps {
  locale: string;
}
