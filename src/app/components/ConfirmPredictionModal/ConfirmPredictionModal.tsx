import React, { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Image,
  ModalContent,
  Spinner,
} from '@nextui-org/react'
import { submitPredictions } from '@/app/(home)/home-user/actions'
import toast from 'react-hot-toast'
import { useHomeUserContext } from '@/context/HomeUserContext'
import { formatDateToDayAndHour } from '@/utils/formatDate'
import { Open_Sans } from 'next/font/google'

interface ConfirmPredictionModalProps {
  isOpen: boolean
  onClose: () => void
  token: string
  matchPredictions: {
    matchId: string
    matchDate: Date
    roundName: string
    teamHome: string
    teamAway: string
    predictionHome?: number
    predictionAway?: number
    isDraw?: boolean
    winnerTeamId?: string
    winnerTeamName?: string
    lastPlayerToScore?: {
      name?: string
      id?: string
      team?: string
    }
  }[]
}

const fontOpenSans = Open_Sans({ subsets: ['latin'] })

const ConfirmPredictionModal: React.FC<ConfirmPredictionModalProps> = ({
  isOpen,
  onClose,
  matchPredictions,
  token,
}) => {
  const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false)
  const { setDisabledMatches, setLoading } = useHomeUserContext()

  const sendPredictions = async (data: IPrediction, token: string) => {
    const result = await submitPredictions(data, token)
    if (result.isError === true && result.error !== undefined) {
      toast.error(result.error)
    }
    return result
  }

  const handleSubmit = async (event: React.FormEvent) => {
    setButtonIsLoading(true)
    event.preventDefault()

    let hasError = false
    let resultError = null

    try {
      for (const matchPrediction of matchPredictions) {
        const result = await sendPredictions(
          {
            matchId: matchPrediction.matchId,
            isDraw: matchPrediction.isDraw,
            winnerTeamId: matchPrediction.winnerTeamId,
            playerId: matchPrediction.lastPlayerToScore?.id,
          },
          token,
        )

        if (result.isError === true) {
          hasError = true
          resultError = result.error
        } else {
          setDisabledMatches((prevState) => ({
            ...prevState,
            [matchPrediction.matchId]: true,
          }))
        }
      }

      setButtonIsLoading(false)

      if (!hasError && resultError === null) {
        onClose()
        toast.success('Palpite enviado com sucesso!')
      } else if (hasError && resultError !== undefined) {
        toast.error(resultError)
      }
    } catch (error) {
      setLoading(false)
      toast.error(`Erro ao enviar palpite: ${error}`)
    }
  }
  console.log(matchPredictions)
  return (
    <Modal
      scrollBehavior="outside"
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      closeButton={<img src="/closeicon.png" alt="close" />}
    >
      <ModalContent className="bg-[#1F67CE]">
        {(onClose) => (
          <>
            <ModalHeader className="text-white flex-col flex">
              <h1 className="font-chineseRocksRegular text-[24px] font-normal">
                Confirme seus palpites
              </h1>
              <p className="label-card-prediction font-normal leading-4 font-monumentExtendedRegular text-[12px] mt-4">
                Antes de enviar, revise e confirme seus palpites!
              </p>
            </ModalHeader>
            <ModalBody>
              {matchPredictions.map((matchPrediction, index) => (
                <div key={index} className="">
                  <div className="bg-[#00409F] rounded-lg p-4">
                    <div className="flex space-x-2 justify-between items-center mb-4">
                      <div className="flex">
                        <Image
                          src="/sportsicon.png"
                          alt="sports icon"
                          className=""
                        />
                        <h1 className="mx-3 label-card-prediction text-white">
                          {matchPrediction.roundName}
                        </h1>
                      </div>

                      <h1 className="mx-3 label-card-prediction text-white">
                        {formatDateToDayAndHour(
                          new Date(matchPrediction.matchDate),
                        )}
                      </h1>
                    </div>
                    <div className="flex  justify-center items-center mb-1">
                      <div className="flex flex-col justify-center items-center">
                        <h1 className="mx-3 label-card-prediction  text-white font-semibold">
                          {matchPrediction.teamHome}
                        </h1>
                        <h1 className="mx-3 text-[16px]  text-white font-semibold">
                          {matchPrediction.predictionHome}
                        </h1>
                      </div>
                      <h1 className="mx-4 label-card-prediction text-white">
                        X
                      </h1>
                      <div className="flex flex-col justify-center items-center">
                        <h1 className="mx-3 label-card-prediction  text-white font-semibold">
                          {matchPrediction.teamAway}
                        </h1>

                        <h1 className="mx-3 text-[16px]  text-white font-semibold">
                          {matchPrediction.predictionAway}
                        </h1>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <hr className="w-full h-[1px] border-t-[1px] border-t-[#1F67CE] my-3" />
                      <h1 className="mx-3 label-card-prediction  text-white font-semibold">
                        <>
                          {!matchPrediction.isDraw && (
                            <>
                              {matchPrediction.teamHome ===
                              matchPrediction.winnerTeamName
                                ? 'Casa - '
                                : 'Fora - '}
                            </>
                          )}
                          {matchPrediction.winnerTeamName}
                        </>
                      </h1>
                      <h1
                        className={`${fontOpenSans.className} mx-3 label-card-prediction text-white mt-3`}
                      >
                        Resultado final
                      </h1>
                    </div>

                    {matchPrediction.lastPlayerToScore?.name ? (
                      <>
                        <hr className="w-full h-[1px] border-t-[1px] border-t-[#1F67CE] my-4" />
                        <div className="mx-3 flex flex-col justify-center items-center space-y-4">
                          <h1 className="label-card-prediction text-white font-semibold">
                            Marcador do último gol do{' '}
                            {matchPrediction.lastPlayerToScore.team}:{' '}
                          </h1>
                          <h1 className="label-card-prediction text-white font-normal">
                            {matchPrediction.lastPlayerToScore?.name}
                          </h1>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
            </ModalBody>
            <ModalFooter className="flex flex-col">
              <Button
                onClick={handleSubmit}
                className={` rounded-full bg-[#00764B] text-white text-[14px] font-bold flex justify-center items-center px-4 py-3  `}
              >
                {buttonIsLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {matchPredictions.length > 1
                      ? 'Enviar palpites'
                      : 'Enviar palpite'}
                  </>
                )}
              </Button>
              <Button
                onPress={onClose}
                className={` text-[14px] text-white font-bold bg-[#E40000] rounded-full`}
              >
                Fechar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ConfirmPredictionModal
