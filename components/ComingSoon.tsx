'use client';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt'; // just for the bell / ping
import { useState } from 'react';
import Image from 'next/image';
import Section from '@/components/Section';

export default function ComingSoonV2() {
  const [open, setOpen] = useState(false);

  return (
    <Section sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        {/* blue rounded-corner card */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: '#fff',
            borderRadius: { xs: 6, md: 12 },
            px: { xs: 4, md: 8 },
            py: { xs: 8, md: 10 },
            textAlign: 'center',
            boxShadow: '0 18px 60px -16px rgba(0,0,0,.35)',
            backgroundImage:
              'linear-gradient(135deg,#0068ff 0%,#0051db 45%,#0040c1 100%)',
          }}
        >
          {/* tiny overlapping avatars (just an accent, optional) */}
          <Stack
            direction="row"
            spacing={-1}
            justifyContent="center"
            mb={2}
          >
            <Image
              src="/avatar1.png"
              alt="avatar"
              width={36}
              height={36}
              style={{ borderRadius: '50%', border: '2px solid #fff' }}
            />
            <Image
              src="/avatar2.png"
              alt="avatar"
              width={36}
              height={36}
              style={{ borderRadius: '50%', border: '2px solid #fff' }}
            />
          </Stack>

          <Typography
            mb={1}
            sx={{
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: 1,
              fontSize: { xs: 18, md: 20 },
            }}
          >
            Coming&nbsp;soon..
          </Typography>

          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mb: 3,
              fontSize: { xs: '2rem', md: '3.5rem' },
              lineHeight: 1.1,
            }}
          >
            “Kindness&nbsp;for&nbsp;Causes”&nbsp;
            <span role="img" aria-label="ribbon">
              🎗️
            </span>
          </Typography>

          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Typography
            sx={{
              maxWidth: 640,
              mx: 'auto',
              fontSize: { xs: 16, md: 18 },
              mb: 5,
              opacity: 0.9,
            }}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We"re building tools to support NGOs, associations, and community
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            initiatives. Soon, you"ll be able to send gift packs directly to
            verified causes — transparent, secure, and full of meaning.
          </Typography>

          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            size="large"
            sx={{
              bgcolor: '#fff',
              color: 'primary.main',
              fontWeight: 700,
              px: 5,
              py: 1.25,
              borderRadius: 6,
              '&:hover': {
                bgcolor: '#fff',
              },
            }}
            endIcon={<BoltIcon fontSize="small" />}
          >
            Notify Me When It Launches
          </Button>

          {/* toast */}
          <Snackbar
            open={open}
            autoHideDuration={2500}
            onClose={() => setOpen(false)}
          >
            <Alert severity="success" variant="filled">
              We&apos;ll keep you posted!
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </Section>
  );
}
