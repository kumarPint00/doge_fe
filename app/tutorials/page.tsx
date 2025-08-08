'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from '@mui/material';
import Link from 'next/link';

const tutorials = [
  {
    title: 'Getting Started with DogeGiFty',
    description: 'Learn the basics of sending your first crypto gift',
    duration: '5 min read',
    level: 'Beginner',
    image: '/tutorials/getting-started.jpg',
    slug: 'getting-started'
  },
  {
    title: 'Setting Up Your Wallet',
    description: 'Step-by-step guide to connect your crypto wallet',
    duration: '8 min read',
    level: 'Beginner',
    image: '/tutorials/wallet-setup.jpg',
    slug: 'wallet-setup'
  },
  {
    title: 'Advanced Gift Scheduling',
    description: 'Schedule gifts for future delivery and special occasions',
    duration: '12 min read',
    level: 'Intermediate',
    image: '/tutorials/scheduling.jpg',
    slug: 'gift-scheduling'
  },
  {
    title: 'Using the API',
    description: 'Integrate DogeGiFty into your applications',
    duration: '15 min read',
    level: 'Advanced',
    image: '/tutorials/api-integration.jpg',
    slug: 'api-integration'
  },
  {
    title: 'Security Best Practices',
    description: 'Keep your gifts and wallet secure',
    duration: '10 min read',
    level: 'Intermediate',
    image: '/tutorials/security.jpg',
    slug: 'security-practices'
  },
  {
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequently encountered problems',
    duration: '7 min read',
    level: 'Beginner',
    image: '/tutorials/troubleshooting.jpg',
    slug: 'troubleshooting'
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'success';
    case 'Intermediate': return 'warning';
    case 'Advanced': return 'error';
    default: return 'default';
  }
};

export default function TutorialsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Tutorials
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
        Step-by-step guides to help you make the most of DogeGiFty
      </Typography>

      <Grid container spacing={4}>
        {tutorials.map((tutorial) => (
          <Grid item xs={12} md={6} lg={4} key={tutorial.slug}>
            <Card 
              component={Link}
              href={`/tutorials/${tutorial.slug}`}
              sx={{ 
                height: '100%',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  bgcolor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography color="text.secondary">
                  Tutorial Image
                </Typography>
              </CardMedia>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={tutorial.level} 
                    color={getLevelColor(tutorial.level) as any}
                    size="small"
                  />
                  <Chip 
                    label={tutorial.duration} 
                    variant="outlined"
                    size="small"
                  />
                </Stack>
                <Typography variant="h6" gutterBottom>
                  {tutorial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tutorial.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}