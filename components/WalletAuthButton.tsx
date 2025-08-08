'use client';

import { Button, CircularProgress, Alert, Box } from '@mui/material';
import { useState } from 'react';
import { useWalletNonce, useSiweAuth, useAuthSession, useLogout } from '@/hooks/useAuth';

interface WalletAuthButtonProps {
  walletAddress?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export default function WalletAuthButton({ 
  walletAddress, 
  onConnect, 
  onDisconnect 
}: WalletAuthButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useAuthSession();
  const getNonce = useWalletNonce();
  const siweAuth = useSiweAuth();
  const logout = useLogout();

  const handleConnect = async () => {
    if (!walletAddress) {
      onConnect?.();
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const nonceResponse = await getNonce.mutateAsync();
      const message = nonceResponse.message;
      const signature = 'placeholder_signature';
      await siweAuth.mutateAsync({ message, signature });
      
    } catch (err) {
      setError('Failed to authenticate wallet');
      console.error('Auth error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await logout.mutateAsync();
    onDisconnect?.();
  };

  if (session?.isConnected) {
    return (
      <Box>
        <Button 
          variant="outlined" 
          onClick={handleDisconnect}
          disabled={logout.isPending}
        >
          {logout.isPending ? <CircularProgress size={20} /> : 'Disconnect'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
      </Box>
    );
  }

  return (
    <Box>
      <Button 
        variant="contained" 
        onClick={handleConnect}
        disabled={isConnecting}
      >
        {isConnecting ? <CircularProgress size={20} /> : 'Connect Wallet'}
      </Button>
      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
    </Box>
  );
}