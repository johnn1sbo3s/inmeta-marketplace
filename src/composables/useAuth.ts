import { useMutation } from '@tanstack/vue-query'
import { AuthService } from '../services/auth.service'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      authStore.setAuth(data.token, data.user)
      router.push('/')
    }
  })

  const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      router.push('/login')
    }
  })

  return {
    loginMutation,
    registerMutation
  }
}
