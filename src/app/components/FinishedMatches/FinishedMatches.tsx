import MyHistoryPredictionCard from '../MyHistoryPredictionCard/MyHistoryPredictionCard'
import React from 'react'

interface FinishedMatchesProps {
  matches: IPredictionsGetResponse[]
}

export default function FinishedMatches({ matches }: FinishedMatchesProps) {
  return (
    <div className="space-y-6 mb-6 flex items-center justify-center flex-col">
      {matches.map((match, index) => (
        <MyHistoryPredictionCard prediction={match} key={index} />
      ))}
    </div>
  )
}
