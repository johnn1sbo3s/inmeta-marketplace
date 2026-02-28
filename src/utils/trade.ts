import type { Card, CreateTradePayload } from '@/types'

export function buildCreateTradePayload(offerCards: Card[], receiveCards: Card[]): CreateTradePayload {
  return {
    cards: [
      ...offerCards.map(card => ({ cardId: card.id, type: 'OFFERING' as const })),
      ...receiveCards.map(card => ({ cardId: card.id, type: 'RECEIVING' as const }))
    ]
  }
}
