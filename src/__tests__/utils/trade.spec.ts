import { describe, expect, it } from 'vitest'

import type { Card } from '@/types'

import { buildCreateTradePayload } from '../../utils/trade'

describe('trade utils: buildCreateTradePayload', () => {
  it('maps offer and receive cards to the payload format', () => {
    const offerCards: Card[] = [
      {
        id: 'card-1',
        name: 'Card 1',
        description: 'Desc 1',
        imageUrl: 'url1',
        createdAt: '2023-01-01'
      }
    ]
    const receiveCards: Card[] = [
      {
        id: 'card-2',
        name: 'Card 2',
        description: 'Desc 2',
        imageUrl: 'url2',
        createdAt: '2023-01-01'
      },
      {
        id: 'card-3',
        name: 'Card 3',
        description: 'Desc 3',
        imageUrl: 'url3',
        createdAt: '2023-01-01'
      }
    ]

    const payload = buildCreateTradePayload(offerCards, receiveCards)

    expect(payload).toEqual({
      cards: [
        { cardId: 'card-1', type: 'OFFERING' },
        { cardId: 'card-2', type: 'RECEIVING' },
        { cardId: 'card-3', type: 'RECEIVING' }
      ]
    })
  })

  it('handles empty arrays properly', () => {
    const payload = buildCreateTradePayload([], [])
    expect(payload).toEqual({ cards: [] })
  })
})
