<script setup lang="ts">
import CollectibleCard from '@/components/ui/CollectibleCard.vue';
import type { Card, TradeCard } from '@/types';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { computed } from 'vue';

defineProps<{
  cards: TradeCard[]
  type: 'offer' | 'receive'
  title: string
}>()

const emit = defineEmits(['card-click'])

const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = computed(() => {
  return breakpoints.smallerOrEqual('sm').value
})

function handleCardClick(card: Card) {
  emit('card-click', card)
}
</script>

<template>
  <div class="relative flex gap-2 items-center w-full h-full">
    <div
      class="flex flex-col w-full overflow-hidden border rounded-xl h-full"
      :class="type === 'offer' ? 'border-primary-200' : 'border-secondary-200'"
    >
      <div
        class="bg-linear-60 text-xs text-white font-semibold px-3 py-2 flex items-center justify-between"
        :class="{
          'from-primary-500 to-primary-600': type === 'offer',
          'from-secondary-500 to-secondary-600': type === 'receive'
        }"
      >
        <div class="flex gap-1 items-center">
          <span>{{ title }}</span>

          <Icon
            class="text-black/20"
            width="20"
            height="20"
            :icon="type === 'offer' ? 'lucide:chevrons-right' : 'lucide:chevrons-left'"
          />
        </div>

        <UBadge
          size="sm"
          :color="type === 'offer' ? 'primary' : 'secondary'"
        >
          {{ cards.length }} carta{{ cards.length > 1 ? 's' : '' }}
        </UBadge>
      </div>

      <div
        class="grid grid-cols-2 lg:grid-cols-3 gap-2 p-4 h-full content-start"
        :class="type === 'offer' ? 'bg-primary-50' : 'bg-secondary-50'"
      >
        <CollectibleCard
          v-for="card in cards"
          :key="card.id"
          :card="card.card"
          hide-add-button
          @open-modal="handleCardClick"
        />
      </div>
    </div>


    <div
      v-if="type === 'offer'"
      class="absolute text-muted p-2 bg-white border border-neutral-100 rounded-full shadow-sm z-10"
      :class="isMobile ? '-bottom-5 left-1/2 -translate-x-1/2' : '-right-5 top-1/2'"
    >
      <Icon
        width="16"
        height="16"
        :icon="isMobile ? 'lucide:arrow-up-down' : 'lucide:arrow-right-left'"
      />
    </div>
  </div>
</template>