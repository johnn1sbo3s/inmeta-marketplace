<script setup lang="ts">
import type { Card } from '@/types';
import { ref, computed } from 'vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue';
import { useMyCards } from '@/composables/useCards';
import CollectibleCard from '@/components/ui/CollectibleCard.vue';
import BaseModal from '@/components/ui/BaseModal.vue';

const searchString = ref('')
const openCardModal = ref(false)
const selectedCard = ref<Card | null>(null)

const { data: cardsData, isLoading: cardsIsLoading } = useMyCards()

const filteredCards = computed(() => {
  if (!cardsData.value) return []

  if (!searchString.value) return cardsData.value

  return cardsData.value.filter(card => card.name.toLowerCase().includes(searchString.value.toLowerCase()))
})

function handleCardClick(card: Card) {
  selectedCard.value = card
  openCardModal.value = true
}
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4 pb-8">
      <PageHeader
        title="Minhas cartas"
        description="Visualize e gerencie as suas cartas"
      />

      <div class="bg-white p-5 border border-neutral-100 rounded-xl flex flex-col gap-5">
        <div class="flex items-center justify-between gap-2">
          <UInput
            v-model="searchString"
            placeholder="Buscar carta..."
            class="w-full sm:w-1/2 lg:w-1/3"
          />

          <BaseButton
            icon="i-lucide-plus"
            to="/cards"
            label="Adicionar"
          />
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <template v-if="cardsIsLoading">
            <USkeleton
              v-for="n in 10"
              :key="n"
              class="h-[350px] w-full bg-slate-200"
            />
          </template>

          <template v-else-if="filteredCards.length === 0">
            <UEmpty
              title="Nenhuma carta encontrada"
              description="Não foi possível encontrar nenhuma carta."
              class="col-span-5"
            />
          </template>

          <template v-else>
            <CollectibleCard
              v-for="card in filteredCards"
              :key="card.id"
              :card="card"
              hide-add-button
              @open-modal="handleCardClick"
            />

            <BaseModal v-model:open="openCardModal">
              <CollectibleCard
                v-if="selectedCard"
                :card="selectedCard"
                modal-view
              />
            </BaseModal>
          </template>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>