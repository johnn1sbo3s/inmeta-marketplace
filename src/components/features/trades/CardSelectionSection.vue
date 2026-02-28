<script setup lang="ts">
import { computed } from 'vue';

import BaseButton from '@/components/ui/BaseButton.vue';
import type { Card } from '@/types';

const props = defineProps<{
  cards: Card[]
  type: 'offer' | 'receive'
}>()

const emit = defineEmits(['open-select-cards-modal', 'remove-card-from-list'])

const title = computed(() => {
  return props.type === 'offer' ? 'Cartas a oferecer' : 'Cartas a receber'
})
</script>

<template>
  <div class="flex flex-col gap-3 bg-white border border-neutral-100 rounded-xl p-5">
    <div class="flex items-center justify-between">
      <h1 class="font-semibold">
        {{ title }}
      </h1>

      <BaseButton
        label="Selecionar"
        variant="soft"
        @click="emit('open-select-cards-modal', props.type)"
      />
    </div>

    <template v-if="!cards.length">
      <div class="flex items-center justify-center h-full">
        <p class="text-sm text-neutral-400 text-center italic py-4">
          Nenhuma carta selecionada
        </p>
      </div>
    </template>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
    >
      <UCard
        v-for="card in cards"
        :key="card.id"
        :ui="{ body: 'p-3 lg:p-3'}"
      >
        <div class="flex flex-col gap-4 items-center">
          <img
            :src="card.imageUrl"
            :alt="card.name"
            class="h-48 w-max object-cover"
          >

          <BaseButton
            variant="soft"
            color="error"
            label="Remover"
            block
            @click="emit('remove-card-from-list', card.id, props.type)"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>