import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
    refetchInterval: (data) => {
      // Stop polling if claim is completed or failed
      if (data?.status === 'completed' || data?.status === 'failed') {
        return false;
      }
      return 5000; // Poll every 5 seconds for pending/processing
    },
  });
}