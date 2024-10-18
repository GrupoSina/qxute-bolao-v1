'use client'
import React, { useState, useEffect } from 'react'
import {
  Button,
  useDisclosure,
  Image,
  Tabs,
  Tab,
  Spinner,
} from '@nextui-org/react'
import { Open_Sans as OpenSans } from 'next/font/google'
import CreateEventModal from '@/app/components/CreateEventModal/CreateEventModal'
import { useEventsContext } from '@/context/EventsContext'
import toast from 'react-hot-toast'
import { handleAxiosError } from '@/services/api/error'
import RoundService from '@/services/api/models/round'
import RoundMatchsCardAdmin from '@/app/components/RoundMatchsCardAdmin/RoundMatchsCardAdmin'

const fontOpenSans = OpenSans({ subsets: ['latin'] })

export default function HomeAdmin() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [loading, setLoading] = useState(true)
  const [roundsWaiting, setRoundsWaiting] = useState<
    IRoundWithMatchsAndChampionship[]
  >([])
  const [roundsDone, setRoundsDone] = useState<
    IRoundWithMatchsAndChampionship[]
  >([])
  const [roundsInProgress, setRoundsInProgress] = useState<
    IRoundWithMatchsAndChampionship[]
  >([])
  const { setCurrentModalIndex, refreshRounds, setRefreshRounds } =
    useEventsContext()

  useEffect(() => {
    if (!refreshRounds) {
      refreshData()
    }
  }, [])

  useEffect(() => {
    if (refreshRounds) {
      refreshData()
    }
  }, [refreshRounds])

  async function refreshData() {
    setLoading(true)
    await fetchRounds('WAITING')
    await fetchRounds('DONE')
    await fetchRounds('IN_PROGRESS')
    setRefreshRounds(false)
    setLoading(false)
  }

  const fetchRounds = async (status: 'WAITING' | 'DONE' | 'IN_PROGRESS') => {
    try {
      const { fetchRoundsByStatus } = await RoundService()
      const response = await fetchRoundsByStatus(status)

      switch (status) {
        case 'DONE':
          setRoundsDone([])
          setRoundsDone(response)
          return response
        case 'IN_PROGRESS':
          setRoundsInProgress([])
          setRoundsInProgress(response)
          return response
        case 'WAITING':
          setRoundsWaiting([])
          setRoundsWaiting(response)
          return response
      }
    } catch (error) {
      const customError = handleAxiosError(error)
      toast.error(customError.message)
    }
  }

  return (
    <div
      className={`w-full h-full flex flex-col items-center ${fontOpenSans.className}`}
    >
      <div className="max-w-[1140px] w-full h-full flex flex-col items-center px-2">
        <div className="w-full flex flex-col items-center">
          <h1
            className={`text-center text-[#00409F] text-[32px] font-chineseRocksRegular mt-10`}
          >
            Partidas
          </h1>
          <p className="text-[#00409F] mt-2 mb-4 font-normal text-center font-monumentExtendedRegular text-[12px]">
            Defina o resultado das partidas abaixo.
          </p>
          <div className="flex flex-col items-center w-full max-w-[450px]">
            {loading ? (
              <div className="h-[200px] w-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <Tabs
                radius="full"
                variant="solid"
                color="secondary"
                classNames={{
                  cursor: 'bg-[#01409f] text-white font-bold text-[12px]',
                  tabContent: 'text-[#01409f] font-bold text-[12px]',
                }}
              >
                <Tab
                  key="waiting"
                  title="Aguardando"
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-full">
                    <>
                      {roundsWaiting.findIndex((round) =>
                        round.matchs.find((match) => match.id),
                      ) !== -1 && (
                        <>
                          {roundsWaiting.map((round) => (
                            <RoundMatchsCardAdmin
                              round={round}
                              key={round.id}
                              status="WAITING"
                            />
                          ))}
                        </>
                      )}
                      {roundsInProgress.findIndex((round) =>
                        round.matchs.find((match) => match.id),
                      ) !== -1 && (
                        <>
                          {roundsInProgress.map((round) => (
                            <RoundMatchsCardAdmin
                              round={round}
                              key={round.id}
                              status="IN_PROGRESS"
                            />
                          ))}
                        </>
                      )}

                      {roundsInProgress.findIndex((round) =>
                        round.matchs.find((match) => match.id),
                      ) === -1 &&
                        roundsWaiting.findIndex((round) =>
                          round.matchs.find((match) => match.id),
                        ) === -1 && (
                          <div className="w-full flex justify-center my-10">
                            <p className="text-[16px] text-[#00409F]">
                              Sem partidas.
                            </p>
                          </div>
                        )}
                    </>
                  </div>
                </Tab>
                <Tab
                  key="done"
                  title="Finalizadas"
                  className="w-full flex flex-col items-center"
                >
                  <div className="max-w-[450px] w-full">
                    {roundsDone.findIndex((round) =>
                      round.matchs.find((match) => match.id),
                    ) !== -1 ? (
                      <>
                        {roundsDone.map((round) => (
                          <RoundMatchsCardAdmin
                            round={round}
                            key={round.id}
                            status="DONE"
                          />
                        ))}
                      </>
                    ) : (
                      <div className="w-full flex justify-center my-10">
                        <p className="text-[16px] text-[#00409F]">
                          Sem partidas.
                        </p>
                      </div>
                    )}
                  </div>
                </Tab>
              </Tabs>
            )}
          </div>
          <Button
            onClick={() => setCurrentModalIndex(0)}
            onPress={onOpen}
            startContent={<Image src="/addcircle.svg" alt="add circle" />}
            className="max-w-[410px] w-full mx-auto mt-4 mb-6 bg-[#00409F] text-white font-bold text-[14px] py-[10px] px-[14px]"
          >
            Criar evento
          </Button>
        </div>

        <CreateEventModal isOpen={isOpen} onClose={onOpenChange} />
      </div>
    </div>
  )
}
