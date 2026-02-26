<script setup lang="ts">
import { computed } from 'vue'
import type { TradeCard } from '@/types'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

const props = defineProps<{
  title: 'Oferecendo' | 'Recebendo'
  cards: TradeCard[]
}>()


const breakpoints = useBreakpoints(breakpointsTailwind)

const isMobile = computed(() => {
  return breakpoints.smallerOrEqual('sm').value
})

const moreCardsCount = computed(() => {
  return props.cards.length - 4
})
</script>

<template>
  <div class="relative flex gap-2 items-center w-full h-full">
    <div class="flex flex-col w-full overflow-hidden border border-neutral-100 rounded-xl h-full">
      <div
        class="bg-linear-60 text-xs text-white font-semibold px-3 py-2 flex items-center justify-between"
        :class="{
          'from-primary-500 to-primary-600': title === 'Oferecendo',
          'from-secondary-500 to-secondary-600': title === 'Recebendo'
        }"
      >
        <div class="flex gap-1 items-center">
          <span>{{ title }}</span>

          <Icon
            class="text-black/20"
            width="20"
            height="20"
            :icon="title === 'Oferecendo' ? 'lucide:chevrons-right' : 'lucide:chevrons-left'"
          />
        </div>

        <UBadge
          size="sm"
          :color="title === 'Oferecendo' ? 'primary' : 'secondary'"
        >
          {{ cards.length }} carta{{ cards.length > 1 ? 's' : '' }}
        </UBadge>
      </div>

      <div
        class="flex flex-col bg-neutral-50 p-3 h-full"
        :class="title === 'Oferecendo' ? 'bg-primary-50' : 'bg-secondary-50'"
      >
        <ul class="list-disc list-inside">
          <li
            v-for="tradeCard in cards.slice(0, 4)"
            :key="tradeCard.id"
            class="p-1 text-sm text-neutral-800"
          >
            {{ tradeCard.card.name }}
          </li>
        </ul>

        <div
          v-if="moreCardsCount > 0"
          class="p-1 text-sm w-full font-medium text-center italic mt-2"
          :class="title === 'Oferecendo' ? 'text-primary/60' : 'text-secondary/60'"
        >
          +{{ moreCardsCount }} carta{{ moreCardsCount > 1 ? 's' : '' }}
        </div>
      </div>
    </div>


    <div
      v-if="title === 'Oferecendo'"
      class="absolute text-muted p-2 bg-white border border-neutral-100 rounded-full shadow-sm z-10"
      :class="isMobile ? '-bottom-5 left-1/2 -translate-x-1/2' : '-right-5 top-1/2'"
    >
      <Icon
        width="14"
        height="14"
        :icon="isMobile ? 'lucide:arrow-up-down' : 'lucide:arrow-right-left'"
      />
    </div>
  </div>
</template>