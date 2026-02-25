<script setup lang="ts">
import { computed } from 'vue'
import type { Trade } from '@/types'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps<{
  item: Trade
}>()

const formattedDate = computed(() => {
  return new Date(props.item.createdAt).toLocaleDateString('pt-BR')
})

const cardsOffered = computed(() => {
  return props.item.tradeCards.filter((item) => {
    return item.type.toLowerCase() === 'offering'
  })
})

const cardsRequested = computed(() => {
  return props.item.tradeCards.filter((item) => {
    return item.type.toLowerCase() === 'receiving'
  })
})

</script>

<template>
  <div>
    <div class="flex flex-col gap-3 bg-white border border-neutral-100 rounded-xl p-4 h-full">
      <div class="flex gap-2 items-center justify-between">
        <div class="flex flex-col">
          <span class="text-sm font-semibold">
            {{ item.user.name }}
          </span>

          <span class="text-xs text-muted">
            Postado em {{ formattedDate }}
          </span>
        </div>

        <BaseButton
          variant="ghost"
          size="sm"
          class="text-xs"
        >
          Ver detalhes
        </BaseButton>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        <TradeTypeSection
          title="Oferecendo"
          :cards="cardsOffered"
        />

        <TradeTypeSection
          title="Recebendo"
          :cards="cardsRequested"
        />
      </div>
    </div>
  </div>
</template>