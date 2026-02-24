<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { useUiStore } from '../../stores/ui'
import { computed } from 'vue'
import Button from '@/components/ui/BaseButton.vue'
import type { DropdownMenuItem } from '@nuxt/ui'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const uiStore = useUiStore()
const router = useRouter()

const profileMenuItems: DropdownMenuItem[] = [
  {
    label: 'Minhas cartas',
    icon: 'i-gg-card-hearts',
    onSelect: () => router.push('/my-cards')
  },
  {
    label: 'Trocas',
    icon: 'i-lucide-arrow-right-left',
    onSelect: () => router.push('/trades')
  },
  {
    label: 'Sair',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    onSelect: () => authStore.logout()
  }
]

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
</script>

<template>
  <header class="border-b border-gray-200 bg-white/80 backdrop-blur-2xl sticky top-0 z-10">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <RouterLink
        to="/"
        class="text-xl font-bold flex items-center gap-2 text-primary"
      >
        <img
          src="/img/inmeta-cards.png"
          alt="Inmeta Cards"
          class="h-12"
        >
      </RouterLink>

      <nav class="flex items-center gap-1 sm:gap-2">
        <template v-if="isAuthenticated">
          <UAvatar
            :alt="user?.name"
            size="sm"
          />

          <UDropdownMenu
            :items="profileMenuItems"
            :ui="{
              content: 'z-50 bg-white/80 backdrop-blur-2xl',
              item: 'cursor-pointer rounded-lg py-2 hover:bg-primary-500/10 transition-colors'
            }"
          >
            <Button
              color="gray"
              variant="ghost"
              trailing-icon="i-heroicons-chevron-down-20-solid"
              :label="user?.name || 'Perfil'"
            />
          </UDropdownMenu>
        </template>

        <template v-else>
          <Button
            variant="ghost"
            label="Entrar"
            @click="uiStore.openLogin()"
          />

          <Button
            label="Criar conta"
            @click="uiStore.openRegister()"
          />
        </template>
      </nav>
    </div>
  </header>
</template>
