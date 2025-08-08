import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from '@mui/material';

export default function PrivacyPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>

        <Card>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" gutterBottom>
              Information We Collect
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support.
            </Typography>

            <Typography variant="h5" gutterBottom>
              Types of Information:
            </Typography>
            <Typography component="ul" variant="body1" sx={{ mb: 4 }}>
              <li>Wallet addresses and transaction data</li>
              <li>Account information and preferences</li>
              <li>Usage data and analytics</li>
              <li>Communication records</li>
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, and communicate with you.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Information Sharing
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Data Security
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1">
              If you have any questions about this Privacy Policy, please contact us at privacy@dogegifty.com
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}