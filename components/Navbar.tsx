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

export default function Navbar() {
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
      {/* Sticky navbar container that stays at top */}
      <Box
        component="nav"
        sx={{
          position: 'sticky', // Add sticky positioning
          top: 0, // Pin to top of viewport
          left: 0,
          right: 0,
          width: '100%',
          background: 'radial-gradient(circle at 0% 0%, #f9dfb6 0%, rgba(249,223,182,0) 45%), #fff7fb',
          zIndex: 1200, // Higher z-index to stay above everything
          px: { xs: 2, lg: 6 },
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              bgcolor: 'white',
              borderRadius: 999,
              px: { xs: 2, md: 3 },
              py: { xs: 2, md: 2 },
              border: '1px solid #E9E5DE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              // Removed conflicting position: sticky from toolbar
            }}
          >
            {/* logo */}
            <Box
              component="a"
              href="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 1 }}
            >
              <Image
                src="/logo.svg"
                alt="DogeGiFty Logo"
                width={148}
                height={48}
              />
            </Box>

            {/* Desktop nav pills - centered */}
            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
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
                    bgcolor: '#fbb6ce', // pink background like in image
                    color: '#7c2d12', // dark red/brown text
                    px: 3,
                    py: 1,
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { 
                      bgcolor: '#f9a8d4', // slightly darker pink on hover
                    },
                  }}
                >
                  {l.label}
                </Button>
              ))}
            </Stack>

            {/* Desktop wallet widget */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <WalletWidget />
            </Box>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Button
                sx={{
                  minWidth: 'auto',
                  p: 1,
                  color: '#374151',
                }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </Box>
      
      {/* error toast */}
      <Snackbar open={!!err} autoHideDuration={3000} onClose={() => setErr(null)}>
        <Alert severity="error" variant="filled" onClose={() => setErr(null)}>
          {err}
        </Alert>
      </Snackbar>
    </>
  );
}
