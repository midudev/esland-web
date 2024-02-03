import { useEffect, useMemo, useState } from "preact/hooks"
import { type default as CandidatesType } from "@/content/editions/vote.json"
import confetti from 'canvas-confetti'
import { resolve as img } from '@/components/Img/Resolver'
import { resolve as svg } from "@/components/Img/SVG";

const RESULT_STATUS = {
  ERROR: -1,
  IDLE: 0,
  LOADING: 1,
  SUCCESS: 2
}

export const VoteFinal = (
  { candidates, votes, setCategory, categoryNames }:
    { candidates: typeof CandidatesType, votes: Votes, setCategory: Function, categoryNames: string[] }
) => {
  const [result, setResult] = useState(RESULT_STATUS.IDLE)

  useEffect(() => {
    // scroll to top with smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const selectedCandidates = useMemo(() => {
    const result: Record<string, typeof CandidatesType[0]['candidatos'][0]> = {}
    if (votes.length === 0) return

    votes.flat(2).forEach(voteId => {
      const [categoryId] = voteId.split('-')
      const categoryInfo = candidates.find((category) => category.id === categoryId)
      const candidateInfo = categoryInfo?.candidatos?.find(candidate => candidate.id === voteId)

      if (candidateInfo?.id != null) {
        result[voteId] = candidateInfo
      }
    })

    return result
  }, [votes])

  const handleSubmit = async () => {
    setResult(RESULT_STATUS.LOADING)

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ votes })
      })

      if (!response.ok) {
        setResult(RESULT_STATUS.ERROR)
        return
      }

      setResult(RESULT_STATUS.SUCCESS)
      confetti()
    } catch (e) {
      setResult(RESULT_STATUS.ERROR)
    }
  }

  const isLoading = result === RESULT_STATUS.LOADING

  return (
    <section class="flex flex-col">
      {
        result === RESULT_STATUS.SUCCESS && (
          <h1 class="pt-24 pb-10 mx-auto text-balance text-left text-3xl lg:text-5xl font-semibold tracking-wide">
            Gracias por votar
          </h1>
        )
      }

      {
        result === RESULT_STATUS.ERROR && (
          'Hubo un error al enviar tus votos, intenta nuevamente'
        )
      }

      {
        (result === RESULT_STATUS.IDLE || isLoading) && (
          <>
            <h1 class="pt-24 pb-10 mx-auto text-balance text-left text-3xl lg:text-5xl font-semibold tracking-wide">
              Tus votos finales
            </h1>
            <div class={`${isLoading ? 'opacity-50' : ''} transition grid grid-cols-6 gap-2`}>

              {
                votes.map((categoryVotes, index) => {
                  return (
                    <button class="bg-[#1682c7] hover:scale-105 hover:bg-[#54beff] flex flex-col justify-between items-center" onClick={() => setCategory(index)}>
                      <ul class="grid grid-cols-2">
                        {
                          categoryVotes.map((candidate) => {
                            const info = selectedCandidates?.[candidate]
                            const image = info?.imagen ?? ''
                            const name = info?.nombre ?? ''

                            return (
                              <li>
                                <img class="aspect-video w-full" src={img(`/vota/${image}`, true)} alt={name} />
                              </li>
                            )
                          })
                        }
                      </ul>
                      <h2 class="text-lg font-semibold text-center my-auto text-balance">
                        {categoryNames[index]}
                      </h2>
                    </button>
                  )
                }
                )
              }
            </div>

            <div class="flex justify-center items-center w-full py-10 mb-24 flex-col gap-y-4">
              <button class={`${result === RESULT_STATUS.LOADING ? 'disabled opacity-90' : ''} lg:text-2xl font-medium no-underline px-5 py-3 rounded-full uppercase text-blue-950 animate-fade-up bg-white hover:scale-125 hover:bg-yellow-300 hover:border-yellow-400 transition`} onClick={handleSubmit}>
                {
                  result === RESULT_STATUS.LOADING && (svg("loader", {
                    hidden: true,
                    class: "w-8 h-8 text-gray-600 animate-spin"
                  })
                  )
                }
                {
                  result === RESULT_STATUS.IDLE && (
                    'Enviar mis votos'
                  )
                }
              </button>
              <button class="animate-fade animate-delay-200 hover:underline hover:text-yellow-200 transition" onClick={() => setCategory(0)}>
                Quiero editar mis votos
              </button>
            </div>
          </>
        )
      }
    </section>
  )
}