<script setup lang="ts">
import { computed,ref } from 'vue'

import TradeDetailsCards from '@/components/features/trades/TradeDetailsCards.vue';
import BaseLayout from '@/components/layout/BaseLayout.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import CollectibleCard from '@/components/ui/CollectibleCard.vue';
import { useDeleteTrade } from '@/composables/useTrades';
import { useAuthStore } from '@/stores/auth';
import { useSelectedTradeStore } from '@/stores/selected-trade';
import type { Card } from '@/types';

const selectedTradeStore = useSelectedTradeStore()
const authStore = useAuthStore()
const deleteTradeMutation = useDeleteTrade()

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

const openDeleteModal = ref(false)
const tradeToDelete = ref<string | null>(null)
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

function handleDeleteClick() {
  tradeToDelete.value = trade.value?.id ?? null
  openDeleteModal.value = true
}

function handleCancelDelete() {
  tradeToDelete.value = null
  openDeleteModal.value = false
}

function handleDeleteTrade() {
  if (!tradeToDelete.value) return
  deleteTradeMutation.mutate(tradeToDelete.value)
  handleCancelDelete()
}
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4">
      <UBreadcrumb :items="breadcrumbItems" />

      <div class="bg-white p-5 flex flex-col gap-4">
        <div class="flex items-center justify-between gap-4">
          <div class="flex flex-col text-black/80">
            <span><strong>Usuário:</strong> {{ trade?.user.name }}</span>

            <span><strong>Data:</strong> {{ formattedDate }}</span>
          </div>

          <BaseButton
            v-if="trade?.userId === authStore.user?.id"
            color="error"
            label="Apagar"
            @click="handleDeleteClick"
          />
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

      <BaseModal
        v-model:open="openDeleteModal"
        class="w-full sm:w-[400px]"
        scrollable
      >
        <div class="flex flex-col gap-3">
          <h1 class="text-xl font-semibold">
            Deseja apagar esta proposta?
          </h1>

          <p>Ao apagar esta proposta, ela será removida da plataforma e ninguém poderá aceitá-la. Esta ação é irreversível.</p>

          <div class="flex justify-end gap-4 mt-3">
            <BaseButton
              color="neutral"
              variant="soft"
              label="Cancelar"
              block
              @click="handleCancelDelete"
            />

            <BaseButton
              color="error"
              label="Apagar"
              block
              @click="handleDeleteTrade"
            />
          </div>
        </div>
      </BaseModal>
    </div>
  </BaseLayout>
</template>