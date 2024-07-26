'use client'

import WinnerModal from '@/app/components/WinnerModal/WinnerModal'
import { useEventsContext } from '@/context/EventsContext'
import { handleAxiosError } from '@/services/api/error'
import RoundService from '@/services/api/models/round'
import { Button, Spinner } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Winners() {
  const { setVisibleModalMatches, setSelectedMatchWinner } = useEventsContext()
  const [roundsDone, setRoundsDone] = useState<
    IRoundWithMatchsAndChampionship[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRounds()
  }, [])

  const fetchRounds = async () => {
    setLoading(true)
    try {
      const { fetchRoundsByStatus } = await RoundService()
      const response = await fetchRoundsByStatus('DONE')
      setRoundsDone(response)
      setLoading(false)
    } catch (error) {
      const customError = handleAxiosError(error)
      toast.error(customError.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col mx-auto w-[100%] items-center h-full bg-white-texture">
      {loading ? (
        <div className="min-h-[60vh] w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-[450px] w-full min-h-[60vh] flex flex-col items-center py-8">
          <h1 className="text-[#00409F] text-[18px] font-bold">
            Vencedores das rodadas
          </h1>
          <h4 className="text-[#00409F] text-[12px] mt-2">
            Acompanhe quem venceu em cada rodada.
          </h4>
          <>
            {roundsDone.findIndex((round) =>
              round.matchs.find((match) => match.id),
            ) !== -1 ? (
              <div className="flex flex-col md:p-4 p-2 my-[16px] bg-[#1F67CE] rounded-lg w-[90%] mx-auto">
                {roundsDone?.map((round) =>
                  round.matchs?.map((match, indexMatch) => (
                    <div
                      key={match.id + indexMatch}
                      className="flex flex-wrap p-4 sm:justify-between justify-center gap-3 items-center border-b-[1px] last:border-b-0"
                    >
                      <div className="flex items-center gap-1">
                        <p className="text-white text-[12px] font-bold">
                          {round.name}
                        </p>
                        <p className="text-white text-[12px] font-normal">
                          {' - '}
                          {match.teamHome.name} X {match.teamAway.name}{' '}
                        </p>
                      </div>
                      <Button
                        variant="bordered"
                        className={`md:text-[12px] text-[12px] text-white font-bold border-white rounded-full`}
                        onPress={() => {
                          setVisibleModalMatches('winner')
                          setSelectedMatchWinner({
                            roundName: round.name,
                            match,
                          })
                        }}
                      >
                        <p className="flex gap-3 items-center">
                          Ver vencedor(a)
                        </p>
                      </Button>
                    </div>
                  )),
                )}
              </div>
            ) : (
              <div className="w-full flex justify-center my-10">
                <p className="text-[16px] text-[#00409F]">
                  Sem partidas finalizadas.
                </p>
              </div>
            )}
          </>
        </div>
      )}

      <div className="bg-[#00409F] w-screen h-[250px] flex justify-center items-center">
        <div className="w-[90%] bg-black h-[160px] rounded-xl flex justify-center items-center">
          <h1>betvip banner</h1>
        </div>
      </div>
      <WinnerModal />
    </div>
  )
}
