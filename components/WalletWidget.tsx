'use client';
import useWalletData from '@/lib/hooks/useWalletData';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';

/**
 * Renders:
 *  – Connect Wallet button   (when disconnected)
 *  – 0.0123 ETH  | 0xAbc…789 address  (when connected)
 */
export default function WalletWidget() {
  const { connect, connected, address, ethBal } = useWalletData();
  const [err, setErr] = useState<string | null>(null);

  if (connected && ethBal === undefined) {
    return <CircularProgress size={22} sx={{ mx: 2 }} />;
  }

  if (!connected) {
    return (
      <>
        <Button
          variant="contained"
          size="small"
          onClick={async () => {
            try {
              await connect();
            } catch (e: any) {
              setErr(e?.message || 'Failed to connect wallet');
            }
          }}
          sx={{
            bgcolor: '#2563eb',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 999,
            px: 3,
            py: 1,
            '&:hover': { bgcolor: '#1d4ed8' },
          }}
        >
          Connect Wallet
        </Button>
        {err && (
          <Box sx={{ fontSize: 12, color: 'error.main', mt: 1 }}>
            {err.includes('MetaMask not found')
              ? 'MetaMask not detected. On mobile, you’ll be redirected to open this page inside MetaMask.'
              : err}
          </Box>
        )}
      </>
    );
  }

  return (
    <Box textAlign="right" fontSize={13} lineHeight={1.2}>
      <Typography fontWeight={700}>{ethBal!.toFixed(4)} ETH</Typography>
      <Typography color="text.secondary">
        {address.slice(0, 6)}…{address.slice(-4)}
      </Typography>
    </Box>
  );
}
