'use client';
import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';

export default function GiftCards() {
  return (
    <Box sx={{ px: { xs: 2, lg: 6 }, py: { xs: 4, lg: 6 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* CREATE */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                bgcolor: '#2563eb', // blue-600
                borderRadius: 6, // Increased border radius to match reference
                overflow: 'hidden',
                position: 'relative',
                height: 400, // Reduced height to match reference
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Content Area */}
              <Box sx={{ color: 'white', p: 4, zIndex: 2 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.5rem', lg: '2rem' },
                    fontWeight: 900,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Create a Gift Pack
                </Typography>

                <Typography
                  sx={{
                    mb: 4,
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.9)',
                    maxWidth: 280,
                    lineHeight: 1.4,
                  }}
                >
                  Choose an amount, add a message, and send crypto as a unique digital gift.
                </Typography>

                <Button
                  href="/gift/create"
                  sx={{
                    bgcolor: '#f472b6', // pink-400
                    '&:hover': { bgcolor: '#ec4899' }, // pink-500
                    color: 'white',
                    fontWeight: 600,
                    py: 1.5,
                    px: 4,
                    borderRadius: 999,
                    textTransform: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Start Gifting
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Box>

              {/* Image positioned in bottom-right corner */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 200,
                  height: 180,
                  zIndex: 1,
                }}
              >
                <Image
                  src="/create-gift.png"
                  alt="Gift Box"
                  width={200}
                  height={180}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    objectPosition: 'bottom right'
                  }}
                />
              </Box>

              {/* Decorative star */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 100,
                  right: 100,
                  color: '#ffd700',
                  fontSize: '16px',
                  zIndex: 2,
                }}
              >
                ⭐
              </Box>
            </Box>
          </Grid>

          {/* CLAIM */}
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                bgcolor: '#fbb6ce', // pink-300
                borderRadius: 6, // Increased border radius to match reference
                overflow: 'hidden',
                position: 'relative',
                height: 400, // Same height as create card
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Content Area */}
              <Box sx={{ color: '#831843', p: 4, zIndex: 2 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.5rem', lg: '2rem' },
                    fontWeight: 900,
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Claim a Gift Pack
                </Typography>

                <Typography
                  sx={{
                    mb: 4,
                    fontSize: '1rem',
                    color: 'rgba(131,24,67,0.9)',
                    maxWidth: 280,
                    lineHeight: 1.4,
                  }}
                >
                  Your gift is ready to claim. Just follow a few steps to unlock it.
                </Typography>

                <Button
                  href="/gift/claim"
                  sx={{
                    bgcolor: '#1d4ed8', // blue-700
                    '&:hover': { bgcolor: '#1e40af' }, // blue-800
                    color: 'white',
                    fontWeight: 600,
                    py: 1.5,
                    px: 4,
                    borderRadius: 999,
                    textTransform: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.9rem',
                  }}
                >
                  Start Claiming
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Box>

              {/* Image positioned in bottom-right corner */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 200,
                  height: 180,
                  zIndex: 1,
                }}
              >
                <Image
                  src="/gift-claim.png"
                  alt="Gift Heart Box"
                  width={200}
                  height={180}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain',
                    objectPosition: 'bottom right'
                  }}
                />
              </Box>

              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 80,
                  right: 80,
                  color: '#1d4ed8',
                  fontSize: '16px',
                  zIndex: 2,
                }}
              >
                ⭐
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 120,
                  right: 40,
                  color: '#ffd700',
                  fontSize: '12px',
                  zIndex: 2,
                }}
              >
                ⭐
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: 140,
                  right: 140,
                  color: '#ffd700',
                  fontSize: '12px',
                  zIndex: 2,
                }}
              >
                ⭐
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
