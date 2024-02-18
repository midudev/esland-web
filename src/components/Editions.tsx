import editions from "@/data/editions-info.json";
import { useState } from "preact/hooks";

import { I18nProvider } from "@/providers/i18n";
import Galeria from "./Galeria";
import Numeros from "./Numeros";
import { Palmares } from "./palmares/palmares";

import styles from "@/components/styles/Editions.module.css";

export default function Editions({locale}: EditionsProps) {
    const [editionSelected, setEditionSelected] = useState("1")

    return (
        <>
        <I18nProvider locale={locale}>
            <div className="flex h-24 mt-4">

            {
                editions.map(({edition,name})=>{
                    return( 
                    <button className={
                        `flex-1 rounded-t-md uppercase transition-colors 
                         text-white text-xl font-semibold
                        ${styles.tab}
                        ${editionSelected==edition?"z/10":"bg-[#346cb6] hover:bg-[#316ebe]"} 
                        `
                    } 
                    onClick={()=>setEditionSelected(edition)}>
                        {name}
                    </button>
                )})
            }
            </div>

            <Palmares edition={editionSelected} />
            <Galeria edicion={editionSelected} />
            <Numeros edicion={editionSelected}/>
            </I18nProvider>

        </>
    );
}

interface EditionsProps {
    locale: string;
}