import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Chip,
} from '@mui/material';
import Link from 'next/link';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ForumIcon from '@mui/icons-material/Forum';

const quickLinks = [
  { title: 'Getting Started Guide', href: '/docs/quick-start', category: 'Tutorial' },
  { title: 'How to Create a Gift', href: '/docs/create-gift', category: 'Tutorial' },
  { title: 'How to Claim a Gift', href: '/docs/claim-gift', category: 'Tutorial' },
  { title: 'Troubleshooting', href: '/docs/troubleshooting', category: 'Support' },
  { title: 'Security Best Practices', href: '/docs/security', category: 'Security' },
  { title: 'API Documentation', href: '/api-docs', category: 'Developer' },
];

export default function HelpPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Help Center
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Find answers and get support
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <LiveHelpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Live Support
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Chat with our support team in real-time
                </Typography>
                <Button variant="contained" fullWidth>
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <MenuBookIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Documentation
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Comprehensive guides and tutorials
                </Typography>
                <Button variant="outlined" fullWidth component={Link} href="/docs">
                  Browse Docs
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <ForumIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Community
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Connect with other users and get help
                </Typography>
                <Button variant="outlined" fullWidth>
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              {quickLinks.map((link) => (
                <Grid item xs={12} sm={6} key={link.title}>
                  <ListItemButton
                    component={Link}
                    href={link.href}
                    sx={{ borderRadius: 1, border: 1, borderColor: 'divider' }}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>{link.title}</Typography>
                          <Chip label={link.category} size="small" variant="outlined" />
                        </Box>
                      }
                    />
                  </ListItemButton>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}