import { CardsService } from '@/services/cards.service'
import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'
import { toValue } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'

export const useCards = () => {
  const authStore = useAuthStore()

  return useQuery({
    queryKey: ['my-cards'],
    queryFn: () => CardsService.getMyCards(),
    enabled: authStore.isAuthenticated
  })
}

export const useInfiniteCards = (rpp: MaybeRef<number>) => {
  return useInfiniteQuery({
    queryKey: ['all-cards', rpp],
    queryFn: ({ pageParam }) => CardsService.getAll(pageParam, toValue(rpp)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.more ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  })
}

export function useAddCardsMutation() {
  const queryClient = useQueryClient()
  const toastStore = useToastStore()

  return useMutation({
    mutationFn: (cardIds: string[]) => CardsService.addCardsToMe(cardIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cards'] })

      toastStore.showToast({
        title: 'Sucesso',
        description: 'Carta adicionada com sucesso!',
        color: 'success',
        icon: 'i-lucide-circle-check'
      })
    }
  })
}