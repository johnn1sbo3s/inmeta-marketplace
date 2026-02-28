import { defineStore } from "pinia";
import type { Trade } from "@/types";
import { ref } from "vue";

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