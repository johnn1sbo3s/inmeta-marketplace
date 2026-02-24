import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

export type ToastMessage = {
  title: string
  description?: string
  color?: ToastColor
  icon?: string
}

export const useToastStore = defineStore('toast', () => {
  const currentToast = ref<ToastMessage | null>(null)

  function showToast(msg: ToastMessage) {
    currentToast.value = msg
  }

  function clearToast() {
    currentToast.value = null
  }

  return {
    currentToast,
    showToast,
    clearToast
  }
})
