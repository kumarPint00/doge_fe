import Section from '@/components/Section';
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';

export default function WhyV2() {
  return (
    <Section
      sx={{
        py: { xs: 8, md: 10 },
        textAlign: 'center',
        backgroundImage:
          'radial-gradient(ellipse at 80% 20%, #ffd6e8 0%, rgba(255,214,232,0) 70%)',
      }}
    >
      <Container maxWidth="md">
        {/* headline */}
        <Typography
          variant="h2"
          component="h2"
          fontWeight={800}
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 3 }}
        >
          Why&nbsp; DogeGF&nbsp; ?
        </Typography>

        {/* quote */}
        <Typography
          sx={{
            fontSize: { xs: 18, md: 20 },
            mb: 5,
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          “DogeGF stands for kindness, community, and heart. With DogeGiFty,
          we’re turning that into action empowering everyday people to spread
          kindness in a fun, decentralized way.”
        </Typography>

        {/* CTA */}
        <Button
          variant="contained"
          href="https://dogegf.com"
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<LaunchIcon fontSize="small" />}
          sx={{
            bgcolor: 'primary.main',
            px: 6,
            py: 1.5,
            borderRadius: 8,
            fontWeight: 700,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Learn more about&nbsp;DogeGF
        </Button>
      </Container>
    </Section>
  );
}
