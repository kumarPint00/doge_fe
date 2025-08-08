'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const jobOpenings = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful, responsive interfaces for our crypto gifting platform using React and Next.js.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Web3 knowledge preferred']
  },
  {
    title: 'Blockchain Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Develop and maintain smart contracts and blockchain integrations for secure crypto transactions.',
    requirements: ['Solidity experience', 'DeFi protocols knowledge', 'Security best practices']
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Drive product strategy and roadmap for the next generation of crypto gifting features.',
    requirements: ['3+ years product management', 'Crypto/DeFi experience', 'Data-driven approach']
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build and maintain scalable infrastructure for high-volume crypto transactions.',
    requirements: ['Kubernetes experience', 'AWS/GCP knowledge', 'Security compliance']
  }
];

const benefits = [
  'Competitive salary + equity',
  'Remote-first culture',
  'Health, dental & vision insurance',
  'Unlimited PTO',
  'Learning & development budget',
  'Crypto rewards & bonuses'
];

export default function CareersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Join Our Team
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Help us build the future of crypto gifting
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          We're looking for passionate individuals who want to make crypto more accessible 
          and bring joy to digital asset sharing.
        </Typography>
      </Box>

      {/* Benefits */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Why Work With Us?
        </Typography>
        <Grid container spacing={2}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                • {benefit}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Job Openings */}
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Open Positions
      </Typography>
      
      <Grid container spacing={4}>
        {jobOpenings.map((job, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {job.title}
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Chip label={job.department} size="small" />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {job.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {job.type}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  <Button variant="contained">
                    Apply Now
                  </Button>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {job.description}
                </Typography>
                
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Requirements:
                </Typography>
                <Box>
                  {job.requirements.map((req, reqIndex) => (
                    <Typography key={reqIndex} variant="body2" color="text.secondary">
                      • {req}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CTA */}
      <Box textAlign="center" sx={{ mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          Don't see the right role?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
        </Typography>
        <Button variant="outlined" size="large">
          Send Resume
        </Button>
      </Box>
    </Container>
  );
}