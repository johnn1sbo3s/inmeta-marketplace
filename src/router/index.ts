import { createRouter, createWebHistory } from 'vue-router'

import { useSelectedTradeStore } from '@/stores/selected-trade'
import { useUiStore } from '@/stores/ui'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/my-cards',
      name: 'my-cards',
      component: () => import('../pages/MyCardsPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import('../pages/CardsPage.vue'),
    },
    {
      path: '/trades',
      name: 'trades',
      component: () => import('../pages/TradesPage.vue'),
    },
    {
      path: '/trades/new',
      name: 'new-trade',
      component: () => import('../pages/NewTradePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/trade-details',
      name: 'trade-details',
      component: () => import('../pages/TradeDetails.vue'),
      beforeEnter: (to, from, next) => {
        const selectedTradeStore = useSelectedTradeStore()
        if (selectedTradeStore.selectedTrade) {
          next()
          return
        }
        next({ name: 'trades' })
      }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const isAuthRoute = to.meta.requiresAuth
  const uiStore = useUiStore()

  if (isAuthRoute && !token) {
    uiStore.openLogin()
    next({ name: 'home' })
    return
  }

  if (isAuthRoute && token) {
    next()
    return
  }

  next()
})

export default router
