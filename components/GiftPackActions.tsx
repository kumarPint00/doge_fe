'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';

export default function GiftPackActions() {
  const theme = useTheme();
  const router = useRouter();

  const handleCreateGift = () => {
    router.push('/create');
  };

  const handleClaimGift = () => {
    router.push('/claim');
  };

  return (
    <Box
      component="section"
      sx={{
        background: theme.palette.background.gradient,
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          {/* Create a Gift Pack Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: 'white',
                borderRadius: 4,
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={handleCreateGift}
            >
              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      color: 'white',
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                    }}
                  >
                    Create a Gift Pack
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    Choose an amount, add a message, and send crypto as a unique digital gift.
                  </Typography>
                </Box>

                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: '#ec4899',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '1rem',
                      '&:hover': {
                        bgcolor: '#db2777',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Start Gifting
                  </Button>
                </Box>

                {/* Decorative Gift Box */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    width: 180,
                    height: 180,
                    background: 'linear-gradient(45deg, #f472b6 0%, #ec4899 100%)',
                    borderRadius: 2,
                    transform: 'rotate(15deg)',
                    opacity: 0.8,
                    zIndex: 1,
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Claim a Gift Pack Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)',
                color: '#7c2d12',
                borderRadius: 4,
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={handleClaimGift}
            >
              <CardContent
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      color: '#ec4899',
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                    }}
                  >
                    Claim a Gift Pack
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      color: '#7c2d12',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    Your gift is ready to claim. Just follow a few steps to unlock it.
                  </Typography>
                </Box>

                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: '#3b82f6',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 700,
                      fontSize: '1rem',
                      '&:hover': {
                        bgcolor: '#2563eb',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Start Claiming
                  </Button>
                </Box>

                {/* Decorative Heart */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 30,
                    width: 80,
                    height: 80,
                    background: '#3b82f6',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    transform: 'rotate(-45deg)',
                    opacity: 0.9,
                    zIndex: 1,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      left: 0,
                      width: 40,
                      height: 40,
                      bgcolor: '#3b82f6',
                      borderRadius: '50%',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      right: 0,
                      width: 40,
                      height: 40,
                      bgcolor: '#3b82f6',
                      borderRadius: '50%',
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}