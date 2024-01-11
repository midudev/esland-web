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

type Votes = Array<Array<number>>

const MAX_CATEGORIES = 12
const MAX_VOTES_PER_CATEGORY = 4

export function VoteSystem () {
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const [category, setCategory] = useState(0)
  const [votes, setVotes] = useState<Votes>(Array.from({ length: MAX_CATEGORIES }, () => []))

  useEffect(() => {
    async function fetchCandidates () {
      const response = await fetch(`/api/candidates.json?category=${category}`)
      const data = await response.json()
      setPageInfo(data)
    }

    fetchCandidates()
  }, [category])

  const handleNavigation = (categoryIndex: number) => {
    if (categoryIndex < 0) categoryIndex = MAX_CATEGORIES - 1
    else if (categoryIndex > (MAX_CATEGORIES - 1)) categoryIndex = 0
    setCategory(categoryIndex)
  }

  const handleVote = (
    { category, candidate }:
    { category: number, candidate: number }
  ) => {
    const votesCategory = votes[category]

    // if it was already voted the item, remove it
    if (votesCategory.includes(candidate)) {
      const newVotes = votesCategory.filter((vote) => vote !== candidate)
      setVotes(prevVotes => prevVotes.with(category, newVotes))
      return
    }

    // check if the user has already voted for this category 4 times
    if (votesCategory.length >= 4) return

    // otherwise, add the vote
    const newVotes = [...votesCategory, candidate]
    setVotes(prevVotes => prevVotes.with(category, newVotes))
  }

  const { categoria = '', candidatos } = pageInfo ?? {}
  const votesCategory = votes[category]

  return (
    <div class="mx-auto flex flex-col max-w-7xl pt-40">
      <CategoryTitle>
        {categoria}
      </CategoryTitle>

      <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-2 xl:px-0">
        {
          candidatos?.map((candidate, index) => {
            const isVoted = votesCategory.includes(candidatos.indexOf(candidate))
            return (
              <li class={`${isVoted ? 'bg-yellow-500' : 'bg-blue-900 hover:bg-sky-500'} transition p-1 text-center`} >
                <button onClick={() => handleVote({ category, candidate: index })}>
                <img src={`/voting-assets/${candidate.imagen}`} alt={candidate.nombre} />
                <p>{candidate.nombre}</p>
                </button>
              </li>
            )
          })
        }
      </ul>

      <footer class="flex justify-center items-center mt-4 gap-x-20">
        <div class="flex justify-center items-center gap-x-4 bg-black/50 backdrop-blur-lg px-2 rounded py-3">
          Votos realizados {votesCategory.length}/{MAX_VOTES_PER_CATEGORY}
        </div>
        <div class="flex justify-center items-center gap-x-4 bg-black/50 backdrop-blur-lg px-2 rounded py-2">
        <button class="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition" onClick={() => handleNavigation(category - 1)}>
          <Arrow rotated />
        </button>
        
        <span class="text-lg font-semibold">
          Categoría <span class="text-2xl">{category + 1}/{MAX_CATEGORIES}</span>
        </span>
      
        <button class="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition" onClick={() => handleNavigation(category + 1)}>
          <Arrow />
        </button>
        </div>
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

function Arrow ({ rotated }: { rotated ?: boolean }) {
  const className = rotated ? '-rotate-180' : ''

  return (
    <svg class={className} width="16" height="16" viewBox="0 0 24 24"><path
      fill="currentColor"
      stroke="transparent"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m13.04 1.429 10.218 10.216a.5.5 0 0 1 0 .708L13.04 22.571a.5.5 0 0 1-.707 0l-2.756-2.756a.5.5 0 0 1-.014-.693L14.1 14.5h-13a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h13L9.566 4.878a.5.5 0 0 1 .012-.7l2.755-2.754a.5.5 0 0 1 .707.005Z"
    ></path>
    </svg>
  )
}