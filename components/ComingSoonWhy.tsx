'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import LaunchIcon from '@mui/icons-material/Launch';

/* ——————————————————— shared snippets ——————————————————— */
const radialBg = {
  xs: 'radial-gradient(circle at 50% 0%, #ffe9ec 0%, #fbe8ef 35%, #f2d9e0 100%)',
  md: 'radial-gradient(circle at 50% 0%, #fdecec 0%, #f9dfe4 40%, #efd4de 100%)',
};

const heading = (size: { xs: string; md: string }) => ({
  fontWeight: 800,
  fontSize: size,
  lineHeight: 1.1,
});

const primaryBtn = {
  px: 5,
  py: 1.5,
  borderRadius: 6,
  fontWeight: 700,
};

export default function ComingSoonWhy() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        display: 'flex',
        justifyContent: 'center',
        background: radialBg,
        width: '100%',
      }}
    >
      <Container >
        <Stack spacing={{ xs: 10, md: 14 }} alignItems="center">
          {/* ——— Blue card ——— */}
          <Box
            sx={{
              width: '130%',
              height: '60vh',
              textAlign: 'center',
              px: { xs: 4, md: 8 },
              py: { xs: 8, md: 10 },
              borderRadius: { xs: 4, md: 10 },
              color: '#fff',
              background: 'linear-gradient(135deg, #007bff 0%, #0061ff 100%)',
              boxShadow: '0 18px 60px -16px rgba(0,0,0,0.35)',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0))',
                mixBlendMode: 'overlay',
                pointerEvents: 'none',
              },
            }}
          >
            <Typography
              sx={{
                mb: 1,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: { xs: 16, md: 18 },
                letterSpacing: 1,
                color: 'rgba(255,255,255,0.85)',

              }}
            >
              Coming&nbsp;soon..
            </Typography>

            <Typography 
              component="h1" 
              sx={{ 
              ...heading({ xs: '2.2rem', md: '3.8rem' }), 
              color: 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5
              }}
            >
              Kindness&nbsp;for&nbsp;Causes
              <Image
              src="/handheart.png"
              alt="Heart in hand"
              width={44}
              height={44}
              />
            </Typography>

            <Typography
              sx={{
                maxWidth: 640,
                mx: 'auto',
                fontSize: { xs: 15, md: 18 },
                opacity: 0.9,
                mb: 5,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              We&rsquo;re building tools to support NGOs, associations, and community
              initiatives. Soon, you&rsquo;ll be able to send gift packs directly to
              verified causes — transparent, secure, and full of meaning.
            </Typography>

            <Button
              size="large"
              onClick={() => setOpen(true)}
              endIcon={<BoltIcon fontSize="small" />}
              sx={{ ...primaryBtn, mt: 12, bgcolor: '#fff', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
            >
              Notify Me When It Launches
            </Button>

            <Snackbar
              open={open}
              autoHideDuration={2500}
              onClose={() => setOpen(false)}
            >
              <Alert severity="success" variant="filled">
                We&rsquo;ll keep you posted!
              </Alert>
            </Snackbar>
          </Box>

          {/* ——— Why DogeGF ——— */}
          <Box textAlign="center">
            <Typography component="h2" sx={heading({ xs: '2rem', md: '3rem' })}>
              Why&nbsp;DogeGF&nbsp;?
            </Typography>

            <Typography
              sx={{
                maxWidth: 800,
                mx: 'auto',
                fontSize: { xs: 17, md: 20 },
                mb: 5,
                color: 'rgba(0,0,0,0.85)',
              }}
            >
              DogeGF stands for kindness, community, and heart. With DogeGiFty we&rsquo;re
              turning that spirit into action—empowering everyday people to spread kindness in
              a fun, decentralized way.
            </Typography>

            <Button
              href="https://dogegf.com"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<LaunchIcon fontSize="small" />}
              sx={{ ...primaryBtn, bgcolor: '#007bff', '&:hover': { bgcolor: '#0061ff' } }}
            >
              Learn more about&nbsp;DogeGF
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
