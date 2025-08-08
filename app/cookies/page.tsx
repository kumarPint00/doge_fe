'use client';

import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const cookieTypes = [
  {
    name: 'Essential Cookies',
    description: 'These cookies are necessary for the website to function and cannot be switched off.',
    examples: [
      { name: 'session_id', purpose: 'User authentication', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Security protection', duration: '24 hours' },
    ]
  },
  {
    name: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website.',
    examples: [
      { name: '_ga', purpose: 'Google Analytics tracking', duration: '2 years' },
      { name: '_gid', purpose: 'Google Analytics identification', duration: '24 hours' },
    ]
  },
  {
    name: 'Functional Cookies',
    description: 'These cookies enable enhanced functionality and personalization.',
    examples: [
      { name: 'user_preferences', purpose: 'Remember user settings', duration: '1 year' },
      { name: 'wallet_connection', purpose: 'Remember wallet choice', duration: '30 days' },
    ]
  }
];

export default function CookiesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Cookie Policy
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Last updated: August 8, 2025
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        This Cookie Policy explains how DogeGiFty uses cookies and similar technologies when you visit our website.
      </Alert>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          What Are Cookies?
        </Typography>
        <Typography variant="body1" paragraph>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
          They help us make our website work better and provide a more personalized experience.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          How We Use Cookies
        </Typography>
        
        {cookieTypes.map((type, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{type.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ mb: 3 }}>
                {type.description}
              </Typography>
              
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cookie Name</TableCell>
                      <TableCell>Purpose</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {type.examples.map((cookie, cookieIndex) => (
                      <TableRow key={cookieIndex}>
                        <TableCell component="th" scope="row">
                          {cookie.name}
                        </TableCell>
                        <TableCell>{cookie.purpose}</TableCell>
                        <TableCell>{cookie.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Managing Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already 
          on your computer and you can set most browsers to prevent them from being placed.
        </Typography>
        <Typography variant="body1" paragraph>
          However, if you do this, you may have to manually adjust some preferences every time you visit 
          our website and some services and functionalities may not work.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Third-Party Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          We may use third-party services that place cookies on your device. These include:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>Google Analytics for website analytics</li>
          <li>Stripe for payment processing</li>
          <li>MetaMask for wallet connections</li>
        </Box>
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions about our use of cookies, please contact us at privacy@dogegifty.com
        </Typography>
      </Box>
    </Container>
  );
}