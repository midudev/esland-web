import StreamerCard from "@/components/StreamerCard.tsx"
import palmares from "@/data/editions-info.json"
import styles from "@/components/styles/Palmares.module.css"

export default function Palmares({i18n,edicion}:{i18n:any,edicion:string}) {
  let index = 3

  let datosSeleccionados = palmares.find((palmar) => palmar.edition === edicion)

  if (!datosSeleccionados) {
    return <h1>{i18n.AWARDS.NOT_FOUND}</h1>
  }

  const {
    comunidad1,
    comunidad2,
    finalista,
    foto1,
    foto2,
    ganador,
    streamers1,
    streamers2,
    total1,
    total2,
  } = datosSeleccionados?.info[index]

  return (

    <section
      class="max-w-6xl mx-auto flex flex-col gap-4 pt-20 justify-center items-center px-20"
    >
      <h2
        class="text-4xl lg:text-6xl text-center mb-10 lg:mb-20 uppercase font-tomaso"
      >
        {i18n.AWARDS.TITLE}
      </h2>
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="flex flex-col gap-2">
          {
            palmares.map((item) => {
              if (item.edition === edicion) {
                return item.info.map((infoItem, i) => {
                  const { categoria, ganador } = infoItem
                  return (
                    <button
                      id={`${i + 1}`}
                      class={`flex justify-between items-center rounded-sm ${styles.button} ${
                        i % 2 === 0
                          ? "bg-gradient-to-r from-blue-600 to-sky-400/45  "
                          : "bg-gradient-to-r from-gray-700 to-blue-900"
                      } ${
                        index === i
                          ? "bg-blue-950 border border-sky-300 border-spacing-6"
                          : ""
                      } text-center hover:bg-blue-900 px-4 py-1`}
                    >
                      <h1 class="text-sm text-left">{categoria}</h1>
                      <strong class="text-xs text-right">{ganador}</strong>
                    </button>
                  )
                })
              }
            })
          }
        </div>
        <div class="flex gap-3 items-end mr-5">
          {
            ganador && (
              <StreamerCard
                position="1º"
                edicion={edicion}
                name={ganador}
                comunidad={comunidad1 ?? 0}
                streamers={streamers1 ?? 0}
                foto={foto1}
                total={total1 ?? 0}
                background={"bg-finalista"}
              />
            )
          }
          {
            finalista && (
              <StreamerCard
                position="2º"
                edicion={edicion}
                name={finalista}
                comunidad={comunidad2}
                streamers={streamers2}
                foto={foto2}
                total={total2}
                background={"bg-semifinalista"}
              />
            )
          }
        </div>
      </div>
    </section>
  )
}
