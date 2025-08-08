import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GavelIcon from '@mui/icons-material/Gavel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const features = [
  {
    title: 'Secure Escrow System',
    description: 'Your assets are safely held in smart contracts until claimed',
    icon: SecurityIcon,
    benefits: [
      'Trustless transactions',
      'Smart contract security',
      'Automatic release on claim',
      'No counterparty risk'
    ]
  },
  {
    title: 'Gasless Claims',
    description: 'Recipients can claim gifts without paying gas fees',
    icon: SpeedIcon,
    benefits: [
      'No gas fees for recipients',
      'Smooth user experience',
      'Meta-transaction support',
      'Cross-chain compatibility'
    ]
  },
  {
    title: 'Multi-Asset Support',
    description: 'Send any ERC-20 tokens or NFTs as gifts',
    icon: AccountBalanceWalletIcon,
    benefits: [
      'ERC-20 token support',
      'NFT gift packs',
      'Multi-token bundles',
      'Custom asset selection'
    ]
  },
  {
    title: 'Compliance Ready',
    description: 'Built with regulatory compliance in mind',
    icon: GavelIcon,
    benefits: [
      'KYC/AML support',
      'Transaction monitoring',
      'Regulatory reporting',
      'Jurisdiction compliance'
    ]
  }
];

export default function FeaturesPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Features
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Everything you need to send crypto gifts safely and easily
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <feature.icon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5">{feature.title}</Typography>
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <List dense>
                    {feature.benefits.map((benefit) => (
                      <ListItem key={benefit} sx={{ pl: 0 }}>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}