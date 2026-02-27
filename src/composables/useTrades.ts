// useTrades.ts
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { TradesService } from "@/services/trades.service";
import type { MaybeRef } from "vue";
import { toValue } from "vue";
import type { CreateTradePayload } from "@/types";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast";

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

export const useCreateTrade = () => {
  const queryClient = useQueryClient()
  const toastStore = useToastStore()
  const router = useRouter()

  return useMutation({
    mutationFn: (trade: CreateTradePayload) => TradesService.create(trade),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades', 'paginated'] })
      queryClient.invalidateQueries({ queryKey: ['trades', 'infinite'] })
      router.push('/trades')
      toastStore.showToast({
        title: 'Sucesso',
        description: 'Proposta de troca criada com sucesso!',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    }
  });
};
