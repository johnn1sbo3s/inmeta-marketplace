import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  User
} from '../types'
import { api } from './api'

export const AuthService = {
  async login(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>('/login', payload)
    return data
  },

  async register(payload: RegisterPayload) {
    const { data } = await api.post<RegisterResponse>('/register', payload)
    return data
  },

  async getMe() {
    const { data } = await api.get<User>('/me')
    return data
  }
}
