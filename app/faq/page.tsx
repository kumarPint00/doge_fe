import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: 'How does DogeGiFty work?',
    answer: 'DogeGiFty allows you to create gift packs containing crypto assets, generate a unique code, and share it with recipients who can claim the gifts using their wallet.'
  },
  {
    question: 'Is it safe to use DogeGiFty?',
    answer: 'Yes, DogeGiFty uses audited smart contracts and secure escrow systems to protect your assets. All transactions are secured by blockchain technology.'
  },
  {
    question: 'What tokens can I send as gifts?',
    answer: 'You can send any ERC-20 tokens and NFTs that are supported on our platform. We regularly add support for new tokens based on user demand.'
  },
  {
    question: 'Do recipients need crypto experience?',
    answer: 'No! Recipients just need to connect a wallet and enter the gift code. We provide step-by-step guidance for new users.'
  },
  {
    question: 'Are there any fees?',
    answer: 'We charge a small service fee for creating gift packs. Recipients can claim gifts without paying gas fees thanks to our gasless claiming system.'
  },
  {
    question: 'What happens if a gift is not claimed?',
    answer: 'Unclaimed gifts can be reclaimed by the sender after a specified time period (usually 30 days).'
  },
  {
    question: 'Can I cancel a gift after sending it?',
    answer: 'Yes, you can cancel unclaimed gifts and get your assets back. Once claimed, gifts cannot be reversed.'
  },
  {
    question: 'Is DogeGiFty available worldwide?',
    answer: 'DogeGiFty is available in most countries. However, some features may not be available in certain jurisdictions due to local regulations.'
  }
];

export default function FAQPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Find answers to common questions about DogeGiFty
        </Typography>

        <Card>
          <CardContent sx={{ p: 0 }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>

        <Card sx={{ mt: 6, bgcolor: 'primary.50' }}>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Still Have Questions?
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Our support team is here to help you get the most out of DogeGiFty.
            </Typography>
            <Typography variant="body1">
              Contact us at support@dogegifty.com or join our community Discord.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}