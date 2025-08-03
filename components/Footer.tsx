'use client';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  styled,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';

/* navy pill-square icon wrapper */
const SocialBtn = styled(IconButton)(({ theme }) => ({
  background: '#0D1B3E',
  color: '#fff',
  borderRadius: 8,
  width: 44,
  height: 44,
  '&:hover': { background: theme.palette.primary.dark },
}));

export default function FooterV2() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 6,
        pb: 2,
        borderTop: '1px solid rgba(0,0,0,.05)',
        backgroundColor: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* logo */}
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                component="img"
                src="/logo.svg"
                alt="logo"
                sx={{ width: 148, height: 148 }}
              />
             
            </Box>
          </Grid>

          {/* quick links */}
          <Grid item xs={6} md={3}>
            <Typography fontWeight={700} mb={1} sx={{ display: 'flex', gap: 1 }}>
              <Box component="span" sx={{ fontSize: 24 }}>🖋️</Box> Quick Links
            </Typography>
            <ul style={{ paddingLeft: 18, margin: 0, listStyle: 'disc' }}>
              <li><Link href="#" underline="hover" color="inherit">About DogeGiFty</Link></li>
              <li><Link href="#" underline="hover" color="inherit">How It Works</Link></li>
              <li><Link href="#" underline="hover" color="inherit">DogeGF Website</Link></li>
            </ul>
          </Grid>

          {/* support */}
          <Grid item xs={6} md={3}>
            <Typography fontWeight={700} mb={1} sx={{ display: 'flex', gap: 1 }}>
              <Box component="span" sx={{ fontSize: 24 }}>📞</Box> Support
            </Typography>
            <ul style={{ paddingLeft: 18, margin: 0, listStyle: 'disc' }}>
              <li><Link href="#" underline="hover" color="inherit">Contact Us</Link></li>
              <li><Link href="#" underline="hover" color="inherit">Terms &amp; Privacy</Link></li>
            </ul>
          </Grid>

          {/* socials */}
          <Grid item xs={12} md={3}>
            <Typography fontWeight={700} mb={1} sx={{ display: 'flex', gap: 1 }}>
              <Box component="span" sx={{ fontSize: 24, color: '#f5b700' }}>🤘</Box> Stay Connected
            </Typography>
            <Box display="flex" gap={1}>
              <SocialBtn aria-label="facebook">
                <FacebookIcon />
              </SocialBtn>
              <SocialBtn aria-label="x">
                <TwitterIcon fontSize="small" />
              </SocialBtn>
              <SocialBtn aria-label="telegram">
                <TelegramIcon />
              </SocialBtn>
              <SocialBtn aria-label="instagram">
                <InstagramIcon />
              </SocialBtn>
            </Box>
          </Grid>
        </Grid>

        {/* divider line */}
        <Box
          my={4}
          sx={{ height: 1, bgcolor: 'rgba(0,0,0,.06)' }}
        />

        {/* copyright */}
        <Typography
          textAlign="center"
          fontSize={14}
          color="text.secondary"
        >
          2025 [DogeGF]. All rights reserved. Built with&nbsp;
          <Box component="span" sx={{ color: 'secondary.main' }}>❤️</Box>&nbsp;for the
          future of gifting.
        </Typography>
      </Container>
    </Box>
  );
}
