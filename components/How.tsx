'use client';
import React from 'react';
import Section from '@/components/Section';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

interface Card {
  title: string;
  body: string;
  img: string;
}

const CARDS: Card[] = [
  {
    title: 'Create a Gift Pack',
    body: 'Add tokens, NFTs, or both — whatever kindness looks like to you.',
    img: '/heart-hand.png',      
  },
  {
    title: 'Generate a Secret Code',
    body: 'Lock your gift with a unique code. The pack goes into escrow until someone claims it with the code.',
    img: '/lock.png',            
  },
  {
    title: 'Share & Surprise',
    body: 'Send the secret code to a friend, loved one, or stranger. Only they can unlock the pack and claim your gift.',
    img: '/giftbox.png',         
  },
];

export default function HowItWorksV2() {
  const theme = useTheme();

  return (
    <Section
      sx={{
        bgcolor: '#E1EFFF',                     
        py: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/*  LEFT  */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h2"
              fontWeight={800}
              color="primary.main"
              mb={1}
            >
              How It Works
            </Typography>
            <Typography color="primary.main" fontSize={18}>
              Kindness, Sealed &amp; Delivered (On-Chain)
            </Typography>
          </Grid>

          {/*  RIGHT  */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {CARDS.map((c, idx) => (
                <Grid
                  key={c.title}
                  item
                  xs={12}
                  md={idx < 2 ? 6 : 12}      
                >
                  <Paper
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      height: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow:
                        '0 1px 4px -1px rgba(0,0,0,0.1), 0 6px 18px -5px rgba(0,0,0,0.08)',
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={700} mb={1}>
                        {c.title}
                      </Typography>
                      <Typography color="text.secondary">{c.body}</Typography>
                    </Box>

                    <Box mt={3} textAlign="right">
                      <Image
                        src={c.img}
                        alt={c.title}
                        width={160}
                        height={160}
                        style={{
                          maxWidth: '160px',
                          height: 'auto',
                        }}
                        priority={idx === 0}
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
