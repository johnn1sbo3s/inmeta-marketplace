import { useQuery } from "@tanstack/vue-query";
import { TradesService } from "@/services/trades.service";
import type { MaybeRef } from "vue";
import { toValue } from "vue";

export const useTrades = (page: MaybeRef<number>, rpp: MaybeRef<number>) => {
  return useQuery({
    queryKey: ['trades', page, rpp],
    queryFn: () => TradesService.getAll(toValue(page), toValue(rpp)),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  })
}