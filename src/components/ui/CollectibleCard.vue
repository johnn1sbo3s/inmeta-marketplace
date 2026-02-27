<script setup lang="ts">
import type { Card } from '@/types'
import Button from '@/components/ui/BaseButton.vue'
import { useAddCardsMutation } from '@/composables/useCards'

const props = defineProps<{
  card: Card
  modalView?: boolean
  hideAddButton?: boolean
}>()

const emit = defineEmits(['open-modal', 'add-to-deck'])


const {
  mutate: addCardsToMeMutation,
  isPending: addCardsToMeIsPending
} = useAddCardsMutation()


function handleOpenModal() {
  if (props.modalView) return
  emit('open-modal', props.card)
}

function addCardToDeck(cardId: string) {
  addCardsToMeMutation([cardId])
}
</script>

<template>
  <UCard
    :ui="{ body: 'flex flex-col flex-1' }"
    class="flex flex-col h-full"
    :class="modalView ? 'cursor-default' : 'cursor-pointer'"
    @click="handleOpenModal"
  >
    <div class="flex flex-col justify-between gap-4 flex-1">
      <div class="flex flex-col gap-3">
        <div class="w-full h-auto overflow-hidden rounded-md shrink-0 bg-gray-100">
          <img
            :src="card.imageUrl"
            :alt="card.name"
            class="w-full h-full object-cover"
          >
        </div>

        <div class="flex flex-col">
          <p
            class="text-sm font-medium"
            :class="modalView ? 'line-clamp-none' : 'line-clamp-2'"
            :title="card.name"
          >
            {{ card.name }}
          </p>

          <p
            class="text-xs text-gray-500 text-left mt-1"
            :class="modalView ? 'line-clamp-none' : 'line-clamp-4'"
          >
            {{ card.description }}
          </p>
        </div>
      </div>

      <Button
        v-if="!modalView && !hideAddButton"
        variant="outline"
        color="primary"
        class="mt-auto"
        :loading="addCardsToMeIsPending"
        block
        @click.stop="addCardToDeck(card.id)"
      >
        Adicionar ao deck
      </Button>
    </div>
  </UCard>
</template>