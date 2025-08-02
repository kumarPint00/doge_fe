'use client';
import {
  AppBar,
  Box,
  Button,
  Container,
  Snackbar,
  Alert,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useContext, useState } from 'react';
import {
  connectWallet,
  formatAddress,
  MetaMaskProvider,
} from '@/lib/wallet';
import EscrowContext from '@/context/EscrowContext';
import WalletWidget from './WalletWidget';
import BalanceFetcher from './BalanceWidget';

export default function NavbarV2() {
  /* ------------------------------------------------------------------ */
  /* local + global state                                               */
  /* ------------------------------------------------------------------ */
  const [addr, setAddr]   = useState('');
  const [busy, setBusy]   = useState(false);
  const [err,  setErr]    = useState<string | null>(null);

  const [/* state */, dispatch] = useContext(EscrowContext)!;

  /* ------------------------------------------------------------------ */
  /* Connect handler                                                    */
  /* ------------------------------------------------------------------ */
  const handleConnect = async () => {
    if (addr || busy) return; // already connected / busy
    setBusy(true);

    try {
      const { address, provider } = await connectWallet();
      setAddr(formatAddress(address));
      // propagate to global context for downstream hooks
      dispatch?.({ type: 'setProvider', provider } as any);
    } catch (e: any) {
      setErr(e.message ?? 'Wallet connection failed');
    } finally {
      setBusy(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'transparent', pt: 2 }}>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              bgcolor: '#fff',
              borderRadius: 999,
              px: { xs: 2.5, md: 4 },
              py: 1,
              columnGap: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,.06)',
            }}
          >
            {/* logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Box component="img" src="/logo.png" alt="logo" sx={{ width: 32, height: 32, mr: 1 }} />
              <Typography variant="h6" fontWeight={800} sx={{ color: '#0D1B3E' }}>
                DogeGiFty
              </Typography>
            </Link>

            {/* spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* nav pills */}
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {[
                { label: 'How It Works', href: '#how' },
                { label: 'Why DogeGF',   href: '#why' },
                { label: 'Learn',        href: '#learn' },
              ].map((l) => (
                <Link key={l.label} href={l.href} legacyBehavior passHref>
                  <Button
                    size="small"
                    sx={{
                      bgcolor: '#ffb3ba',
                      color: '#5d2619',
                      px: 2.5,
                      py: 0.75,
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#ffa2aa' },
                    }}
                  >
                    {l.label}
                  </Button>
                </Link>
              ))}
            </Stack>

            {/* wallet */}
           
            <WalletWidget />

          </Toolbar>
        </Container>
      </AppBar>

      {/* error toast */}
      <Snackbar
        open={!!err}
        autoHideDuration={3000}
        onClose={() => setErr(null)}
      >
        <Alert severity="error" variant="filled" onClose={() => setErr(null)}>
          {err}
        </Alert>
      </Snackbar>
    </>
  );
}
