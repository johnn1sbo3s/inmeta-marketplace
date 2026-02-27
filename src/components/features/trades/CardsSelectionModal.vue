<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import CollectibleCard from '@/components/ui/CollectibleCard.vue';
import { useMyCards, useInfiniteCards } from '@/composables/useCards'
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import type { Card } from '@/types';

const model = defineModel<boolean>('open', { default: false })

const props = defineProps<{
  cards: Card[];
  type: 'offer' | 'receive'
}>();

const emit = defineEmits(['save'])

const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteCards(15)
const { data: myCards } = useMyCards()

const internalCards = ref<Card[]>([...props.cards])

const items = computed(() => {
  if (props.type === 'offer') {
    return myCards.value || []
  }

  return data.value?.pages.flatMap((page) => page.list) || []
})

watch(model, (isOpen) => {
  if (isOpen) {
    internalCards.value = [...props.cards]
  }
})

function handleSelectCard(item: { card: Card, selected: boolean }) {
  if (item.selected) {
    internalCards.value.push(item.card)
    return
  }

  internalCards.value = internalCards.value.filter((card: Card) => card.id !== item.card.id)
}

function handleSaveClick() {
  emit('save', internalCards.value)
  model.value = false
}
</script>

<template>
  <BaseModal
    v-model:open="model"
    class="w-[90%] md:w-[700px]"
    :ui="{
      overlay: 'bg-black/60 z-30',
      content: 'p-6 rounded-2xl z-30 max-w-none'
    }"
  >
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between mt-3 mb-1">
        <h1 class="text-lg font-semibold">
          Selecionar cartas
        </h1>

        <BaseButton
          label="Confirmar"
          @click="handleSaveClick"
        />
      </div>

      <div class="max-h-[600px] overflow-y-auto p-1">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <CollectibleCard
            v-for="card in items"
            :key="card.id"
            :card="card"
            :selected="internalCards.some((c: Card) => c.id === card.id)"
            hide-add-button
            @select-card="handleSelectCard"
          />
        </div>

        <div
          v-if="hasNextPage && props.type === 'receive'"
          class="flex justify-center mt-4"
        >
          <BaseButton
            variant="soft"
            color="primary"
            size="lg"
            :loading="isFetchingNextPage"
            @click="fetchNextPage()"
          >
            Carregar mais
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>