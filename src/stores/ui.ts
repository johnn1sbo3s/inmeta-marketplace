import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isLoginModalOpen = ref(false)
  const isRegisterModalOpen = ref(false)
  const isSidebarOpen = ref(false)

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

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  function openSidebar() {
    isSidebarOpen.value = true
  }

  function closeSidebar() {
    isSidebarOpen.value = false
  }

  return {
    isLoginModalOpen,
    isRegisterModalOpen,
    isSidebarOpen,
    openLogin,
    openRegister,
    closeAll,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
})
