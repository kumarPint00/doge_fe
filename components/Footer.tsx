'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';

const footerSections = [
  {
    title: 'Product',
    links: [
      { text: 'How it Works', href: '/how-it-works' },
      { text: 'Features', href: '/features' },
      { text: 'Pricing', href: '/pricing' },
      { text: 'Security', href: '/security' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { text: 'Documentation', href: '/docs' },
      { text: 'API Reference', href: '/api-docs' },
      { text: 'Tutorials', href: '/tutorials' },
      { text: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About Us', href: '/about' },
      { text: 'Blog', href: '/blog' },
      { text: 'Careers', href: '/careers' },
      { text: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Cookie Policy', href: '/cookies' },
      { text: 'Compliance', href: '/compliance' },
    ],
  },
];

const socialLinks = [
  { icon: TwitterIcon, href: 'https://twitter.com/dogegifty', label: 'Twitter' },
  { icon: TelegramIcon, href: 'https://t.me/dogegifty', label: 'Telegram' },
  { icon: GitHubIcon, href: 'https://github.com/dogegifty', label: 'GitHub' },
  // { icon: DiscordIcon, href: 'https://discord.gg/dogegifty', label: 'Discord' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 6, md: 8 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
               <Image
              src="/logo.svg"
              alt="DogeGiFty Logo"
              width={150}
              height={50}
              priority
              style={{ maxWidth: '100%', height: 'auto' }}
            />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 280 }}>
                Send crypto gifts with kindness. The easiest way to share digital assets with friends and family.
              </Typography>
              
              {/* Social Links */}
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component={MuiLink}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                    aria-label={social.label}
                  >
                    <social.icon fontSize="small" />
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {footerSections.map((section) => (
                <Grid item xs={6} sm={3} key={section.title}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'text.primary',
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Stack spacing={1.5}>
                    {section.links.map((link) => (
                      <MuiLink
                        key={link.text}
                        component={Link}
                        href={link.href}
                        sx={{
                          color: 'text.secondary',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {link.text}
                      </MuiLink>
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} DogeGiFty. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={3}>
            <MuiLink
              component={Link}
              href="/status"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Status
            </MuiLink>
            <MuiLink
              component={Link}
              href="/help"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Help
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
