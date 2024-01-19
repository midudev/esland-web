import type { FunctionComponent } from 'preact'
import { useVoteSystem } from '@/hooks/useVoteSystem'
import { VoteFinal } from './VoteFinal'
import { getI18N } from '@/i18n'

export const VoteSystem: FunctionComponent<{ currentLocale?: string }> = ({
  children,
  currentLocale = 'es'
}) => {
  const i18n = getI18N({ currentLocale })

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
      <VoteFinal
        candidates={candidates}
        votes={votes}
        setCategory={setCategory}
        categoryNames={candidates.map(({ categoria }) => categoria)}
      />
    )
  }

  return (
    <>
      <CategoryTitle isChanging={isChanging}>{categoria}</CategoryTitle>

      <div class='-mt-24 mb-10 flex items-center justify-center gap-x-2 rounded px-2 py-3 text-xl font-semibold text-yellow-300'>
        {i18n.VOTE.VOTES_CASTED}{' '}
        <span class='text-3xl'>
          {votesCategory.length}/{MAX_VOTES_PER_CATEGORY}
        </span>
      </div>

      <ul class='grid min-h-[343px] grid-cols-1 gap-2 px-8 sm:grid-cols-2 lg:px-24 xl:grid-cols-5 xl:px-0'>
        {candidatos?.map((candidate, index) => {
          const { enlace, nombre, imagen, id } = candidate

          const voteIndex = votesCategory.indexOf(id)
          const isVoted = voteIndex >= 0

          const delay = `animation-delay: ${index * 100}ms`

          return (
            <li
              key={`${category}-${nombre}`}
              class={`relative animate-fade-up rounded-lg`}
              style={delay}
            >
              {enlace && (
                <a
                  class='youtube-link peer:hover:opacity-0 absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-black backdrop-blur-xl transition hover:scale-125 hover:bg-black hover:text-white'
                  href={enlace}
                  target='_blank'
                  rel='noopener'
                >
                  <CameraIcon />
                </a>
              )}

              <button
                class={`
                  group relative
                  z-0 flex w-full
                  flex-col items-center justify-center gap-2 rounded p-1
                  shadow-sm shadow-black/20 transition-all
                  md:hover:scale-105
                  ${
                    isVoted
                      ? 'bg-yellow-500 text-white'
                      : 'bg-[#1682c7] text-white hover:bg-sky-400'
                  }
                  `}
                onClick={() => setVotesCategory({ candidate: id })}
              >
                {voteIndex >= 0 && (
                  <span class='absolute left-2 top-2 z-10 flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-yellow-500 p-1 font-bold text-white'>
                    {voteIndex + 1}
                  </span>
                )}

                <img
                  class='h-auto w-full rounded mix-blend-luminosity transition-all group-hover:mix-blend-normal'
                  src={`/voting-assets/${imagen}`}
                  alt={nombre}
                />
                <h2 class='text-xs font-semibold'>{nombre}</h2>
              </button>
            </li>
          )
        })}
      </ul>

      <footer class='mt-10 flex flex-col items-center justify-between gap-x-20 rounded bg-black/50 px-4 py-2 backdrop-blur-xl sm:flex-row'>
        <div>{children}</div>
        <div class='flex items-center justify-center gap-x-4 rounded px-2 py-2'>
          <button
            class='rounded border border-white p-2 transition hover:border-transparent hover:bg-white hover:text-sky-800'
            onClick={setPrevCategory}
          >
            <Arrow rotated />
          </button>

          <span class='text-lg font-semibold'>
            {i18n.CATEGORY}{' '}
            <span class='text-3xl'>
              {category + 1}/{MAX_CATEGORIES}
            </span>
          </span>

          <button
            class='rounded border border-white p-2 transition hover:border-transparent hover:bg-white hover:text-sky-800'
            onClick={setNextCategory}
          >
            <Arrow />
          </button>
        </div>
      </footer>
    </>
  )
}

const CameraIcon = () => (
  <svg width='16' height='16' fill='none' viewBox='0 0 24 24'>
    <path
      stroke='currentColor'
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M17.3213 14.501c-.3204-.1755-.5195-.5117-.5195-.877v-3.2467c0-.3653.1991-.70155.5195-.87706l3.6075-1.9761c.6664-.36506 1.4804.11718 1.4804.87703v7.19893c0 .7598-.814 1.2421-1.4804.877l-3.6075-1.9761ZM8.43066 8.53223h4.12974v4.12967M5.91504 15.1943 12.438 8.67136'
    />
    <path
      stroke='currentColor'
      stroke-linecap='round'
      stroke-linejoin='round'
      d='M3.59082 19.499c-1.10457 0-2-.8954-2-2V6.50193c0-1.10457.89543-2 2-2H14.8013c1.1045 0 2 .89543 2 2V17.499c0 1.1046-.8955 2-2 2H3.59082Z'
    />
  </svg>
)

const CategoryTitle = ({
  children,
  isChanging
}: {
  children?: string
  isChanging?: boolean
}) => {
  return (
    <h1 class='relative m-auto mb-10 flex h-80 max-w-full items-center justify-center text-center font-tomaso text-xl leading-snug tracking-[1px] text-white [font-weight:100] sm:max-w-xl sm:text-3xl'>
      <svg
        class={`h-60 w-24 fill-current ${
          isChanging
            ? 'translate-x-[6.5rem] sm:translate-x-[8.5rem]'
            : 'translate-x-9 sm:translate-x-0'
        } transition duration-500`}
        viewBox='0 0 90.35 240.43'
      >
        <path
          d='m142.7 234.66-52.79 7.45L142.7 39.4 52.35 279.83z'
          transform='translate(-52.35 -39.4)'
        />
      </svg>

      <div class='flex w-72 flex-col items-center justify-center gap-y-4 px-10'>
        <svg
          class={`absolute ${
            isChanging
              ? '-translate-y-0 scale-[1.2] sm:scale-[1.7]'
              : '-translate-y-28 scale-100'
          } h-14 fill-current transition duration-500`}
          viewBox='0 0 16.04 62.55'
        >
          <path
            d='m300 38.16-8.02 46.7 8.02 15.85 8.02-15.85z'
            transform='translate(-291.98 -38.16)'
          />
        </svg>
        <span
          class={`${
            isChanging ? 'invisible opacity-0' : 'visible opacity-100'
          } transition delay-75 duration-300`}
        >
          {children}
        </span>
      </div>

      <svg
        class={`h-60 w-24 fill-current ${
          isChanging
            ? '-translate-x-[6.5rem] sm:-translate-x-[8.5rem]'
            : '-translate-x-9 sm:translate-x-0'
        } transition duration-500`}
        viewBox='0 0 90.35 240.43'
      >
        <path
          d='m457.3 234.66 52.79 7.45L457.3 39.4l90.35 240.43z'
          transform='translate(-457.3 -39.4)'
        />
      </svg>
    </h1>
  )
}

function Arrow({ rotated }: { rotated?: boolean }) {
  const className = rotated ? '-rotate-180' : ''

  return (
    <svg class={className} width='16' height='16' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        stroke='transparent'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
        d='m13.04 1.429 10.218 10.216a.5.5 0 0 1 0 .708L13.04 22.571a.5.5 0 0 1-.707 0l-2.756-2.756a.5.5 0 0 1-.014-.693L14.1 14.5h-13a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h13L9.566 4.878a.5.5 0 0 1 .012-.7l2.755-2.754a.5.5 0 0 1 .707.005Z'
      ></path>
    </svg>
  )
}
