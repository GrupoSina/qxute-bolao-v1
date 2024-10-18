declare interface IPrediction {
  matchId: string
  predictionHome?: number
  predictionAway?: number
  winnerTeamId?: string
  isDraw?: boolean
  playerId?: string | null
  disabled?: boolean | null
}

declare interface IPredictionResponse {
  response: {
    predictionScoreId: string
    predicionPlayerId: string
  }
}

declare interface IPredictionsGetResponse {
  match: {
    date: Date
    id: string
    lastPlayer: string
    roundId: string
    roundName: string
    scoreAway: number
    scoreHome: number
    status: string
    teamAway: string
    teamHome: string
  }
  predictionScore: {
    predictionHome: number
    predictionAway: number
    status: 'HIT' | 'MISS'
  }
  predictionPlayer: {
    player: string | null
    team: string | null
    status: 'HIT' | 'MISS'
  }
  predictionWinner: {
    isDraw?: boolean | null
    winnerTeamId: string | null
    status: 'HIT' | 'MISS'
    winnerTeamName?: string | null
  }
}

declare interface IUserPredictions {
  match: {
    date: Date
    id: string
    lastPlayer: string
    roundId: string
    roundName: string
    scoreAway: number
    scoreHome: number
    status: string
    teamAway: string
    teamHome: string
  }
  predictionPlayer: {
    player: string
    status: string
    team: string
  }
  predictionScore: {
    predictionHome: number
    predictionAway: number
    status: string
  }
  predictionWinner: {
    isDraw?: boolean | null
    winnerTeamId: string | null
    status: 'HIT' | 'MISS'
  }
}

// {userPrediction.predictionPlayer.status === 'HIT' && userPrediction.predictionScore.status === 'HIT'}
