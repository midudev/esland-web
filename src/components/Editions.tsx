import { useState } from "preact/hooks";
import Galeria from "./Galeria";
import Numeros from "./Numeros";
import { Palmares } from "./palmares/palmares";
import editions from "@/data/editions-info.json"
import styles from "@/components/styles/Editions.module.css"

export default function Editions({i18n}:{i18n:any}) {
    const [edicion, setEdicion] = useState("1")

    return (
        <>
            <div className="flex h-24 mt-4">

            {
                editions.map(({edition,name})=>{
                    return( 
                    <button className={
                        `flex-1 rounded-t-md uppercase transition-colors 
                         text-white text-xl font-semibold
                        ${styles.tab}
                        ${edicion==edition?"z/10":"bg-[#346cb6] hover:bg-[#316ebe]"} 
                        `
                    } 
                    onClick={()=>setEdicion(edition)}>
                        {name}
                    </button>
                )})
            }
            </div>

            <Palmares i18n={i18n} edition={edicion} />
            <Galeria i18n={i18n} edicion={edicion} />
            <Numeros i18n={i18n} edicion={edicion}/>
        </>
    )
}