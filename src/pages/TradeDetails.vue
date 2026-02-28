<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseLayout from '@/components/layout/BaseLayout.vue';
import { useSelectedTradeStore } from '@/stores/selected-trade';
import TradeDetailsCards from '@/components/features/trades/TradeDetailsCards.vue';
import type { Card } from '@/types';
import BaseModal from '@/components/ui/BaseModal.vue';
import CollectibleCard from '@/components/ui/CollectibleCard.vue';

const selectedTradeStore = useSelectedTradeStore()

const breadcrumbItems = [
  {
    label: 'Trocas',
    to: '/trades',
  },
  {
    label: 'Detalhes da proposta',
    to: '/trades/:id',
  },
]

const openCardModal = ref(false)
const selectedCard = ref<Card | null>(null)

const trade = computed(() => selectedTradeStore.selectedTrade)

const formattedDate = computed(() => {
  if (!trade.value) return ''
  return new Date(trade.value.createdAt).toLocaleDateString('pt-BR')
})

const cardsOffered = computed(() => {
  return trade.value?.tradeCards.filter((item) => {
    return item.type.toLowerCase() === 'offering'
  }) ?? []
})

const cardsRequested = computed(() => {
  return trade.value?.tradeCards.filter((item) => {
    return item.type.toLowerCase() === 'receiving'
  }) ?? []
})

function handleCardClick(card: Card) {
  selectedCard.value = card
  openCardModal.value = true
}
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4">
      <UBreadcrumb :items="breadcrumbItems" />

      <div class="bg-white p-5 flex flex-col gap-4">
        <div class="flex flex-col text-black/80">
          <span><strong>Usuário:</strong> {{ trade?.user.name }}</span>

          <span><strong>Data:</strong> {{ formattedDate }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TradeDetailsCards
            :cards="cardsOffered"
            type="offer"
            title="Oferecendo"
            @card-click="handleCardClick"
          />

          <TradeDetailsCards
            :cards="cardsRequested"
            type="receive"
            title="Pedindo"
            @card-click="handleCardClick"
          />
        </div>
      </div>

      <BaseModal
        v-model:open="openCardModal"
        class="w-full sm:w-[400px]"
        scrollable
      >
        <CollectibleCard
          v-if="selectedCard"
          :card="selectedCard"
          modal-view
        />
      </BaseModal>
    </div>
  </BaseLayout>
</template>