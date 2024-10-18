'use client'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  Tab,
  Tabs,
} from '@nextui-org/react'
import { fetchChampionshipsWithRounds, getPredictions } from './actions'
import { parseCookies } from 'nookies'
import toast from 'react-hot-toast'
import ConfirmPredictionModal from '@/app/components/ConfirmPredictionModal/ConfirmPredictionModal'
import { useHomeUserContext } from '@/context/HomeUserContext'
import { formatDateToDayAndHour } from '@/utils/formatDate'
import FinishedMatches from '@/app/components/FinishedMatches/FinishedMatches'
import WaitingResultModal from '@/app/components/WaitingResultModal/WaitingResultModal'
import { Open_Sans } from 'next/font/google'

type SelectPredictionProps = {
  matchId: string
  isDraw?: boolean
  winnerTeamId?: string
  match?: IRoundMatch
}

const fontOpenSans = Open_Sans({ subsets: ['latin'] })

export default function HomeUser() {
  const [championships, setChampionships] = useState<IChampionshipWithRounds[]>(
    [],
  )
  const [matchPredictions, setMatchPredictions] = useState<IPrediction[]>([])
  const [fetchCompleted, setFetchCompleted] = useState<boolean>(false)
  const [existMatches, setExistMatches] = useState<boolean>(false)

  const [isConfirmPredictionOpen, setIsConfirmPredictionOpen] =
    useState<boolean>(false)
  const [isWaitingResultsModal, setIsWaitingResultsModal] =
    useState<boolean>(false)

  const { disabledMatches, loading, setLoading } = useHomeUserContext()

  const [matchPredictionsToConfirm, setMatchPredictionsToConfirm] = useState<
    {
      matchDate: Date
      matchId: string
      roundName: string
      teamHome: string
      teamAway: string
      predictionHome?: number
      predictionAway?: number
      winnerTeamId?: string
      isDraw?: boolean
      lastPlayerToScore?: {
        name?: string
        id?: string
        team?: string
      }
    }[]
  >([])

  const [userPredictions, setUserPredictions] = useState<
    IPredictionsGetResponse[]
  >([])

  const { 'qxute-bolao:x-token': token } = parseCookies()

  const getChampionships = async (token: string) => {
    const result = await fetchChampionshipsWithRounds(token)
    return result
  }

  const getUserPredictions = async (token: string) => {
    const { predictions } = await getPredictions(token)
    const finishedMatches = predictions?.filter(
      (prediction) => prediction.match.status === 'DONE',
    )
    // console.log(finishedMatches);
    return finishedMatches
  }

  useEffect(() => {
    getUserPredictions(token).then((finishedMatches) => {
      console.log(finishedMatches)
      setUserPredictions(finishedMatches || [])
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    getChampionships(token)
      .then((data) => {
        if (data.championships) {
          const championships = data.championships
          setChampionships(championships)
        }
      })
      .catch((e) => toast.error(e))
      .finally(() => {
        setLoading(false)
        setFetchCompleted(true)
      })
  }, [token])

  useEffect(() => {
    // const initialScores = championships.flatMap((championship) =>
    //   championship.rounds.flatMap((round) =>
    //     round.matchs.map((match) => ({
    //       predictionHome: 0,
    //       predictionAway: 0,
    //       playerId: null,
    //       matchId: match.id,
    //       disabled: match?.predictions?.length !== 0,
    //     })),
    //   ),
    // )

    // setMatchPredictionScores(initialScores)

    const matchs = championships.flatMap((championship) =>
      championship.rounds.flatMap((round) => round.matchs),
    )

    if (matchs.length > 0) {
      setExistMatches(true)
    }
  }, [championships])

  console.log(matchPredictions)

  const handleSelectPrediction = ({
    matchId,
    isDraw,
    winnerTeamId,
  }: SelectPredictionProps) => {
    setMatchPredictions((prevState) => {
      const matchExists = prevState.find(
        (prediction) => prediction.matchId === matchId,
      )

      if (
        matchExists &&
        matchExists.isDraw === isDraw &&
        matchExists.winnerTeamId === winnerTeamId
      ) {
        return prevState.filter((prediction) => prediction.matchId !== matchId)
      }

      if (matchExists) {
        return prevState.map((prediction) =>
          prediction.matchId === matchId
            ? { ...prediction, isDraw, winnerTeamId }
            : prediction,
        )
      }

      return [...prevState, { matchId, isDraw, winnerTeamId }]
    })
  }

  const handlePlayerSelection = (matchId: string, playerId: string) => {
    setMatchPredictions((prevScores) =>
      prevScores.map((score) =>
        score.matchId === matchId ? { ...score, playerId } : score,
      ),
    )
  }

  const handleOpenConfirmPredictionModal = () => {
    const enabledMatches = championships.flatMap((championship) =>
      championship.rounds.flatMap((round) =>
        round.matchs
          .filter(
            (match) =>
              !(match?.predictions?.length !== 0 || disabledMatches[match.id]),
          )
          .map((match) => ({ match, round })),
      ),
    )

    const predictions = enabledMatches
      .map(({ match, round }) => {
        const prediction = matchPredictions.find(
          (pred) => pred.matchId === match.id,
        )

        return {
          matchDate: match.date,
          matchId: match.id,
          roundName: round.name,
          teamHome: match.teamHome.name,
          teamAway: match.teamAway.name,
          predictionHome: prediction?.predictionHome,
          predictionAway: prediction?.predictionAway,
          isDraw: prediction?.isDraw,
          winnerTeamId: prediction?.winnerTeamId,
          winnerTeamName:
            prediction?.winnerTeamId &&
            match.teamHome.id === prediction.winnerTeamId
              ? match.teamHome.name
              : prediction?.winnerTeamId &&
                  match.teamAway.id === prediction.winnerTeamId
                ? match.teamAway.name
                : prediction?.isDraw
                  ? 'Empate'
                  : undefined,
          lastPlayerToScore: match.lastPlayerTeam
            ? {
                name: prediction?.playerId
                  ? match.players.find(
                      (player) => player.id === prediction.playerId,
                    )?.name
                  : undefined,
                id: prediction?.playerId,
                team: match.lastPlayerTeam.name,
              }
            : undefined,
        }
      })
      .filter(
        (prediction) =>
          (prediction.predictionHome !== undefined &&
            prediction.predictionAway !== undefined) ||
          prediction.isDraw !== undefined ||
          prediction.winnerTeamId !== undefined ||
          prediction.lastPlayerToScore !== undefined,
      )

    if (predictions.length === 0) {
      return toast.error(`Não há partidas para enviar palpites.`)
    }

    setMatchPredictionsToConfirm(
      predictions.map((prediction) => ({
        ...prediction,
        lastPlayerToScore: prediction.lastPlayerToScore
          ? {
              ...prediction.lastPlayerToScore,
              id: prediction.lastPlayerToScore.id || undefined,
            }
          : undefined,
      })),
    )

    setIsConfirmPredictionOpen(true)
  }

  const areAllMatchesDisabled = () => {
    return championships.every((championship) =>
      championship.rounds.every((round) =>
        round.matchs.every(
          (match) =>
            match?.predictions?.length !== 0 || disabledMatches[match.id],
        ),
      ),
    )
  }

  // console.log(areAllMatchesDisabled)

  const isSelect = ({
    matchId,
    isDraw,
    winnerTeamId,
    match,
  }: SelectPredictionProps) => {
    // const predictions = match.predictions.filter(
    //   (prediction) => prediction.winnerTeamId === match.teamHome.id,
    // )
    // console.log(match)
    const predictions = matchPredictions.filter(
      (prediction) =>
        prediction.matchId === matchId &&
        (prediction.winnerTeamId === winnerTeamId ||
          (prediction.isDraw && isDraw)),
    )

    if (predictions.length > 0) return true

    if (match && match?.predictions?.length > 0) {
      const prediction = match?.predictions.filter(
        (prediction) =>
          prediction.winnerTeamId === winnerTeamId ||
          prediction.isDraw === isDraw,
      )
      console.log(prediction)
      if (prediction.length > 0) return true
    }

    // if (prediciton?.winnerTeamId === winnerTeamId) {
    //   return true
    // }

    return false
  }

  return (
    <form className={`flex flex-col mx-auto w-[100%] items-center h-full`}>
      <div className="max-w-[1140px] w-full flex flex-col items-center justify-center">
        <h1
          className={`text-center text-[#00409F] text-[32px] font-chineseRocksRegular  mt-10`}
        >
          Resultado correto
        </h1>
        <p className="text-[#00409F] mt-2 mb-4 text-center font-monumentExtendedRegular text-[12px]">
          Acompanhe os resultados das partidas aqui.
        </p>
        {loading ? (
          <div className="min-h-[50vh]">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col w-[100%] min-h-[50vh] space-y-6 mx-auto items-center">
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
                className={`w-full flex flex-col items-center justify-center ${fontOpenSans.className}`}
              >
                {fetchCompleted && !existMatches ? (
                  <h1 className="text-center text-[#00409F] text-[18px] font-bold mb-10">
                    Nenhuma partida encontrada!
                  </h1>
                ) : (
                  championships.flatMap((championship) =>
                    championship.rounds.flatMap((round) =>
                      round.matchs.map((match, matchIndex) => (
                        <div
                          key={`match-${match.id}`}
                          className="max-w-[550px] w-full mb-7"
                        >
                          <div
                            key={`match-container-${matchIndex}`}
                            className="flex flex-col w-[90%] mx-auto border-1px border-[#00409F] "
                          >
                            <div
                              className={`flex flex-col bg-[#1F67CE] p-4 rounded-lg ${match?.predictions?.length !== 0 || disabledMatches[match.id] ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                              <div className="flex w-full justify-between">
                                <div className="flex space-x-2">
                                  <Image
                                    src="/sportsicon.png"
                                    alt="sports icon"
                                  />
                                  <h1 className="text-white label-card-prediction font-normal">
                                    {round.name} do {championship.name}
                                  </h1>
                                </div>
                                <h1 className="text-white label-card-prediction font-normal">
                                  {formatDateToDayAndHour(new Date(match.date))}
                                </h1>
                              </div>
                              <div className="flex justify-center items-center gap-1 mt-4">
                                <div className="flex flex-col justify-center items-center w-full">
                                  <h1 className="text-center text-white mb-4 label-card-prediction">
                                    {match.teamHome.name}
                                  </h1>
                                  <div className="flex justify-center items-center w-full">
                                    <div className="flex justify-center items-center w-full">
                                      <div
                                        onClick={() =>
                                          handleSelectPrediction({
                                            matchId: match.id,
                                            winnerTeamId: match.teamHome.id,
                                          })
                                        }
                                        className={`${isSelect({ matchId: match.id, winnerTeamId: match.teamHome.id, match }) && 'bg-[#00764B]'} cursor-pointer md:max-w-[120px]  w-full max-w-[87px] md:h-[35px] h-[26px] border-[1px] border-white bg-[#00409F] rounded-[4px] flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50`}
                                      >
                                        <p className="text-white label-card-prediction">
                                          Casa
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-center items-center w-full">
                                  <h1 className="text-white label-card-prediction mb-4">
                                    x
                                  </h1>
                                  <div className="flex justify-center items-center w-full">
                                    <div
                                      onClick={() =>
                                        handleSelectPrediction({
                                          matchId: match.id,
                                          isDraw: true,
                                        })
                                      }
                                      className={`${isSelect({ matchId: match.id, isDraw: true, match }) && 'bg-[#00764B]'}  cursor-pointer md:max-w-[120px] w-full max-w-[87px] md:h-[35px] h-[26px] border-[1px] border-white bg-[#00409F] rounded-[4px] flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50`}
                                    >
                                      <p className="text-white label-card-prediction">
                                        Empate
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col justify-center items-center w-full">
                                  <h1 className="text-center text-white mb-4 label-card-prediction">
                                    {match.teamAway.name}
                                  </h1>
                                  <div className="flex justify-center items-center w-full">
                                    <div
                                      onClick={() =>
                                        handleSelectPrediction({
                                          matchId: match.id,
                                          winnerTeamId: match.teamAway.id,
                                        })
                                      }
                                      className={`${isSelect({ matchId: match.id, winnerTeamId: match.teamAway.id, match }) && 'bg-[#00764B]'}  cursor-pointer md:max-w-[120px] w-full max-w-[87px] md:h-[35px] h-[26px] border-[1px] border-white bg-[#00409F] rounded-[4px] flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50`}
                                    >
                                      <p className="text-white label-card-prediction">
                                        Fora
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {match.lastPlayerTeam && (
                            <div key={matchIndex} className="my-8">
                              <h1
                                className={`text-center text-[#00409F] text-[32px] font-chineseRocksRegular font-bold  mt-10`}
                              >
                                Quem fará o último gol do{' '}
                                {match.lastPlayerTeam.name}?
                              </h1>
                              <p className="text-[#00409F] text-[12px] font-monumentExtendedRegular mt-2 mb-4 text-center">
                                Palpite o jogador que irá marcar o último gol na
                                partida.
                              </p>
                              <div
                                className={`flex flex-col p-4 bg-[#1F67CE] rounded-lg w-[90%] mx-auto ${match?.predictions?.length !== 0 || disabledMatches[match.id] ? 'opacity-50 pointer-events-none' : ''}`}
                              >
                                <div className="flex w-full justify-between">
                                  <div className="flex space-x-2">
                                    <Image
                                      src="/sportsicon.png"
                                      alt="sports icon"
                                    />
                                    <h1 className="text-white text-[12px] font-normal">
                                      {round.name} - {match.teamHome.name} X{' '}
                                      {match.teamAway.name}
                                    </h1>
                                  </div>
                                  <h1 className="text-white text-[12px] font-normal">
                                    {formatDateToDayAndHour(
                                      new Date(match.date),
                                    )}
                                  </h1>
                                </div>
                                <div className="flex space-x-2 items-center mt-4">
                                  <Image
                                    src="/sportlogo.svg"
                                    alt="sport logo"
                                    className="w-[28px] h-[28px]"
                                  />
                                  <h1 className="text-white text-[12px] font-normal">
                                    Jogadores - {match.lastPlayerTeam.name}
                                  </h1>
                                </div>
                                <hr className="w-full h-[1px] bg-white mt-4" />
                                <RadioGroup
                                  defaultValue={
                                    match?.predictions?.find(
                                      (prediction) =>
                                        prediction.predictionType === 'PLAYER',
                                    )?.lastPlayerToScoreId ||
                                    matchPredictions.find(
                                      (score) => score.matchId === match.id,
                                    )?.playerId ||
                                    undefined
                                  }
                                  className="mt-4 flex"
                                  onChange={(event) =>
                                    handlePlayerSelection(
                                      match.id,
                                      event.target.value,
                                    )
                                  }
                                >
                                  {match.players.map((player) => (
                                    <div
                                      className="bg-[#00409F] text-white flex justify-between items-center p-2 space-x-2 rounded-sm"
                                      key={player.id}
                                    >
                                      <div className="flex justify-center items-center space-x-2">
                                        <Image
                                          src="/sportlogo.svg"
                                          alt={player.name}
                                        />
                                        <h1 className="">{player.name}</h1>
                                      </div>
                                      <Radio
                                        color="success"
                                        className="custom-radio-order justify-between"
                                        value={`${player.id}`}
                                        classNames={{
                                          label: 'hidden',
                                        }}
                                      >
                                        {player.name}
                                      </Radio>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>
                            </div>
                          )}
                        </div>
                      )),
                    ),
                  )
                )}
                {existMatches && (
                  <div className="max-w-[550px] w-full">
                    {areAllMatchesDisabled() ? (
                      <Button
                        startContent={
                          <Image
                            src="/accesstime.svg"
                            alt="aguardando resultados"
                          />
                        }
                        variant="bordered"
                        className={` rounded-full bg-transparent text-[#00409F] text-[14px] font-bold flex justify-center items-center px-4 py-3 w-[90%] mx-auto mb-8 border-[#00409F] border-[2px] border-solid`}
                        onClick={() => {
                          setIsWaitingResultsModal(true)
                        }}
                      >
                        Aguardando resultados
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => handleOpenConfirmPredictionModal()}
                        className={` rounded-full bg-[#00764B] text-white text-[14px] font-bold flex justify-center items-center px-4 py-3 w-[90%] mx-auto mb-8`}
                      >
                        Aposte já!
                      </Button>
                    )}
                  </div>
                )}
              </Tab>
              <Tab
                key="done"
                title="Finalizadas"
                className={`w-full text-[#00409F] ${fontOpenSans.className} `}
              >
                <FinishedMatches matches={userPredictions} />
              </Tab>
            </Tabs>
          </div>
        )}

        <WaitingResultModal
          isOpen={isWaitingResultsModal}
          onClose={() => setIsWaitingResultsModal(false)}
        />
        <ConfirmPredictionModal
          isOpen={isConfirmPredictionOpen}
          onClose={() => setIsConfirmPredictionOpen(false)}
          matchPredictions={matchPredictionsToConfirm}
          token={token}
        />
      </div>
    </form>
  )
}
