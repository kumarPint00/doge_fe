import Section from '@/components/Section';
import { Container, Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';

export default function Hero() {
  return (
    <Section
      sx={{
        background:
          'radial-gradient(circle at 0% 0%, #f9dfb6 0%, rgba(249,223,182,0) 45%), #fff7fb',
        px: { xs: 2, lg: 6 },
        py: { xs: 4, lg: 6 },
        pt: { xs: 8, lg: 12 }, // Extra top padding to account for floating navbar
      }}
    >
      <Container maxWidth="xl">
        <Grid container alignItems="center" spacing={2}>
          {/* Left Text Content - takes 2/3 of the space */}
          <Grid item xs={12} lg={8}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography
                variant="h1"
                fontWeight={800}
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', lg: '3rem', xl: '4.5rem' },
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Box component="span" sx={{ color: '#FF3B82' }}>Send Kindness</Box>
                  <Box component="span" sx={{ color: '#0068ff' }}>, Onchain.</Box>
                </Box>
              </Typography>

              <Typography 
                sx={{ 
                  mt: 2, 
                  color: '#374151',
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  pr: { lg: 30, xs: 0 }
                }}
              >
                Send Onchain gifts in seconds. DogeGiFty makes it easy to spread kind
                gestures. Powered by DogeGF.
              </Typography>
            </Box>
          </Grid>

          {/* Right Image - takes 1/3 of the space */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/dogeGift.svg"     
                alt="Doge in gift box"
                width={420}
                height={420}
                priority
                style={{ width: 'auto', maxWidth: '100%', height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
