<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { useUiStore } from '../../stores/ui'
import { computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { getNavigationMenuItems, getProfileMenuItems } from '@/constants/navigation'

const authStore = useAuthStore()
const uiStore = useUiStore()

const navigationMenuItems = getNavigationMenuItems()
const profileMenuItems = getProfileMenuItems()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

function handleLoginClick() {
  uiStore.openLogin()
  uiStore.closeSidebar()
}

function handleRegisterClick() {
  uiStore.openRegister()
  uiStore.closeSidebar()
}
</script>

<template>
  <header class="border-b border-gray-200 bg-white/70 backdrop-blur-2xl sticky top-0 z-10">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-10">
        <div class="flex items-center gap-3">
          <button
            class="md:hidden"
            @click="uiStore.toggleSidebar()"
          >
            <Icon
              icon="lucide:menu"
              width="24"
              height="24"
            />
          </button>

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
        </div>

        <UNavigationMenu
          class="hidden md:block"
          :items="navigationMenuItems"
          highlight
        />
      </div>

      <div class="hidden sm:flex items-center gap-1 sm:gap-2">
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
            <BaseButton
              color="gray"
              variant="ghost"
              trailing-icon="i-heroicons-chevron-down-20-solid"
              :label="user?.name || 'Perfil'"
            />
          </UDropdownMenu>
        </template>

        <template v-else>
          <BaseButton
            variant="ghost"
            label="Entrar"
            @click="handleLoginClick"
          />

          <BaseButton
            label="Criar conta"
            @click="handleRegisterClick"
          />
        </template>
      </div>
    </div>
  </header>
</template>
