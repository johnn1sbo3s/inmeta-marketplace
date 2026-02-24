import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isLoginModalOpen = ref(false)
  const isRegisterModalOpen = ref(false)

  function openLogin() {
    isRegisterModalOpen.value = false
    isLoginModalOpen.value = true
  }

  function openRegister() {
    isLoginModalOpen.value = false
    isRegisterModalOpen.value = true
  }

  function closeAll() {
    isLoginModalOpen.value = false
    isRegisterModalOpen.value = false
  }

  return {
    isLoginModalOpen,
    isRegisterModalOpen,
    openLogin,
    openRegister,
    closeAll
  }
})
