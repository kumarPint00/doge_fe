'use client';
import {
  Container,
  Typography,
  Paper,
  Box,
  Stack,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Section from '@/components/Section';
export const dynamic = 'force-dynamic';   

export default function GiftReady() {
  /* ---------------------------------------------------------------- */
  /* grab ?code=XXXX from the URL                                     */
  /* ---------------------------------------------------------------- */
  const params = useSearchParams();
  const code   = params.get('code') ?? '???-????';
  const router = useRouter();

  /* toast state */
  const [copied, setCopied] = useState(false);

  /* copy */
  const copyLink = () => {
    const shareUrl = `${location.origin}/gift/claim?code=${code}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  };

  /* optional share */
  const share = async () => {
    const url = `${location.origin}/gift/claim?code=${code}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'DogeGiFty Pack',
          text: `Here’s your secret code: ${code}`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      }
    } catch {
      /* no-op */
    }
  };

  return (
    <>
    {/* <Suspense fallback={<div>Loading...</div>}> */}
      <Section>
      {/* gradient backdrop inside layout (nav + footer already there) */}
      <Container
        maxWidth="md"
        sx={{
          py: 10,
          textAlign: 'center',
          background:
            'radial-gradient(circle at 0 60%, #f9e3c3 0%, transparent 55%), radial-gradient(circle at 100% 0, #ffd6e8 0%, transparent 55%)',
        }}
      >
        {/* gift emoji / icon */}
        <Image
          src="/gift-icon.png"   
          alt="gift icon1"
          width={48}
          height={48}
          priority
          style={{ margin: '0 auto 16px' }}
        />

        {/* headline */}
        <Typography variant="h3" fontWeight={800} mb={1}>
          Your&nbsp;Gift&nbsp;Is&nbsp;Ready!
        </Typography>
        <Typography fontSize={15} color="text.secondary" mb={5}>
          You’ve just created an on-chain moment of kindness. Share the code
          below and make someone’s day.
        </Typography>

        {/* white card */}
        <Paper sx={{ p: { xs: 4, md: 6 }, borderRadius: 4 }}>
          <Typography fontWeight={700} mb={2}>
            Secret Code
          </Typography>

          <Box
            sx={{
              bgcolor: '#eeeeee',
              borderRadius: 1,
              px: 6,
              py: 2,
              mb: 2.5,
              fontWeight: 800,
              letterSpacing: 1,
              fontSize: 22,
              display: 'inline-block',
            }}
          >
            {code}
          </Box>

          {/* buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            mb={4}
          >
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon fontSize="small" />}
              onClick={copyLink}
              sx={{ textTransform: 'none', minWidth: 140, fontWeight: 700 }}
            >
              Copy&nbsp;Link
            </Button>

            <Button
              variant="outlined"
              startIcon={<ShareIcon fontSize="small" />}
              onClick={share}
              sx={{ textTransform: 'none', minWidth: 140, fontWeight: 700 }}
            >
              Share&nbsp;Link
            </Button>
          </Stack>

          <Typography fontSize={13} color="text.secondary" mb={4}>
            Note: Don’t post this publicly unless you want anyone to claim it!
          </Typography>

          {/* create another */}
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#0B7EFF',
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 999,
              px: 6,
              py: 1.25,
              '&:hover': { bgcolor: '#0068ff' },
            }}
            onClick={() => router.push('/gift/create')}
          >
            Create Another Gift
          </Button>
        </Paper>
      </Container>

      {/* toast */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
      >
        <Alert severity="success" variant="filled">
          Copied!
        </Alert>
      </Snackbar>
      </Section>
    {/* </Suspense> */}
    </>
  );
}
