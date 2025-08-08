import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ShareIcon from '@mui/icons-material/Share';
import RedeemIcon from '@mui/icons-material/Redeem';

const steps = [
  {
    label: 'Create Your Gift Pack',
    description: 'Choose tokens or NFTs from your wallet, add a personal message, and create your unique gift pack.',
    icon: CreateIcon,
  },
  {
    label: 'Share the Gift Code',
    description: 'Send the secure gift code to your recipient via any messaging platform or social media.',
    icon: ShareIcon,
  },
  {
    label: 'Recipient Claims the Gift',
    description: 'The recipient enters the code, connects their wallet, and receives the digital assets instantly.',
    icon: RedeemIcon,
  },
];

export default function HowItWorksPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          How DogeGiFty Works
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Three simple steps to send crypto gifts with love
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={step.label}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    <step.icon sx={{ fontSize: 48, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {index + 1}. {step.label}
                  </Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card>
          <CardContent sx={{ p: 6 }}>
            <Typography variant="h4" gutterBottom>
              Detailed Process
            </Typography>
            <Stepper orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label} active>
                  <StepLabel>
                    <Typography variant="h6">{step.label}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}