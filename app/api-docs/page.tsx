'use client';

import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Code } from '@mui/icons-material';

const endpoints = [
  {
    method: 'POST',
    path: '/api/gifts/create',
    description: 'Create a new crypto gift',
    parameters: ['amount', 'currency', 'recipient_email', 'message'],
    example: `{
  "amount": "100",
  "currency": "DOGE",
  "recipient_email": "friend@example.com",
  "message": "Happy Birthday!"
}`
  },
  {
    method: 'GET',
    path: '/api/gifts/{id}',
    description: 'Retrieve gift details',
    parameters: ['id'],
    example: `{
  "id": "gift_123",
  "amount": "100",
  "currency": "DOGE",
  "status": "pending"
}`
  },
  {
    method: 'POST',
    path: '/api/gifts/{id}/claim',
    description: 'Claim a received gift',
    parameters: ['id', 'wallet_address'],
    example: `{
  "wallet_address": "DQA8...xyz"
}`
  }
];

export default function ApiDocsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        API Documentation
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
        Complete reference for the DogeGiFty API
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        All API requests require authentication via API key in the Authorization header.
      </Alert>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {endpoints.map((endpoint, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip 
                    label={endpoint.method} 
                    color={endpoint.method === 'GET' ? 'success' : 'primary'}
                    size="small"
                  />
                  <Typography variant="body1" fontFamily="monospace">
                    {endpoint.path}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {endpoint.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Parameters:
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {endpoint.parameters.map((param) => (
                    <Chip key={param} label={param} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Example:
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <Code component="pre" sx={{ fontSize: '0.875rem' }}>
                    {endpoint.example}
                  </Code>
                </Paper>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Start
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get started with the DogeGiFty API in minutes. Authentication, rate limits, and best practices.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}