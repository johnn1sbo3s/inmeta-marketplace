<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import LoginModal from '@/components/features/auth/LoginModal.vue'
import RegisterModal from '@/components/features/auth/RegisterModal.vue'

const authStore = useAuthStore()

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
