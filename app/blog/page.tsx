import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
} from '@mui/material';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'The Future of Digital Gifting',
    excerpt: 'Exploring how blockchain technology is revolutionizing the way we share value with loved ones.',
    category: 'Industry',
    readTime: '5 min read',
    date: '2024-01-15',
    image: '/blog/future-gifting.jpg',
    slug: 'future-of-digital-gifting'
  },
  {
    title: 'Security Best Practices for Crypto Gifts',
    excerpt: 'Learn how to protect yourself and your recipients when sending crypto gifts.',
    category: 'Security',
    readTime: '7 min read',
    date: '2024-01-10',
    image: '/blog/security-practices.jpg',
    slug: 'security-best-practices'
  },
  {
    title: 'Introducing Gasless Claims',
    excerpt: 'Recipients can now claim gifts without paying gas fees. Here\'s how it works.',
    category: 'Product',
    readTime: '4 min read',
    date: '2024-01-05',
    image: '/blog/gasless-claims.jpg',
    slug: 'introducing-gasless-claims'
  }
];

export default function BlogPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Blog
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Insights, updates, and stories from the DogeGiFty team
        </Typography>

        <Grid container spacing={4}>
          {blogPosts.map((post) => (
            <Grid item xs={12} md={6} lg={4} key={post.slug}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography color="text.secondary">
                    {post.title}
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip label={post.category} size="small" color="primary" />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {post.date} • {post.readTime}
                    </Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {post.excerpt}
                  </Typography>
                  <Button
                    component={Link}
                    href={`/blog/${post.slug}`}
                    variant="outlined"
                    size="small"
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="outlined" size="large">
            Load More Posts
          </Button>
        </Box>
      </Box>
    </Container>
  );
}