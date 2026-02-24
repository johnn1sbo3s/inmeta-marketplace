import { api } from './api'
import type { LoginResponse, RegisterResponse, User } from '../types'

export const AuthService = {
  async login(payload: Record<string, any>) {
    const { data } = await api.post<LoginResponse>('/login', payload)
    return data
  },

  async register(payload: Record<string, any>) {
    const { data } = await api.post<RegisterResponse>('/register', payload)
    return data
  },

  async getMe() {
    const { data } = await api.get<User>('/me')
    return data
  }
}
