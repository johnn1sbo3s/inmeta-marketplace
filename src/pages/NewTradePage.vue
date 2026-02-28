<script setup lang="ts">
import { computed,ref } from 'vue';

import CardSelectionSection from '@/components/features/trades/CardSelectionSection.vue';
import CardsSelectionModal from '@/components/features/trades/CardsSelectionModal.vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { useCreateTrade } from '@/composables/useTrades';
import type { Card, CreateTradePayload } from '@/types';

const openSelectCardsModal = ref(false);
const selectedTradeType = ref<'offer' | 'receive'>('offer');
const tradeCards = ref<{
  offer: Card[],
  receive: Card[]
}>({
  offer: [],
  receive: []
})

const breadcrumbItems = [
  {
    label: 'Trocas',
    to: '/trades',
  },
  {
    label: 'Nova troca',
    to: '/trades/new',
  },
]

const canCreateTrade = computed(() => {
  return tradeCards.value.offer.length > 0 && tradeCards.value.receive.length > 0
})

const createTradeMutation = useCreateTrade()

function handleOpenSelectCardsModal(type: 'offer' | 'receive') {
  openSelectCardsModal.value = true
  selectedTradeType.value = type
}

function handleSaveCards(cards: Card[]) {
  tradeCards.value[selectedTradeType.value] = cards
}

function removeCardFromList(cardId: string, list: 'offer' | 'receive') {
  tradeCards.value[list] = tradeCards.value[list].filter((card: Card) => card.id !== cardId)
}

function onSubmit() {
  const payload: CreateTradePayload = {
    cards: [
      ...tradeCards.value.offer.map(card => ({ cardId: card.id, type: 'OFFERING' as const })),
      ...tradeCards.value.receive.map(card => ({ cardId: card.id, type: 'RECEIVING' as const }))
    ]
  }

  createTradeMutation.mutate(payload)
}
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4">
      <UBreadcrumb
        :items="breadcrumbItems"
        class="my-2"
      />

      <PageHeader
        title="Nova troca"
        description="Adicione as cartas que deseja trocar"
      >
        <template #right>
          <BaseButton
            label="Criar proposta"
            size="lg"
            :disabled="!canCreateTrade"
            @click="onSubmit"
          />
        </template>
      </PageHeader>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardSelectionSection
          :cards="tradeCards.offer"
          type="offer"
          @open-select-cards-modal="handleOpenSelectCardsModal"
          @remove-card-from-list="removeCardFromList"
        />

        <CardSelectionSection
          :cards="tradeCards.receive"
          type="receive"
          @open-select-cards-modal="handleOpenSelectCardsModal"
          @remove-card-from-list="removeCardFromList"
        />
      </div>

      <CardsSelectionModal
        v-model:open="openSelectCardsModal"
        :cards="tradeCards[selectedTradeType]"
        :type="selectedTradeType"
        @save="handleSaveCards"
      />
    </div>
  </BaseLayout>
</template>