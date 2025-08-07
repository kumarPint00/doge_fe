import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';

export function useSupportedTokens() {
  return useQuery({
    queryKey: ['supported-tokens'],
    queryFn: () => apiService.getSupportedTokens(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useTokenPrice(tokenAddress?: string) {
  return useQuery({
    queryKey: ['token-price', tokenAddress],
    queryFn: () => apiService.getTokenPrice(tokenAddress!),
    enabled: !!tokenAddress,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useUserNFTs(address?: string) {
  return useQuery({
    queryKey: ['user-nfts', address],
    queryFn: () => apiService.getUserNFTs(address!),
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTokenValidation(tokenAddress?: string) {
  return useQuery({
    queryKey: ['token-validation', tokenAddress],
    queryFn: () => apiService.validateToken(tokenAddress!),
    enabled: !!tokenAddress,
  });
}