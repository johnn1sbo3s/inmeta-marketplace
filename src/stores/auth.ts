import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import { AuthService } from '../services/auth.service'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)
  const router = useRouter()

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(newToken: string, userData: User) {
    token.value = newToken
    user.value = userData
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function loadUserFromStorage() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      const userData = await AuthService.getMe()
      user.value = userData
      localStorage.setItem('user', JSON.stringify(userData))
    } catch {
      logout()
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    loadUserFromStorage,
    logout,
    fetchUser
  }
})
