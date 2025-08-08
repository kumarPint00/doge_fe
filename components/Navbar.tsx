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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
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

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [err, setErr] = useState<string | null>(null);
  const [state, dispatch]  = useContext(EscrowContext)!;

  const handleNavigate = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(href);
    }
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const menuItems = [
    { label: 'How It Works', href: '/how' },
    { label: 'Why DogeGF',   href: '/why' },
    { label: 'Learn',        href: '/learn' },
  ];

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          background: 'radial-gradient(circle at 0% 0%, #f9dfb6 0%, rgba(249,223,182,0) 45%), #fff7fb',
          zIndex: 1200,
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
            }}
          >
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

            <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {menuItems.map((l) => (
                <Button
                  key={l.label}
                  size="small"
                  onClick={() => handleNavigate(l.href)}
                  sx={{
                    bgcolor: '#fbb6ce',
                    color: '#7c2d12',
                    px: 3,
                    py: 1,
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': { 
                      bgcolor: '#f9a8d4',
                    },
                  }}
                >
                  {l.label}
                </Button>
              ))}
            </Stack>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <WalletWidget />
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  minWidth: 'auto',
                  p: 1,
                  color: '#374151',
                }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </Box>
      
      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: '#fff7fb',
            background: 'radial-gradient(circle at 0% 0%, #f9dfb6 0%, rgba(249,223,182,0) 45%), #fff7fb',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Wallet Widget */}
          <Box sx={{ mb: 4 }}>
            <WalletWidget />
          </Box>

          {/* Menu Items */}
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate(item.href)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    bgcolor: '#fbb6ce',
                    color: '#7c2d12',
                    '&:hover': {
                      bgcolor: '#f9a8d4',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: 600,
                        fontSize: 16,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      <Snackbar open={!!err} autoHideDuration={3000} onClose={() => setErr(null)}>
        <Alert severity="error" variant="filled" onClose={() => setErr(null)}>
          {err}
        </Alert>
      </Snackbar>
    </>
  );
}
