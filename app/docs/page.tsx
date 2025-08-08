import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Chip,
} from '@mui/material';
import Link from 'next/link';

const docSections = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Quick Start Guide', href: '/docs/quick-start', tag: 'Beginner' },
      { title: 'Creating Your First Gift', href: '/docs/first-gift', tag: 'Tutorial' },
      { title: 'Claiming Gifts', href: '/docs/claiming', tag: 'Tutorial' },
    ]
  },
  {
    title: 'Advanced Features',
    items: [
      { title: 'Bulk Gift Creation', href: '/docs/bulk-gifts', tag: 'Advanced' },
      { title: 'Custom Messages', href: '/docs/messages', tag: 'Feature' },
      { title: 'Scheduling Gifts', href: '/docs/scheduling', tag: 'Pro' },
    ]
  },
  {
    title: 'API Documentation',
    items: [
      { title: 'Authentication', href: '/docs/api/auth', tag: 'API' },
      { title: 'Gift Management', href: '/docs/api/gifts', tag: 'API' },
      { title: 'Webhooks', href: '/docs/api/webhooks', tag: 'API' },
    ]
  },
  {
    title: 'Security',
    items: [
      { title: 'Smart Contract Security', href: '/docs/security/contracts', tag: 'Security' },
      { title: 'Best Practices', href: '/docs/security/best-practices', tag: 'Guide' },
      { title: 'Audit Reports', href: '/docs/security/audits', tag: 'Report' },
    ]
  }
];

export default function DocsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Documentation
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Everything you need to know about using DogeGiFty
        </Typography>

        <Grid container spacing={4}>
          {docSections.map((section) => (
            <Grid item xs={12} md={6} key={section.title}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {section.title}
                  </Typography>
                  <List>
                    {section.items.map((item) => (
                      <ListItemButton
                        key={item.title}
                        component={Link}
                        href={item.href}
                        sx={{ borderRadius: 1 }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography>{item.title}</Typography>
                              <Chip label={item.tag} size="small" variant="outlined" />
                            </Box>
                          }
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ mt: 6, bgcolor: 'primary.50' }}>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Need Help?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Can't find what you're looking for? Our support team is here to help.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Chip label="Live Chat" variant="outlined" clickable />
              <Chip label="Email Support" variant="outlined" clickable />
              <Chip label="Community Forum" variant="outlined" clickable />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}