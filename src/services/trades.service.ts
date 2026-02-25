import { api } from './api'
import type { Trade, PaginatedResponse, CreateTradePayload, CreateTradeResponse } from '../types'

export const TradesService = {
  async getAll(page = 1, rpp = 10) {
    const { data } = await api.get<PaginatedResponse<Trade>>('/trades', {
      params: { page, rpp }
    })
    return data
  },

  async create(payload: CreateTradePayload) {
    const { data } = await api.post<CreateTradeResponse>('/trades', payload)
    return data
  },

  async delete(id: string) {
    const { data } = await api.delete(`/trades/${id}`)
    return data
  }
}
