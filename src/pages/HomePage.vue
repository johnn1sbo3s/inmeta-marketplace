<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import TradeCard from '@/components/features/home/TradeCard.vue'
import { useTrades } from '@/composables/useTrades'
import BaseButton from '@/components/ui/BaseButton.vue'

const page = ref(1)
const rpp = ref(4)

const { data: tradesData, isLoading: tradesIsLoading} = useTrades(page.value, rpp.value)

const computedTradesList = computed(() => {
  return tradesData.value?.list || []
})

const computedTradesLoading = computed(() => {
  return tradesIsLoading.value || !tradesData.value
})

</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-5 items-center justify-center">
      <div class="flex flex-col items-center gap-3 h-full w-full sm:w-2/3 text-center mt-7 mb-3">
        <h1 class="text-4xl sm:text-5xl font-bold">
          Encontre novas cartas incríveis para sua coleção
        </h1>

        <span class="text-muted text-base sm:text-lg">
          Que tal dar uma olhada nas propostas disponíveis?
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full justify-center">
        <template v-if="computedTradesLoading">
          <USkeleton
            v-for="n in 6"
            :key="n"
            class="h-[170px] w-full bg-slate-200"
          />
        </template>

        <TradeCard
          v-for="item in computedTradesList"
          v-else
          :key="item.id"
          :item="item"
        />
      </div>

      <BaseButton
        label="Ver todas as propostas"
        to="/trades"
        color="primary"
        size="lg"
        class="mt-2"
      />
    </div>
  </BaseLayout>
</template>