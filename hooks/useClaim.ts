import { useMutation, useQuery, useQueryClient, Query } from '@tanstack/react-query';
import { apiService, ClaimRequest, ClaimStatus } from '@/lib/api';

export function useSubmitClaim() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (claimData: ClaimRequest) => apiService.submitClaim(claimData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['claim-status', variables.giftId] });
      queryClient.invalidateQueries({ queryKey: ['user-claimed-gifts'] });
    },
  });
}

export function useClaimStatus(giftId?: string) {
  return useQuery({
    queryKey: ['claim-status', giftId],
    queryFn: () => apiService.getClaimStatus(giftId!),
    enabled: !!giftId,
    refetchInterval: (query) => {
      const data = (query as unknown as Query<ClaimStatus>).state.data as ClaimStatus | undefined;
      const status = data?.status;
      if (status === 'completed' || status === 'failed') {
        return false;
      }
      return 5000;
    },
  });
}