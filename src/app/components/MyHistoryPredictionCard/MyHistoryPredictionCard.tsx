import React from 'react'

import { formatDateToDayAndHour } from '@/utils/formatDate'
import { Image } from '@nextui-org/react'
import { MdAccessTime } from 'react-icons/md'

type MyHistoryPredictionCardProps = {
  prediction: IPredictionsGetResponse
}

export default function MyHistoryPredictionCard({
  prediction,
}: MyHistoryPredictionCardProps) {
  return (
    <div className="flex flex-col p-4 bg-[#00409F] rounded-lg w-[90%]  mx-auto justify-center items-center">
      <div className="flex w-full justify-between">
        <div className="flex space-x-2">
          <Image src="/sportsicon.png" alt="sports icon" />
          <h1 className="text-white text-[12px] font-normal">
            {prediction.match.roundName}
          </h1>
        </div>
        <h1 className="text-white text-[12px] font-normal">
          {formatDateToDayAndHour(new Date(prediction.match.date))}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center mt-4 w-full">
          <div className="flex flex-col space-y-4">
            <h1 className="text-center">{prediction.match.teamHome}</h1>
            <div className="flex justify-center items-center">
              <h1 className="mx-3 text-[16px text-white] font-semibold">
                {prediction.predictionScore.predictionHome}
              </h1>
            </div>
          </div>
          <h1 className="mx-4">X</h1>
          <div className="flex flex-col space-y-4">
            <h1 className="text-center">{prediction.match.teamAway}</h1>
            <div className="flex justify-center items-center">
              <h1 className="mx-3 text-[16px text-white] font-semibold">
                {prediction.predictionScore.predictionAway}
              </h1>
            </div>
          </div>
        </div>

        {prediction.match.status !== 'DONE' ? (
          <h1 className="flex justify-center items-center gap-2 mt-4">
            <MdAccessTime />
            Aguardando resultado
          </h1>
        ) : (
          <>
            {prediction.predictionScore.status === 'HIT' ? (
              <h1 className="flex justify-center items-center gap-2 mt-4">
                <Image src="/checkicon.svg" alt="check" />
                Você acertou o placar!
              </h1>
            ) : (
              <h1 className="flex justify-center items-center gap-2 mt-4">
                <Image src="/wrongicon.svg" alt="check" />
                Você errou o placar!
              </h1>
            )}
          </>
        )}
      </div>

      {prediction.predictionPlayer.player && (
        <div key={prediction.match.id} className="w-full">
          <hr className="w-full h-[1px] border-t-[1px] border-t-[#1F67CE] mt-4" />
          <h1 className="text-[12px] font-semibold text-white text-center mt-4">
            Marcador do último gol do {prediction.match.teamHome}:
          </h1>
          <h1 className="flex justify-center items-center gap-2 mt-4">
            <Image src="/player.png" alt="player" />
            {prediction.predictionPlayer.player}
          </h1>
          {prediction.match.status === 'WAITING' ? (
            <h1 className="flex justify-center items-center gap-2 mt-4">
              <MdAccessTime />
              Aguardando resultado
            </h1>
          ) : (
            <>
              {prediction.predictionPlayer.status === 'HIT' ? (
                <h1 className="flex justify-center items-center gap-2 mt-4">
                  <Image src="/checkicon.svg" alt="check" />
                  Você acertou o palpite!
                </h1>
              ) : (
                <h1 className="flex justify-center items-center gap-2 mt-4">
                  <Image src="/wrongicon.svg" alt="check" />
                  Você errou o palpite!
                </h1>
              )}
            </>
          )}
        </div>
      )}
      {/* <hr className="w-full h-[1px] border-t-[1px] border-t-[#1F67CE] mt-4" /> */}
    </div>
  )
}
