'use client';
import useWalletData from '@/lib/hooks/useWalletData';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

/**
 * Renders:
 *  – Connect Wallet button   (when disconnected)
 *  – 0.0123 ETH  | 0xAbc…789 address  (when connected)
 */
export default function WalletWidget() {
 const { connect, connected, address, ethBal } = useWalletData(); // <- inside hook, call useWallet()

  /* still fetching ETH balance after connect */
  if (connected && ethBal === undefined) {
    return <CircularProgress size={22} sx={{ mx: 2 }} />;
  }

  /* not yet connected */
  if (!connected) {
    return (
      <Button
        variant="contained"
        size="small"
        onClick={connect}
        sx={{
          bgcolor: '#0B7EFF',
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 999,
          px: 3,
          '&:hover': { bgcolor: '#0068ff' },
        }}
      >
        Connect Wallet
      </Button>
    );
  }

  /* connected – show balance + address */
  return (
    <Box textAlign="right" fontSize={13} lineHeight={1.2}>
      <Typography fontWeight={700}>
        {ethBal!.toFixed(4)} ETH
      </Typography>
      <Typography color="text.secondary"  sx={{
          bgcolor: '#0B7EFF',
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 999,
          px: 3,
          '&:hover': { bgcolor: '#0068ff' },
        }}>
        {address.slice(0, 6)}…{address.slice(-4)}
      </Typography>
    </Box>
  );
}
