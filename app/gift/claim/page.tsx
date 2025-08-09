'use client';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { claimPack } from '@/lib/escrow';      
import Image from 'next/image';
import Section from '@/components/Section';
import { useWallet } from '@/context/WalletContext';
import useWalletTokens from '@/lib/hooks/useWalletToken';
import useWalletNfts from '@/lib/hooks/useWalletNft';

export default function ClaimGiftPage() {
  const [code, setCode]   = useState('');
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const { provider, address, connect } = useWallet();
  const { tokens, loading: tokensLoading, error: tokensError } = useWalletTokens(provider, address);
  const { nfts, loading: nftsLoading, error: nftsError } = useWalletNfts(address);

  /* attempt claiming */
  const handleClaim = async () => {
    if (!code.trim()) return;
    const pack = await claimPack(code.trim());
    setToast(
      pack
        ? { msg: 'Gift claimed! 🎉', ok: true }
        : { msg: 'Invalid code, try again.', ok: false },
    );
  };

  return (
    <Section
      sx={{
        py: { xs: 8, md: 10 },
        background:
          'radial-gradient(circle at 0 20%, #fde7c3 0%, transparent 50%), radial-gradient(circle at 100% 60%, #ffd6e8 0%, transparent 55%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* LEFT: text + form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight={800} mb={2}>
              Your Gift Is Ready!
            </Typography>
            <Typography fontSize={15} color="text.secondary" mb={4} maxWidth={400}>
              A little code stands between you and your gift. Enter it to reveal the magic!
            </Typography>

            <TextField
              fullWidth
              placeholder="Enter Secret Code here…"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': { borderRadius: 3 },
              }}
            />

            <Button
              variant="contained"
              sx={{
                bgcolor: '#0B7EFF',
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 999,
                px: 5,
                py: 1.25,
                '&:hover': { bgcolor: '#0068ff' },
              }}
              disabled={!code.trim()}
              onClick={handleClaim}
            >
              Claim Gift
            </Button>
          </Grid>

          {/* RIGHT: doge image */}
          <Grid item xs={12} md={6} textAlign="center">
            <Image
              src="/dogeGift.svg"
              alt="doge in box"
              width={420}
              height={420}
              priority
              style={{ width: 'auto', maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>

        {/* Wallet assets */}
        <Box mt={8}>
          <Typography variant="h5" fontWeight={800} mb={3}>
            Your Wallet Assets
          </Typography>

          {!address ? (
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
              <Typography mb={2}>Connect your wallet to view your tokens and NFTs.</Typography>
              <Button variant="contained" onClick={connect} sx={{ textTransform: 'none', fontWeight: 700 }}>
                Connect Wallet
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {/* Tokens */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography fontWeight={700}>Tokens</Typography>
                    {tokensLoading && <CircularProgress size={18} />}
                  </Stack>

                  {tokensError && (
                    <Typography color="error.main" fontSize={13} mb={1}>
                      Failed to load tokens
                    </Typography>
                  )}

                  {(!tokensLoading && tokens.length === 0) ? (
                    <Typography fontSize={14} color="text.secondary">No tokens found.</Typography>
                  ) : (
                    <List dense disablePadding>
                      {tokens.map((t, i) => (
                        <>
                          <ListItem key={t.id} sx={{ py: 1 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: 'transparent' }}>
                                <Image
                                  src={t.image || '/gift-icon.png'}
                                  alt={t.symbol}
                                  width={28}
                                  height={28}
                                  style={{ width: 'auto', height: 'auto' }}
                                />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Typography fontWeight={700}>{t.symbol}</Typography>
                                  <Typography color="text.secondary" fontSize={13}>{t.name}</Typography>
                                </Stack>
                              }
                              secondary={
                                <Typography fontSize={13} color="text.secondary">
                                  {t.balance?.toFixed(6)} · ${t.usd.toFixed(2)}
                                </Typography>
                              }
                            />
                          </ListItem>
                          {i < tokens.length - 1 && <Divider component="li" />}
                        </>
                      ))}
                    </List>
                  )}
                </Paper>
              </Grid>

              {/* NFTs */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography fontWeight={700}>NFTs</Typography>
                    {nftsLoading && <CircularProgress size={18} />}
                  </Stack>

                  {nftsError && (
                    <Typography color="error.main" fontSize={13} mb={1}>
                      Failed to load NFTs
                    </Typography>
                  )}

                  {(!nftsLoading && nfts.length === 0) ? (
                    <Typography fontSize={14} color="text.secondary">No NFTs found.</Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {nfts.map((n: any) => (
                        <Grid item xs={4} sm={3} md={4} key={n.id}>
                          <Box sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: 'grey.100' }}>
                            <Image
                              src={n.image || '/gift-icon.png'}
                              alt={n.name}
                              width={180}
                              height={180}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </Box>
                          <Typography fontSize={12} mt={0.5} noWrap title={n.name}>{n.name}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>

      {/* toast */}
      {toast && (
        <Snackbar
          open={!!toast}
          autoHideDuration={2500}
          onClose={() => setToast(null)}
        >
          <Alert
            onClose={() => setToast(null)}
            severity={toast.ok ? 'success' : 'error'}
            variant="filled"
          >
            {toast.msg}
          </Alert>
        </Snackbar>
      )}
    </Section>
  );
}
