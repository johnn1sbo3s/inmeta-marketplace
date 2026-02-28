import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import type { Trade } from '@/types'

import { useSelectedTradeStore } from '../../stores/selected-trade'

describe('Selected Trade Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with null selectedTrade', () => {
    const store = useSelectedTradeStore()
    expect(store.selectedTrade).toBeNull()
  })

  it('sets the selected trade', () => {
    const store = useSelectedTradeStore()
    const mockTrade: Trade = {
      id: '1',
      createdAt: '2023-01-01',
      tradeCards: [],
      userId: 'u1',
      user: {
        name: 'User 1'
      }
    }

    store.setTrade(mockTrade)

    expect(store.selectedTrade).toEqual(mockTrade)
  })

  it('clears the selected trade', () => {
    const store = useSelectedTradeStore()
    const mockTrade: Trade = {
      id: '1',
      createdAt: '2023-01-01',
      tradeCards: [],
      userId: 'u1',
      user: {
        name: 'User 1'
      }
    }

    store.setTrade(mockTrade)
    store.clearTrade()

    expect(store.selectedTrade).toBeNull()
  })
})
