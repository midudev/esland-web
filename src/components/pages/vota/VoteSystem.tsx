import type { FunctionComponent, } from "preact"
import { useVoteSystem } from "@/hooks/useVoteSystem"
import { VoteFinal } from "./VoteFinal"
import Svg from '@/components/Svg.tsx'
import { resolve as img } from '@/components/Img/Resolver'

export const VoteSystem: FunctionComponent<{ i18n: any }> = ({ children, i18n }) => {
  const {
    candidates,
    votes,
    pageInfo,
    category,
    votesCategory,
    isChanging,
    MAX_CATEGORIES,
    MAX_VOTES_PER_CATEGORY,
    setNextCategory,
    setPrevCategory,
    setCategory,
    setVotesCategory
  } = useVoteSystem()

  const { categoria = '', candidatos } = pageInfo ?? {}

  if (category === MAX_CATEGORIES) {
    return (
      <VoteFinal candidates={candidates} votes={votes} setCategory={setCategory} categoryNames={
        candidates.map(({ categoria }) => categoria)
      } />
    )
  }

  return (
    <>
      {i18n.SEO_TITLE}
      <CategoryTitle isChanging={isChanging}>
        {categoria}
      </CategoryTitle>

      <div class="font-semibold flex justify-center items-center gap-x-2 px-2 rounded py-3 -mt-24 mb-10 text-yellow-300 text-xl">
        {i18n.VOTE.VOTES_CASTED} <span class="text-3xl">{votesCategory.length}/{MAX_VOTES_PER_CATEGORY}</span>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-2 px-8 lg:px-24 xl:px-0 min-h-[343px]">
        {
          candidatos?.map((candidate, index) => {
            const { enlace, nombre, imagen, id } = candidate

            const voteIndex = votesCategory.indexOf(id)
            const isVoted = voteIndex >= 0

            const delay = `animation-delay: ${index * 100}ms`

            return (
              <li key={`${category}-${nombre}`} class={`relative rounded-lg animate-fade-up`} style={delay} >
                {
                  enlace && (
                    <a class="youtube-link text-xs peer:hover:opacity-0 w-6 h-6 flex justify-center items-center right-2 top-2 absolute transition bg-white hover:bg-black hover:text-white backdrop-blur-xl text-black z-10 rounded-full hover:scale-125" href={enlace} target='_blank' rel='noopener'>
                      <Svg src="camera" />
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
                  `} onClick={() => setVotesCategory({ candidate: id })}>

                  {
                    voteIndex >= 0 && (
                      <span class="text-white bg-yellow-500 w-6 h-6 flex justify-center items-center font-bold p-1 aspect-square z-10 absolute top-2 left-2 rounded-full">{voteIndex + 1}</span>
                    )
                  }

                  <img class="group-hover:mix-blend-normal transition-all rounded mix-blend-luminosity w-full h-auto" src={img(`/vota/${imagen}`, true)} alt={nombre} />
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
          <button class="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition" onClick={setPrevCategory}>
            <Arrow rotated />
          </button>

          <span class="text-lg font-semibold">
            {i18n.CATEGORY} <span class="text-3xl">{category + 1}/{MAX_CATEGORIES}</span>
          </span>

          <button class="rounded border border-white hover:border-transparent hover:bg-white hover:text-sky-800 p-2 transition" onClick={setNextCategory}>
            <Arrow />
          </button>
        </div>
      </footer>
    </>
  )
}

const CategoryTitle = ({ children, isChanging }: { children?: string, isChanging?: boolean }) => {
  return (
    <h1 class="relative [font-weight:100] m-auto mb-10 tracking-[1px] font-tomaso text-xl sm:text-3xl max-w-full sm:max-w-xl text-center leading-snug flex justify-center items-center h-80 text-white">

      <Svg src="corona-right" class={`h-60 w-24 fill-current ${isChanging ? ("translate-x-[6.5rem] sm:translate-x-[8.5rem]") : ("translate-x-9 sm:translate-x-0")} transition duration-500`
      } />

      <div class="flex justify-center items-center flex-col gap-y-4 w-72 px-10">
        <Svg src="corona-top" class={`absolute ${isChanging ? ("scale-[1.2] sm:scale-[1.7] -translate-y-0") : ("scale-100 -translate-y-28")} h-14 fill-current transition duration-500`
        } />
        <span class={`${isChanging ? ("invisible opacity-0") : ("visible opacity-100")} delay-75 transition duration-300`}>
          {children}
        </span>
      </div>
      <Svg src="corona-left" class={`h-60 w-24 fill-current ${isChanging ? ("-translate-x-[6.5rem] sm:-translate-x-[8.5rem]") : ("-translate-x-9 sm:translate-x-0")} transition duration-500`
      } />
    </h1>
  )
}

function Arrow({ rotated }: { rotated?: boolean }) {
  const className = rotated ? '-rotate-180' : ''

  return (<Svg src="arrow" class={className} />)
}
