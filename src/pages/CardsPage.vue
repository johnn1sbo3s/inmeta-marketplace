<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import Button from '@/components/ui/BaseButton.vue'
import { useInfiniteCards, useMyCards } from '@/composables/useCards'
import type { Card } from '@/types'
import BaseModal from '@/components/ui/BaseModal.vue'
import CollectibleCard from '@/components/ui/CollectibleCard.vue'
import type { BreadcrumbItem } from '@nuxt/ui'

const breadcrumbItems = ref<BreadcrumbItem[]>([
  {
    label: 'Minhas cartas',
    to: '/my-cards'
  },
  {
    label: 'Cartas',
    to: '/cards'
  }
])

const rpp = ref(10)
const cardModalOpen = ref(false)
const selectedCard = ref<Card | null>(null)

const {
  data: cardsData,
  isLoading: cardsIsLoading,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage
} = useInfiniteCards(rpp)

const {
  data: myCardsData,
  isLoading: myCardsIsLoading
} = useMyCards()

const items = computed(() => {
  return cardsData.value?.pages.flatMap(page => page.list) || []
})

const computedCardsLoading = computed(() => {
  return cardsIsLoading.value && !cardsData.value
})

function handleCardClick(card: Card) {
  selectedCard.value = card
  cardModalOpen.value = true
}

function isCardInMyCards(card: Card) {
  return myCardsData.value?.some(myCard => myCard.id === card.id) || false
}
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4 pb-8">
      <UBreadcrumb
        :items="breadcrumbItems"
        class="my-2"
      />

      <PageHeader
        title="Cartas"
        description="Visualize todas as cartas cadastradas e adicione-as ao seu deck"
      />

      <div class="bg-white p-5 border border-neutral-100 rounded-xl flex flex-col gap-5">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <template v-if="computedCardsLoading || myCardsIsLoading">
            <USkeleton
              v-for="n in 10"
              :key="n"
              class="h-[350px] w-full bg-slate-200"
            />
          </template>

          <template v-else-if="items.length === 0">
            <UEmpty
              title="Nenhuma carta encontrada"
              description="Você ainda não adicionou nenhuma carta. Adicione uma para começar."
              class="col-span-5"
            />
          </template>

          <template v-else>
            <CollectibleCard
              v-for="card in items"
              :key="card.id"
              :card="card"
              :in-my-cards="isCardInMyCards(card)"
              @open-modal="handleCardClick"
            />
          </template>
        </div>

        <div
          v-if="hasNextPage"
          class="flex justify-center mt-4"
        >
          <Button
            variant="soft"
            color="primary"
            size="lg"
            :loading="isFetchingNextPage"
            @click="fetchNextPage()"
          >
            Carregar mais
          </Button>
        </div>
      </div>

      <BaseModal
        v-model:open="cardModalOpen"
        class="w-[400px]"
      >
        <CollectibleCard
          v-if="selectedCard"
          :card="selectedCard"
          :loading="isFetchingNextPage"
          modal-view
        />
      </BaseModal>
    </div>
  </BaseLayout>
</template>