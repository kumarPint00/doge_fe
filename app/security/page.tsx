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
  Alert,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockIcon from '@mui/icons-material/Lock';
import AuditedIcon from '@mui/icons-material/FactCheck';

export default function SecurityPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Security First
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          Your assets are protected by industry-leading security measures
        </Typography>

        <Alert severity="info" sx={{ mb: 6 }}>
          <Typography variant="body1">
            DogeGiFty has been audited by leading security firms and follows best practices for smart contract security.
          </Typography>
        </Alert>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SecurityIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5">Smart Contract Security</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Audited by CertiK and ConsenSys Diligence" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Multi-signature wallet controls" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Time-locked upgrades" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Emergency pause functionality" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LockIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5">Data Protection</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="End-to-end encryption" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Zero-knowledge architecture" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="SOC 2 Type II compliant" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Regular penetration testing" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <AuditedIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5">Security Audits</Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Our smart contracts have been thoroughly audited by multiple security firms:
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6">CertiK Audit</Typography>
                    <Typography color="text.secondary">Score: 96/100</Typography>
                    <Typography variant="body2">Complete security assessment of core contracts</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6">ConsenSys Diligence</Typography>
                    <Typography color="text.secondary">Status: Passed</Typography>
                    <Typography variant="body2">Gas optimization and security review</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6">OpenZeppelin</Typography>
                    <Typography color="text.secondary">Status: Certified</Typography>
                    <Typography variant="body2">Defender monitoring and incident response</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}