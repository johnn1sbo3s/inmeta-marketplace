import { useMutation } from '@tanstack/vue-query'
import { useRoute,useRouter } from 'vue-router'

import { useToastStore } from '@/stores/toast'
import { useUiStore } from '@/stores/ui'

import { AuthService } from '../services/auth.service'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const uiStore = useUiStore()

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      const toastStore = useToastStore()
      toastStore.showToast({
        title: 'Sucesso',
        description: 'Login realizado com sucesso!',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      authStore.setAuth(data.token, data.user)
      uiStore.closeAll()
      router.push(route.query.redirectTo as string || '/')
    }
  })

  const registerMutation = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      const toastStore = useToastStore()
      toastStore.showToast({
        title: 'Sucesso',
        description: 'Conta criada com sucesso!',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
      uiStore.closeAll()
      router.push(route.query.redirectTo as string || '/')
    }
  })

  return {
    loginMutation,
    registerMutation
  }
}
