import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import BusinessIcon from '@mui/icons-material/Business';

export default function ContactPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Get in touch with our team
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent sx={{ p: 6 }}>
                <Typography variant="h4" gutterBottom>
                  Send us a Message
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email" type="email" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subject" required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={6}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" size="large">
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Other Ways to Reach Us
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Support"
                      secondary="support@dogegifty.com"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ChatIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Live Chat"
                      secondary="Available 24/7"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BusinessIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Business Inquiries"
                      secondary="business@dogegifty.com"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Response Times
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  We aim to respond to all inquiries within:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Live Chat"
                      secondary="< 5 minutes"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Email Support"
                      secondary="< 24 hours"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Business Inquiries"
                      secondary="< 48 hours"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}