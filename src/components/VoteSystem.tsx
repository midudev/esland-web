import { useEffect, useState } from "preact/hooks"

interface PageInfo {
  categoria: string,
  candidatos: Candidate[]
}

interface Candidate {
  nombre: string,
  imagen: string,
  enlace?: string
}

export function VoteSystem () {
  const category = 0

  const [pageInfo, setPageInfo] = useState<PageInfo>()

  useEffect(() => {
    async function fetchCandidates () {
      const response = await fetch(`/api/candidates.json?category=${category}`)
      const data = await response.json()
      console.log(data)
      setPageInfo(data)
    }

    fetchCandidates()
  }, [])

  const { categoria = '', candidatos } = pageInfo ?? {}

  return (
    <div class="mx-auto flex flex-col max-w-7xl pt-40">
      <CategoryTitle>
        {categoria}
      </CategoryTitle>

      <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-2 xl:px-0">
        {
          candidatos?.map((candidate) => {
            return (
              <li>
                <img src={`/voting-assets/${candidate.imagen}`} alt={candidate.nombre} />
                <p>{candidate.nombre}</p>
              </li>
            )
          })
        }
      </ul>

      <footer>
        Navegación
      </footer>
    </div>
  )
}

function CategoryTitle ({ children }: { children: string }) {
  return (
    <h1 class="font-extralight m-auto mb-10 tracking-[1px] font-tomaso text-3xl max-w-xl flex justify-center items-center h-40">
      {children}
    </h1>
  )
}