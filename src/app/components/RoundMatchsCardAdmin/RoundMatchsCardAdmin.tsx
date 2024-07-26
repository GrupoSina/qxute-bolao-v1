import React from 'react'
import { formatDateToCustomString } from '@/utils/formatDate'
import { Button, Image } from '@nextui-org/react'
import { MdEdit, MdPerson } from 'react-icons/md'
import SetResultModal from '../SetResultModal/SetResultModal'
import { useEventsContext } from '@/context/EventsContext'
import { getLogo } from '@/utils/getLogo'
import EditMatchModal from '../EditMatch/EditMatch'
import WinnerModal from '../WinnerModal/WinnerModal'

type RoundMatchsCardAdmin = {
  round: IRoundWithMatchsAndChampionship
  status: 'WAITING' | 'IN_PROGRESS' | 'DONE'
}

export default function RoundMatchsCardAdmin({
  round,
  status,
}: RoundMatchsCardAdmin) {
  const {
    setSelectedMatchSetResult,
    setEditSelectedMatch,
    setVisibleModalMatches,
    setSelectedMatchWinner,
  } = useEventsContext()

  function handleSetResult(
    round: IRoundWithMatchsAndChampionship,
    match: IMatchRound,
  ) {
    setSelectedMatchSetResult({
      id: round.id,
      name: round.name,
      status: round.status,
      championship: round.championship,
      createdAt: round.createdAt,
      match,
    })
    setVisibleModalMatches('set-result')
  }

  return (
    <>
      {round.matchs.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {round.matchs.map((match) => (
            <div
              key={match.id}
              className="flex flex-col gap-4 p-4 my-[16px] bg-[#00409F] rounded-lg w-[90%] mx-auto"
            >
              <div className="flex w-full justify-between">
                <div className="flex space-x-2">
                  <Image src="/sportsicon.png" alt="sports icon" />
                  <h1 className="text-white text-[12px] font-normal">
                    {round.championship.name} - {round.name}{' '}
                  </h1>
                </div>
                <h1 className="text-white text-[12px] font-normal">
                  {formatDateToCustomString(new Date(match.date))}
                </h1>
              </div>
              <div className="flex items-center justify-evenly">
                <div className="flex flex-col items-center">
                  <p className="text-white">{match.teamHome.name}</p>
                  <p className="text-white">{match.scoreHome}</p>
                </div>
                <p className="text-white">X</p>
                <div className="flex flex-col items-center">
                  <p className="text-white">{match.teamAway.name}</p>
                  <p className="text-white">{match.scoreAway}</p>
                </div>
              </div>
              {match.lastPlayerTeam && (
                <div className="flex flex-col">
                  <div className="flex space-x-2 items-center">
                    <div
                      className={`rounded-full w-[28px] h-[28px] ${getLogo(match.lastPlayerTeam?.name) === '/defaultlogo.svg' && 'bg-[#fff]'} `}
                    >
                      <Image
                        src={getLogo(match.lastPlayerTeam?.name)}
                        alt="sport logo"
                        className="w-[28px] h-[28px]"
                      />
                    </div>
                    <h1 className="text-white text-[12px] font-normal">
                      Marcador do último gol do {match.lastPlayerTeam?.name}
                    </h1>
                  </div>
                  <hr className="w-full h-[1px] bg-white my-4" />
                  <div className="flex flex-col gap-2">
                    {match.status === 'DONE' ? (
                      <div className="flex space-x-2 items-center bg-[#1F67CE] p-2">
                        <div
                          className={`w-[28px] h-[28px] rounded-2xl ${getLogo(match.lastPlayerTeam?.name) === '/defaultlogo.svg' && 'bg-[#fff]'} `}
                        >
                          <Image
                            src={getLogo(match.lastPlayerTeam?.name)}
                            alt="sport logo"
                            className="w-[28px] h-[28px]"
                          />
                        </div>

                        <h1 className="text-white text-[12px] font-normal">
                          {match.lastPlayerToScore?.name}
                        </h1>
                      </div>
                    ) : (
                      <>
                        {match?.players?.map((player) => (
                          <div
                            key={player.id}
                            className="flex space-x-2 items-center bg-[#1F67CE] p-2"
                          >
                            <div
                              className={`w-[28px] h-[28px] rounded-2xl ${getLogo(player.name) === '/defaultlogo.svg' && 'bg-[#fff]'} `}
                            >
                              <Image
                                src={getLogo(player.name)}
                                alt="sport logo"
                                className="w-[28px] h-[28px]"
                              />
                            </div>

                            <h1 className="text-white text-[12px] font-normal">
                              {player.name}
                            </h1>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-white">
                <MdPerson />
                <p className="text-white text-[12px] font-normal">
                  {match.creator?.fullName}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {status === 'WAITING' && (
                  <Button
                    variant="bordered"
                    className={`text-[14px] text-white font-bold border-white rounded-full`}
                    onPress={() => {
                      setVisibleModalMatches('edit')
                      setEditSelectedMatch(match)
                    }}
                  >
                    <p className="flex gap-3 items-center">
                      <MdEdit /> Editar evento
                    </p>
                  </Button>
                )}

                <Button
                  onClick={() => handleSetResult(round, match)}
                  type="submit"
                  className={`text-[14px] text-white font-bold bg-[#00764B] rounded-full`}
                >
                  {status === 'DONE' ? 'Editar Resultado' : 'Definir resultado'}
                </Button>

                {status === 'DONE' && (
                  <Button
                    variant="bordered"
                    className={`text-[14px] text-white font-bold border-white rounded-full`}
                    onPress={() => {
                      setVisibleModalMatches('winner')
                      setSelectedMatchWinner({ roundName: round.name, match })
                    }}
                  >
                    <p className="flex gap-3 items-center">Ver vencedor</p>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <SetResultModal />

      <EditMatchModal />
      <WinnerModal />
    </>
  )
}
