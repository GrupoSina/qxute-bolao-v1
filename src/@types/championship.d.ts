declare interface IChampionship {
  id: string
  name: string
  status: string
  createdAt?: Date
}

declare interface INewChampionship {
  name: string
}

declare interface IChampionshipWithRounds {
  id: string
  name: string
  status: string
  rounds: {
    name: string
    status: string
    createdAt: string
    updatedAt: string
    matchs: IRoundMatch[]
  }[]
}

declare interface IRoundMatch {
  id: string
  scoreAway: number
  scoreHome: number
  status: string
  date: Date
  players: {
    name: string
    id: string
  }[]
  lastPlayerTeam: {
    id: string
    name: string
  }
  teamAway: {
    id: string
    name: string
  }
  teamHome: {
    id: string
    name: string
  }
  predictions: IRoundMatchPrediction[]
}

declare interface IRoundMatchPrediction {
  id: string
  createdAt: Date
  updatedAt: Date
  lastPlayerToScore: {
    createdAt: Date
    id: string
    name: string
    status: string
    teamId: string
    updatedAt: Date | null
  } | null
  lastPlayerToScoreId: string | null
  predictionHom?: number | null
  predictionAway?: number | null
  isDraw?: boolean
  winnerTeamId?: string
  predictionType: 'PLAYER' | 'SCORE' | 'WINNER_OR_DRAW'
}
