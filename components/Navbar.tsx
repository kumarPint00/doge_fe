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
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import {
  connectWallet,
  formatAddress,
  MetaMaskProvider,
} from '@/lib/wallet';
import EscrowContext from '@/context/EscrowContext';

import WalletWidget from './WalletWidget';
import Image from 'next/image';

/* ------------------------------------------------------------ */

export default function NavbarV2() {
  const router = useRouter();

  /* toast for wallet errors */
  const [err, setErr] = useState<string | null>(null);
  const [state, dispatch]  = useContext(EscrowContext)!;

  /* ---------------------------------------------------------- */
  /* navigation helper                                          */
  /* ---------------------------------------------------------- */
  const handleNavigate = (href: string) => {
    if (href.startsWith('#')) {
      // same-page anchor – smooth scroll
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // page navigation
      router.push(href);
    }
  };

  /* ---------------------------------------------------------- */
  /* render                                                     */
  /* ---------------------------------------------------------- */
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
            <Box
              component="a"
              href="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
            <Image
              src="/logo.svg"
              alt="DogeGiFty Logo"
              width={100}
              height={100}
              style={{ borderRadius: '50%' }}
            />

                        </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* nav pills */}
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {[
                { label: 'How It Works', href: '/how' },
                { label: 'Why DogeGF',   href: '/why' },
                { label: 'Learn',        href: '/learn' },
              ].map((l) => (
                <Button
                  key={l.label}
                  size="small"
                  onClick={() => handleNavigate(l.href)}
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
              ))}
            </Stack>

            {/* wallet */}
            <WalletWidget />
          </Toolbar>
        </Container>
      </AppBar>

      {/* error toast */}
      <Snackbar open={!!err} autoHideDuration={3000} onClose={() => setErr(null)}>
        <Alert severity="error" variant="filled" onClose={() => setErr(null)}>
          {err}
        </Alert>
      </Snackbar>
    </>
  );
}
