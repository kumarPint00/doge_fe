import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 5 gift packs per month',
      'Basic token support',
      'Standard support',
      'Community access'
    ],
    buttonText: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'For regular gift senders',
    features: [
      'Unlimited gift packs',
      'All supported tokens & NFTs',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
      'API access'
    ],
    buttonText: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For organizations',
    features: [
      'Everything in Pro',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantees',
      'Compliance features'
    ],
    buttonText: 'Contact Sales',
    popular: false
  }
];

export default function PricingPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Simple, Transparent Pricing
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Choose the plan that works best for you
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {plans.map((plan) => (
            <Grid item xs={12} md={4} key={plan.name}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  border: plan.popular ? 2 : 1,
                  borderColor: plan.popular ? 'primary.main' : 'divider'
                }}
              >
                {plan.popular && (
                  <Chip
                    label="Most Popular"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  />
                )}
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="span">
                      {plan.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      /{plan.period}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 4 }}>
                    {plan.description}
                  </Typography>
                  <List sx={{ mb: 4 }}>
                    {plan.features.map((feature) => (
                      <ListItem key={feature} sx={{ py: 0.5 }}>
                        <ListItemIcon>
                          <CheckIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature}
                          primaryTypographyProps={{ fontSize: '0.875rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ bgcolor: 'primary.50' }}>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Need Something Custom?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              We offer custom solutions for enterprises with specific requirements.
            </Typography>
            <Button variant="contained" size="large">
              Contact Our Team
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}