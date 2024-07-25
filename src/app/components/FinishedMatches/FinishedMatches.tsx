import MyHistoryPredictionCard from '../MyHistoryPredictionCard/MyHistoryPredictionCard'

interface FinishedMatchesProps {
  matches: IPredictionsGetResponse[]
}

export default function FinishedMatches({ matches }: FinishedMatchesProps) {
  return (
    <div className="space-y-6 mb-6">
      {matches.map((match, index) => (
        <MyHistoryPredictionCard prediction={match} key={index} />
      ))}
    </div>
  )
}
