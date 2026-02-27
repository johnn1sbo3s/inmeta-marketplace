<script setup lang="ts">
import { ref } from 'vue'
import type { Card } from '@/types'
import Button from '@/components/ui/BaseButton.vue'
import { useAddCardsMutation } from '@/composables/useCards'

const props = defineProps<{
  card: Card
  modalView?: boolean
  hideAddButton?: boolean
  inMyCards?: boolean
  selectable?: boolean
  selected?: boolean
}>()

const emit = defineEmits(['open-modal', 'add-to-deck', 'select-card'])

const {
  mutate: addCardsToMeMutation,
  isPending: addCardsToMeIsPending
} = useAddCardsMutation()

const selected = ref(props.selected || false)

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
    class="relative flex flex-col h-full"
    :class="[
      modalView ? 'cursor-default' : 'cursor-pointer',
      selected ? 'outline-2 outline-primary-400/40' : ''
    ]"
    @click="handleOpenModal"
  >
    <UCheckbox
      v-model="selected"
      size="lg"
      class="absolute top-1 right-1"
      @change="emit('select-card', { card, selected })"
    />

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

      <template v-if="!modalView && !hideAddButton">
        <Button
          v-if="!inMyCards"
          variant="outline"
          color="primary"
          class="mt-auto"
          :loading="addCardsToMeIsPending"
          block
          @click.stop="addCardToDeck(card.id)"
        >
          Adicionar ao deck
        </Button>

        <div
          v-else
          class="flex items-center justify-center gap-1 text-sm font-semibold py-2 text-primary"
        >
          Adicionado ao deck

          <Icon
            icon="lucide:check"
            height="18"
            width="18"
          />
        </div>
      </template>
    </div>
  </UCard>
</template>