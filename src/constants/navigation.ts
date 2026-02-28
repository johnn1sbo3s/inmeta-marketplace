import type { DropdownMenuItem,NavigationMenuItem } from '@nuxt/ui'

import { useAuthStore } from '@/stores/auth'

export function getNavigationMenuItems(): NavigationMenuItem[] {
  return [
    {
      label: 'Home',
      icon: 'i-lucide-home',
      to: '/'
    },
    {
      label: 'Cartas',
      icon: 'i-hugeicons-cards-01',
      to: '/cards'
    },
    {
      label: 'Trocas',
      icon: 'i-uil-exchange',
      to: '/trades'
    }
  ]
}

export function getProfileMenuItems(): DropdownMenuItem[] {
  const authStore = useAuthStore()

  return [
    {
      label: 'Minhas cartas',
      icon: 'i-hugeicons-cards-01',
      to: '/my-cards'
    },
    {
      label: 'Sair',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      onSelect: () => authStore.logout()
    }
  ]
}