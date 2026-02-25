import { useQuery } from "@tanstack/vue-query";
import { TradesService } from "@/services/trades.service";

export const useTrades = (page: number, rpp: number) => {
  return useQuery({
    queryKey: ['trades', page, rpp],
    queryFn: () => TradesService.getAll(page, rpp),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  })
}