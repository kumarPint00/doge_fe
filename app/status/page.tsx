import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

const services = [
  { name: 'API Services', status: 'operational', uptime: '99.9%' },
  { name: 'Smart Contracts', status: 'operational', uptime: '100%' },
  { name: 'Web Application', status: 'operational', uptime: '99.8%' },
  { name: 'Database', status: 'operational', uptime: '99.9%' },
  { name: 'Email Notifications', status: 'maintenance', uptime: '99.5%' },
];

const incidents = [
  {
    date: '2024-01-15',
    title: 'Scheduled Maintenance',
    description: 'Routine database maintenance completed successfully',
    status: 'resolved'
  },
  {
    date: '2024-01-10',
    title: 'API Rate Limiting Issues',
    description: 'Temporary increase in response times, resolved within 2 hours',
    status: 'resolved'
  }
];

export default function StatusPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          System Status
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Real-time status of DogeGiFty services
        </Typography>

        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Service Status
            </Typography>
            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.name}>
                  <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {service.status === 'operational' ? (
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      ) : (
                        <WarningIcon color="warning" sx={{ mr: 1 }} />
                      )}
                      <Typography variant="h6">{service.name}</Typography>
                    </Box>
                    <Chip
                      label={service.status === 'operational' ? 'Operational' : 'Maintenance'}
                      color={service.status === 'operational' ? 'success' : 'warning'}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Uptime: {service.uptime}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Recent Incidents
            </Typography>
            {incidents.length === 0 ? (
              <Typography color="text.secondary">
                No recent incidents to report.
              </Typography>
            ) : (
              <List>
                {incidents.map((incident, index) => (
                  <ListItem key={index} divider={index < incidents.length - 1}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6">{incident.title}</Typography>
                          <Chip
                            label={incident.status}
                            color="success"
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {incident.date}
                          </Typography>
                          <Typography variant="body2">
                            {incident.description}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}