'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PolicyIcon from '@mui/icons-material/Policy';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const complianceAreas = [
  {
    title: 'Anti-Money Laundering (AML)',
    description: 'We implement comprehensive AML procedures to prevent financial crimes',
    icon: SecurityIcon,
    measures: [
      'Customer Due Diligence (CDD)',
      'Enhanced Due Diligence (EDD) for high-risk customers',
      'Ongoing transaction monitoring',
      'Suspicious Activity Reporting (SAR)'
    ]
  },
  {
    title: 'Know Your Customer (KYC)',
    description: 'Identity verification processes to ensure user authenticity',
    icon: VerifiedUserIcon,
    measures: [
      'Identity document verification',
      'Address verification',
      'Biometric verification for high-value transactions',
      'Regular customer screening updates'
    ]
  },
  {
    title: 'Data Protection',
    description: 'Protecting user data in compliance with global privacy regulations',
    icon: PolicyIcon,
    measures: [
      'GDPR compliance for EU users',
      'CCPA compliance for California residents',
      'End-to-end encryption',
      'Regular security audits'
    ]
  },
  {
    title: 'Financial Regulations',
    description: 'Adherence to financial services regulations across jurisdictions',
    icon: AssignmentIcon,
    measures: [
      'Money Service Business (MSB) registration',
      'FinCEN compliance in the US',
      'FCA compliance in the UK',
      'Regular compliance audits'
    ]
  }
];

const certifications = [
  'SOC 2 Type II Certified',
  'ISO 27001 Information Security',
  'PCI DSS Level 1 Merchant',
  'GDPR Compliant'
];

export default function CompliancePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Compliance & Security
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
        Our commitment to regulatory compliance and user protection
      </Typography>

      <Alert severity="info" sx={{ mb: 6 }}>
        DogeGiFty operates under strict regulatory compliance to ensure the safety and security of all users and transactions.
      </Alert>

      {/* Compliance Areas */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {complianceAreas.map((area, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <area.icon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="h6">
                    {area.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {area.description}
                </Typography>
                <List dense>
                  {area.measures.map((measure, measureIndex) => (
                    <ListItem key={measureIndex} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircleIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={measure}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Certifications */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom>
          Certifications & Standards
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We maintain industry-leading certifications to ensure the highest levels of security and compliance.
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {certifications.map((cert, index) => (
            <Chip 
              key={index}
              label={cert}
              color="primary"
              variant="outlined"
              icon={<VerifiedUserIcon />}
            />
          ))}
        </Stack>
      </Box>

      {/* Risk Management */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom>
          Risk Management
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Transaction Monitoring
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              All transactions are monitored in real-time using advanced AI and machine learning 
              algorithms to detect suspicious patterns and prevent fraudulent activity.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Sanctions Screening
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              We screen all users and transactions against global sanctions lists including 
              OFAC, UN, EU, and other relevant watchlists to ensure compliance.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Regulatory Information */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Regulatory Information
        </Typography>
        <Typography variant="body1" paragraph>
          DogeGiFty is registered as a Money Service Business (MSB) with FinCEN in the United States 
          and complies with all applicable state and federal regulations.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          For questions about our compliance program, please contact: compliance@dogegifty.com
        </Typography>
      </Box>
    </Container>
  );
}