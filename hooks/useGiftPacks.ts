import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  apiService, 
  GiftPack, 
  CreateGiftPackData, 
  UpdateGiftPackData, 
  AddItemToGiftPackData 
} from '@/lib/api';

export function useCreateGiftPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateGiftPackData) => apiService.createGiftPack(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-gift-packs'] });
    },
  });
}

export function useGiftPack(id?: string) {
  return useQuery({
    queryKey: ['gift-pack', id],
    queryFn: () => apiService.getGiftPack(id!),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useUpdateGiftPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGiftPackData }) =>
      apiService.updateGiftPack(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['gift-pack', id] });
      queryClient.invalidateQueries({ queryKey: ['user-gift-packs'] });
    },
  });
}

export function useDeleteGiftPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteGiftPack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-gift-packs'] });
    },
  });
}

export function useAddItemToGiftPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, item }: { id: string; item: AddItemToGiftPackData }) =>
      apiService.addItemToGiftPack(id, item),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['gift-pack', id] });
    },
  });
}

export function useRemoveItemFromGiftPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, itemId }: { id: string; itemId: string }) =>
      apiService.removeItemFromGiftPack(id, itemId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['gift-pack', id] });
    },
  });
}

export function useUserGiftPacks(address?: string) {
  return useQuery({
    queryKey: ['user-gift-packs', address],
    queryFn: () => apiService.getUserGiftPacks(address!),
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useUserClaimedGifts(address?: string) {
  return useQuery({
    queryKey: ['user-claimed-gifts', address],
    queryFn: () => apiService.getUserClaimedGifts(address!),
    enabled: !!address,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}