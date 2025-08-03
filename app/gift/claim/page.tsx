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
} from '@mui/material';
import { useState } from 'react';
import { claimPack } from '@/lib/escrow';      
import Image from 'next/image';
import Section from '@/components/Section';

export default function ClaimGiftPage() {
  const [code, setCode]   = useState('');
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

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
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
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
