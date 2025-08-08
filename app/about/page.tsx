import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
} from '@mui/material';

const team = [
  {
    name: 'Alex Chen',
    role: 'CEO & Co-founder',
    bio: 'Former blockchain engineer at Coinbase with 8+ years in crypto',
    avatar: '/team/alex.jpg'
  },
  {
    name: 'Sarah Kim',
    role: 'CTO & Co-founder',
    bio: 'Smart contract security expert, previously at ConsenSys',
    avatar: '/team/sarah.jpg'
  },
  {
    name: 'Marcus Johnson',
    role: 'Head of Product',
    bio: 'Product leader with experience at major fintech companies',
    avatar: '/team/marcus.jpg'
  }
];

export default function AboutPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          About DogeGiFty
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}>
          We're building the future of digital gifting, making it easy and safe to share crypto assets with the people you care about.
        </Typography>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              DogeGiFty was founded with a simple belief: sharing digital assets should be as easy as sending a text message. 
              We're building the infrastructure to make crypto gifting accessible to everyone, regardless of their technical expertise.
            </Typography>
            <Typography variant="body1">
              Our platform combines the security of blockchain technology with the simplicity of traditional gift cards, 
              creating a seamless experience for both senders and recipients.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Values
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip label="Security First" color="primary" />
              <Chip label="User-Centric" color="primary" />
              <Chip label="Transparency" color="primary" />
              <Chip label="Innovation" color="primary" />
            </Box>
            <Typography variant="body1">
              Every decision we make is guided by these core values. We believe that trust is earned through 
              transparency, security, and putting our users' needs first.
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {team.map((member) => (
            <Grid item xs={12} md={4} key={member.name}>
              <Card>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Avatar
                    sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                    src={member.avatar}
                    alt={member.name}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography color="primary" sx={{ mb: 2 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ bgcolor: 'primary.50' }}>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Join Our Journey
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              We're always looking for talented individuals who share our vision of making crypto accessible to everyone.
            </Typography>
            <Chip label="View Open Positions" clickable variant="outlined" />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}