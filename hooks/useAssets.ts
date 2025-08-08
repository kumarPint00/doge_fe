import { useQuery } from '@tanstack/react-query';
import { apiService, ERC20Balance, NFTAsset, AllowedToken } from '@/lib/api';

export function useERC20Balances(walletAddress?: string) {
  return useQuery({
    queryKey: ['erc20-balances', walletAddress],
    queryFn: () => apiService.getERC20Balances(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
  });
}

export function useUserNFTs(walletAddress?: string) {
  return useQuery({
    queryKey: ['user-nfts', walletAddress],
    queryFn: () => apiService.getNFTsOwned(walletAddress!),
    enabled: !!walletAddress,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useSupportedTokens() {
  return useQuery({
    queryKey: ['supported-tokens'],
    queryFn: () => apiService.getSupportedTokens(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}