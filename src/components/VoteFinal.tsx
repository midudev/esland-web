import { useEffect, useMemo, useState } from "preact/hooks"
import { type default as CandidatesType } from "@/data/editions-vote.json"
import confetti from 'canvas-confetti'
import type { Votes } from "@/types/votes"

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
    const result: Record<string, typeof CandidatesType[0]['candidates'][0]> = {}
    if (votes.length === 0) return
  
    votes.flat(2).forEach(voteId => {
      const [categoryId] = voteId.split('-')
      const categoryInfo = candidates.find((category) => category.id === categoryId)
      const candidateInfo = categoryInfo?.candidates?.find(candidate => candidate.id === voteId)
  
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
          <div class={`${isLoading ? 'opacity-50' : ''} transition grid grid-cols-2 md:grid-cols-6 gap-2 p-4`}>
            
            {
              votes.map((categoryVotes, index) => {
                return (
                  <button class="bg-[#1682c7] hover:scale-105 hover:bg-[#54beff] flex flex-col justify-between items-center" onClick={() => setCategory(index)}>
                    <ul class="grid grid-cols-2">
                      {
                        categoryVotes.map((candidate) => {
                          const info = selectedCandidates?.[candidate]
                          const image = info?.image ?? ''
                          const name = info?.name ?? ''
                          
                          return (
                            <li>
                              <img class="aspect-video w-full" src={`/voting-assets/${image}`} alt={name} />
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
                result === RESULT_STATUS.LOADING && (
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-600 animate-spin" viewBox="0 0 100 101" fill="none">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
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