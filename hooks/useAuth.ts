import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService, WalletNonceResponse, SiweAuthResponse, WalletSession } from '@/lib/api';

export function useWalletAuth() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ signature, address }: { signature: string; address: string }) =>
      apiService.connectWallet(signature, address),
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}

export function useWalletVerification(address?: string) {
  return useQuery({
    queryKey: ['wallet-verification', address],
    queryFn: () => apiService.verifyWallet(address!),
    enabled: !!address,
  });
}

export function useWalletNonce() {
  return useMutation({
    mutationFn: () => apiService.requestWalletNonce(),
    onError: (error) => {
      console.error('Failed to get wallet nonce:', error);
    },
  });
}

export function useSiweAuth() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ message, signature }: { message: string; signature: string }) =>
      apiService.exchangeSiweSignature(message, signature),
    onSuccess: (data: SiweAuthResponse) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.invalidateQueries({ queryKey: ['auth-session'] });
    },
    onError: (error) => {
      console.error('SIWE authentication failed:', error);
    },
  });
}

export function useAuthSession() {
  return useQuery({
    queryKey: ['auth-session'],
    queryFn: () => apiService.getCurrentSession(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('auth_token');
      return { success: true };
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}