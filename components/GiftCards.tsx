'use client';
import React from 'react';
import Section from '@/components/Section';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import Image from 'next/image';

export default function GiftCardsV2() {
  const theme = useTheme();

  return (
    <Section sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* CREATE */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: { xs: 340, md: 420 },
                p: 5,
                borderRadius: 10,
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage:
                  'linear-gradient(180deg,#0054ff 0%,#0041d8 55%,#0030b4 100%)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box zIndex={2}>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  mb={2}
                  sx={{ lineHeight: 1.2 }}
                >
                  Create a Gift Pack
                </Typography>

                <Typography mb={3} sx={{ opacity: 0.95, maxWidth: 280 }}>
                  Choose an amount, add a message, and send crypto as a unique
                  digital gift.
                </Typography>

                <Button
                  variant="contained"
                  href="/gift/create"
                  endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: '#ff6d8d',
                    textTransform: 'none',
                    fontWeight: 700,
                    px: 4,
                    '&:hover': { bgcolor: '#ff5c7d' },
                    borderRadius: 8,
                  }}
                >
                  Start Gifting
                </Button>
              </Box>

              {/* hero art */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: { xs: 180, md: 240 },
                  transform: 'translate(15%, 10%)',
                }}
              >
                <Image
                  src="/create-gift.png"  
                  alt="giftbox create"
                  width={240}
                  height={240}
                />
              </Box>
            </Box>
          </Grid>

          {/* CLAIM */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: { xs: 340, md: 420 },
                p: 5,
                borderRadius: 10,
                color: '#c4125e',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage:
                  'linear-gradient(180deg,#ffd1dd 0%,#ffc3d4 45%,#ffb4c9 100%)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box zIndex={2}>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  mb={2}
                  sx={{ lineHeight: 1.2 }}
                >
                  Claim a Gift Pack
                </Typography>

                <Typography mb={3} sx={{ maxWidth: 280 }}>
                  Your gift is ready to claim. Just follow a few steps to
                  unlock it.
                </Typography>

                <Button
                  variant="contained"
                  href="/gift/claim"
                  endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: '#0b39c6',
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 700,
                    px: 4,
                    '&:hover': { bgcolor: '#082f9f' },
                    borderRadius: 8,
                  }}
                >
                  Start Claiming
                </Button>
              </Box>

              {/* hero art */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: { xs: 180, md: 240 },
                  transform: 'translate(25%, 15%)',
                }}
              >
                <Image
                  src="/gift-claim.png"  
                  alt="giftbox claim"
                  width={240}
                  height={240}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
