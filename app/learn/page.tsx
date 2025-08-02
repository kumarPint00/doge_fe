'use client';
import { Container, Typography, Box, Stack, Paper } from '@mui/material';
import Section from '@/components/Section';

export default function LearnPage() {
  return (
    <Section>
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight={800} textAlign="center" mb={6}>
          Learn about&nbsp;DogeGiFty
        </Typography>

        <Stack spacing={4}>
          {[
            {
              hdr: 'What is DogeGiFty?',
              body:
                'A zero-friction way to wrap ERC-20 tokens or NFTs in a gift-pack ' +
                'sealed with a secret code. Think “digital red envelope,” but on-chain.',
            },
            {
              hdr: 'How does escrow work?',
              body:
                'When you click “Seal the Gift,” the smart contract locks your assets ' +
                'until someone calls `claim` with the matching secret hash.',
            },
            {
              hdr: 'Why DogeGF?',
              body:
                'DogeGF is the community-driven meme token that funds micro-acts of ' +
                'kindness. Holding DogeGF fuels future feature drops and charity integrations.',
            },
          ].map((s) => (
            <Paper key={s.hdr} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                {s.hdr}
              </Typography>
              <Typography fontSize={15} color="text.secondary">
                {s.body}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Section>
  );
}
