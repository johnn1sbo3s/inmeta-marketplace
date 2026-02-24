<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useAuthStore } from './stores/auth'
import LoginModal from '@/components/features/auth/LoginModal.vue'
import RegisterModal from '@/components/features/auth/RegisterModal.vue'
import { useToast } from '@nuxt/ui/composables'
import { useToastStore } from '@/stores/toast'

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
  </UApp>
</template>
