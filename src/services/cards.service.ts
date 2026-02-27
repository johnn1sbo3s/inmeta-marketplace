import { api } from './api'
import type { Card, PaginatedResponse } from '../types'

export const CardsService = {
  async getAll(page = 1, rpp = 10) {
    const { data } = await api.get<PaginatedResponse<Card>>('/cards', {
      params: { page, rpp }
    })
    return data
  },

  async getById(id: string) {
    const { data } = await api.get<Card>(`/cards/${id}`)
    return data
  },

  async getMyCards() {
    const { data } = await api.get<Card[]>('/me/cards')
    return data
  },

  async addCardsToMe(cardIds: string[]) {
    const { data } = await api.post('/me/cards', { cardIds })
    return data
  }
}
