<script setup lang="ts">
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { getNavigationMenuItems, getProfileMenuItems } from '@/constants/navigation'
import BaseButton from '@/components/ui/BaseButton.vue'

const uiStore = useUiStore()
const authStore = useAuthStore()

const navigationMenuItems = getNavigationMenuItems()
const profileMenuItems = getProfileMenuItems()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const menuItems = computed(() => {
  const addCloseAction = (group: any[]) => group.map((item: any) => ({
    ...item,
    onSelect: () => {
      uiStore.closeSidebar()
      if (item.onSelect) item.onSelect()
    }
  }))

  if (isAuthenticated.value) {
    return [
      addCloseAction(navigationMenuItems),
      addCloseAction(profileMenuItems)
    ]
  }
  return [
    addCloseAction(navigationMenuItems)
  ]
})

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
  <USlideover
    v-model:open="uiStore.isSidebarOpen"
    :overlay="false"
    :ui="{ content: 'z-50' }"
    side="left"
  >
    <template #header>
      <div class="flex items-center justify-between gap-2 w-full">
        <div class="flex items-center gap-2">
          <img
            src="/img/inmeta-cards.png"
            alt="Inmeta Cards"
            class="h-11"
          >
        </div>

        <BaseButton
          color="gray"
          variant="ghost"
          trailing-icon="i-heroicons-x-mark-20-solid"
          @click="uiStore.toggleSidebar()"
        />
      </div>
    </template>

    <template #body>
      <div class="flex flex-col gap-3 justify-between h-full">
        <UNavigationMenu
          orientation="vertical"
          :items="menuItems"
          :ui="{ item: 'py-3' }"
          highlight
        />

        <div
          v-if="!isAuthenticated"
          class="flex flex-col gap-2"
        >
          <BaseButton
            label="Entrar"
            variant="soft"
            block
            size="lg"
            @click="handleLoginClick"
          />

          <BaseButton
            label="Criar conta"
            block
            size="lg"
            @click="handleRegisterClick"
          />
        </div>
      </div>
    </template>
  </USlideover>
</template>