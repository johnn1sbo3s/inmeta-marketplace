import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { useUiStore } from '@/stores/ui'
import { useSelectedTradeStore } from '@/stores/selected-trade'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => defineAsyncComponent(() => import('../pages/HomePage.vue'))
    },
    {
      path: '/my-cards',
      name: 'my-cards',
      component: () => defineAsyncComponent(() => import('../pages/MyCardsPage.vue')),
      meta: { requiresAuth: true }
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => defineAsyncComponent(() => import('../pages/CardsPage.vue')),
      meta: { requiresAuth: true }
    },
    {
      path: '/trades',
      name: 'trades',
      component: () => defineAsyncComponent(() => import('../pages/TradesPage.vue')),
    },
    {
      path: '/trades/new',
      name: 'new-trade',
      component: () => defineAsyncComponent(() => import('../pages/NewTradePage.vue')),
      meta: { requiresAuth: true }
    },
    {
      path: '/trade-details',
      name: 'trade-details',
      component: () => defineAsyncComponent(() => import('../pages/TradeDetails.vue')),
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
