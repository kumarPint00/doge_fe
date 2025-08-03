import Section from '@/components/Section';
import { Container, Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';

export default function HeroV2() {
  return (
    <Section
      sx={{
     
        background:
          'radial-gradient(circle at 0% 0%, #f9dfb6 0%, rgba(249,223,182,0) 45%), #fff7fb',
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              fontWeight={800}
              sx={{
                fontSize: { xs: '2.25rem', md: '3.5rem' },
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              <Box component="span" sx={{ color: '#FF3B82' }}>Send&nbsp;Kindness,</Box>{' '}
              <Box component="span" sx={{ color: '#0068ff' }}>Onchain.</Box>
            </Typography>

            <Typography fontSize={18} sx={{ maxWidth: 460 }}>
              Send Onchain gifts in seconds. DogeGiFty makes it easy to spread kind
              gestures. Powered by DogeGF.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} textAlign="center">
            <Image
              src="/dogeGift.svg"     
              alt="doge in gift box"
              width={420}
              height={420}
              priority
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
