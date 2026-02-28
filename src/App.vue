<script setup lang="ts">
import { useToast } from '@nuxt/ui/composables'
import { onMounted, watch } from 'vue'

import LoginModal from '@/components/features/auth/LoginModal.vue'
import RegisterModal from '@/components/features/auth/RegisterModal.vue'
import SidebarMenu from '@/components/layout/SidebarMenu.vue'
import { useToastStore } from '@/stores/toast'

import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const toast = useToast()
const toastStore = useToastStore()

watch(() => toastStore.currentToast, (newToast) => {
  if (newToast) {
    toast.add(newToast)
    toastStore.clearToast()
  }
}, { deep: true })

onMounted(() => {
  authStore.loadUserFromStorage()
})
</script>

<template>
  <UApp>
    <RouterView />
    <LoginModal />
    <RegisterModal />
    <SidebarMenu />
  </UApp>
</template>
