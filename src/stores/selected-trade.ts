import { defineStore } from "pinia";
import { ref } from "vue";

import type { Trade } from "@/types";

export const useSelectedTradeStore = defineStore('selected-trade', () => {
  const selectedTrade = ref<Trade | null>(null)

  function setTrade(trade: Trade) {
    selectedTrade.value = trade
  }

  function clearTrade() {
    selectedTrade.value = null
  }

  return {
    selectedTrade,
    setTrade,
    clearTrade
  }
})