import { get } from '../../methods/get'
import { patch } from '../../methods/patch'
import { post } from '../../methods/post'
import { put } from '../../methods/put'

export default async function MatchService() {
  async function create(data: INewMatch): Promise<{ matchId: string }> {
    const payload = JSON.stringify(data)
    const response = await post<{ matchId: string }, string>('/match', payload)
    return response
  }

  async function updateScore(data: IPayloadSetResutMatch): Promise<void> {
    const payload = JSON.stringify(data)
    await put('/match', payload)
  }

  async function updateDateMatch(matchId: string, date: Date): Promise<void> {
    const payload = JSON.stringify({ matchId, date })
    await patch('/match/update-date', payload)
  }

  async function fetchWinner(matchId: string): Promise<IWinner> {
    const response = await get<{ winner: IWinner }>(`/match/winner/${matchId}`)
    return response.winner
  }
  async function sendSmsWinner(matchId: string): Promise<void> {
    const payload = JSON.stringify({ matchId })
    await post('match/notification-winner', payload)
  }

  return {
    create,
    updateScore,
    updateDateMatch,
    fetchWinner,
    sendSmsWinner,
  }
}
