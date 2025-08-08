import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material';

export default function TermsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Card>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" gutterBottom>
              Acceptance of Terms
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              By accessing and using DogeGiFty, you accept and agree to be bound by the terms and 
              provision of this agreement.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Service Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              DogeGiFty is a platform that enables users to create, send, and claim digital asset gifts 
              using blockchain technology.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              User Responsibilities
            </Typography>
            <Typography component="ul" variant="body1" sx={{ mb: 4 }}>
              <li>You are responsible for maintaining the security of your wallet</li>
              <li>You must not use the service for illegal activities</li>
              <li>You must provide accurate information</li>
              <li>You must comply with applicable laws and regulations</li>
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Disclaimers
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              The service is provided "as is" without warranty of any kind. We do not guarantee 
              uninterrupted or error-free operation of the service.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Limitation of Liability
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              In no event shall DogeGiFty be liable for any indirect, incidental, special, 
              consequential or punitive damages.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1">
              For questions about these Terms of Service, please contact us at legal@dogegifty.com
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}