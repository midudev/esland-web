import type { FunctionComponent } from "preact"
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

export const VoteSystem: FunctionComponent = ({ children }) => {
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
    <>
      <CategoryTitle>
        {categoria}
      </CategoryTitle>
      
      <div class="font-semibold flex justify-center items-center gap-x-2 px-2 rounded py-3 -mt-24 mb-10 text-yellow-300 text-xl">
          Votos realizados <span class="text-3xl">{votesCategory.length}/{MAX_VOTES_PER_CATEGORY}</span>
        </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-8 lg:px-24 xl:px-0">
        {
          candidatos?.map((candidate, index) => {
            const voteIndex = votesCategory.indexOf(index)
            const isVoted = voteIndex >= 0
            const { enlace, nombre, imagen } = candidate
            
            return (
              <li class={`relative rounded-lg`} >
                {
                  enlace && (
                    <a class="youtube-link text-xs peer:hover:opacity-0 w-6 h-6 flex justify-center items-center right-2 top-2 absolute transition bg-white hover:bg-black hover:text-white backdrop-blur-xl text-black z-10 rounded-full hover:scale-125" href={enlace} target='_blank' rel='noopener'>
                      <CameraIcon />
                    </a>
                  )
                }
                
                <button
                  class={`
                  shadow-sm shadow-black/20
                  z-0 group relative
                  w-full flex flex-col gap-2 justify-center items-center
                  transition-all p-1 rounded
                  md:hover:scale-105
                  ${isVoted ? 'bg-yellow-500 text-white' : 'bg-[#1682c7] hover:bg-sky-400 text-white'}
                  `} onClick={() => handleVote({ category, candidate: index })}>

                  {
                    voteIndex >= 0 && (
                      <span class="text-white bg-yellow-500 w-6 h-6 flex justify-center items-center font-bold p-1 aspect-square z-10 absolute top-2 left-2 rounded-full">{voteIndex + 1}</span>
                    )
                  }

                  <img class="group-hover:mix-blend-normal transition-all rounded mix-blend-luminosity w-full h-auto" src={`/voting-assets/${imagen}`} alt={nombre} />
                  <h2 class="font-semibold text-xs">{nombre}</h2>
                </button>
              </li>
            )
          })
        }
      </ul>

      <footer class="flex flex-col sm:flex-row justify-between px-4 items-center gap-x-20 rounded bg-black/50 backdrop-blur-xl mt-10 py-2">
        <div>
          {children}
        </div>
        <div class="flex justify-center items-center gap-x-4 px-2 rounded py-2">
        <button class="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition" onClick={() => handleNavigation(category - 1)}>
          <Arrow rotated />
        </button>
        
        <span class="text-lg font-semibold">
          Categoría <span class="text-3xl">{category + 1}/{MAX_CATEGORIES}</span>
        </span>
      
        <button class="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition" onClick={() => handleNavigation(category + 1)}>
          <Arrow />
        </button>
        </div>
      </footer>
    </>
  )
}

const CameraIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M17.3213 14.501c-.3204-.1755-.5195-.5117-.5195-.877v-3.2467c0-.3653.1991-.70155.5195-.87706l3.6075-1.9761c.6664-.36506 1.4804.11718 1.4804.87703v7.19893c0 .7598-.814 1.2421-1.4804.877l-3.6075-1.9761ZM8.43066 8.53223h4.12974v4.12967M5.91504 15.1943 12.438 8.67136"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M3.59082 19.499c-1.10457 0-2-.8954-2-2V6.50193c0-1.10457.89543-2 2-2H14.8013c1.1045 0 2 .89543 2 2V17.499c0 1.1046-.8955 2-2 2H3.59082Z"/></svg>
)

const CategoryTitle = ({ children }: { children?: string }) => {
  return (
    <h1 class="relative [font-weight:100] m-auto mb-10 tracking-[1px] font-tomaso text-3xl max-w-xl text-center leading-snug flex justify-center items-center h-80 text-white">

        <svg class="h-60 w-24 fill-current" viewBox="0 0 90.35 240.43">
          <path d="m142.7 234.66-52.79 7.45L142.7 39.4 52.35 279.83z" transform="translate(-52.35 -39.4)" />
        </svg>

        <div class="flex justify-center items-center flex-col gap-y-4 w-72 px-10">
          <svg class="h-14 -translate-y-10 fill-current" viewBox="0 0 16.04 62.55">
            <path d="m300 38.16-8.02 46.7 8.02 15.85 8.02-15.85z" transform="translate(-291.98 -38.16)" />
          </svg>
          <span>
            {children}
          </span>
        </div>

        <svg class="h-60 w-24 fill-current" viewBox="0 0 90.35 240.43">
          <path d="m457.3 234.66 52.79 7.45L457.3 39.4l90.35 240.43z" transform="translate(-457.3 -39.4)" />
        </svg>
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