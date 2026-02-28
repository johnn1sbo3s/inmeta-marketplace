import axios from 'axios'
import router from '../router'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://cards-marketplace-api.onrender.com',
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Ocorreu um erro inesperado. Tente novamente.'

    import('@/stores/toast').then(({ useToastStore }) => {
      const toastStore = useToastStore()
      toastStore.showToast({
        title: 'Erro',
        description: message,
        color: 'error',
        icon: 'i-lucide-circle-alert'
      })
    })

    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)
