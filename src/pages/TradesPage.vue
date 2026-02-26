<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseLayout from '@/components/layout/BaseLayout.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import Button from '@/components/ui/BaseButton.vue';
import { useInfiniteTrades } from '@/composables/useInfiniteTrades';

const rpp = ref(10)

const {
  data: tradesData,
  isLoading: tradesIsLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage
} = useInfiniteTrades(rpp)

const items = computed(() => {
  if (!tradesData.value) return []
  return tradesData.value.pages.flatMap(page => page.list)
})

const computedTradesLoading = computed(() => {
  return tradesIsLoading.value && !tradesData.value
})

</script>

<template>
  <BaseLayout>
    <div class="flex flex-col gap-4 pb-8">
      <PageHeader
        title="Trocas"
        description="Confira as propostas disponíveis"
      />

      <div class="bg-white p-5 border border-neutral-100 rounded-xl flex flex-col gap-4 items-center">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full justify-center">
          <template v-if="computedTradesLoading">
            <USkeleton
              v-for="item in 6"
              :key="item"
              class="h-[170px] w-full bg-slate-200"
            />
          </template>

          <TradeCard
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
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
    </div>
  </BaseLayout>
</template>