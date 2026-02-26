import { useInfiniteQuery } from "@tanstack/vue-query";
import { TradesService } from "@/services/trades.service";
import type { MaybeRef } from "vue";
import { toValue } from "vue";

export const useInfiniteTrades = (rpp: MaybeRef<number>) => {
  return useInfiniteQuery({
    queryKey: ['trades', 'infinite', rpp],
    queryFn: ({ pageParam }) => TradesService.getAll(pageParam, toValue(rpp)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.more) {
        return lastPage.page + 1
      }
      return undefined
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  })
}
