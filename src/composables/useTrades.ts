// useTrades.ts
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { TradesService } from "@/services/trades.service";
import type { MaybeRef } from "vue";
import { toValue } from "vue";

export const useTrades = (page: MaybeRef<number>, rpp: MaybeRef<number>) => {
  return useQuery({
    queryKey: ['trades', 'paginated', page, rpp],
    queryFn: () => TradesService.getAll(toValue(page), toValue(rpp)),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  });
};

export const useInfiniteTrades = (rpp: MaybeRef<number>) => {
  return useInfiniteQuery({
    queryKey: ['trades', 'infinite', rpp],
    queryFn: ({ pageParam }) => TradesService.getAll(pageParam, toValue(rpp)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.more ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  });
};