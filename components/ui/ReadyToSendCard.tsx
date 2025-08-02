'use client';
import {
  Paper,
  Typography,
  Stack,
  Avatar,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { GiftItem } from '@/types/gift';

interface Props {
  items: GiftItem[];       
  message: string;
  secretCode: string;
  onConfirm: () => void;
  disabled?: boolean;
}

/**
 * Full-width confirmation panel that matches the “Ready to Send?” mock:
 * – headline
 * – compact pill showing the first token + first NFT
 * – message line
 * – grey code box
 * – big blue confirm button
 * – footnote
 */
export default function ReadyToSendCard({
  items,
  message,
  secretCode,
  onConfirm,
  disabled = false,
}: Props) {
  const firstToken = items.find((i) => i.type === 'ERC20');
  const firstNft   = items.find((i) => i.type === 'NFT');

  return (
    <Paper sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight={800} mb={4}>
        Ready to Send?
      </Typography>

      <Typography fontWeight={700} mb={1}>
        Item Added to Gift Pack
      </Typography>

      {/* token + nft preview row */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        mb={5}
      >
        {/* total USD placeholder */} 
        <Typography variant="h5" fontWeight={800}>
          ${firstToken?.amount ? (firstToken.amount * 1000).toFixed(0) : '—'}
        </Typography>

        {firstToken && (
          <>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar src={firstToken.image} sx={{ width: 28, height: 28 }} />
              <Box>
                <Typography fontSize={14} fontWeight={600}>
                  {firstToken.symbol}
                </Typography>
                <Typography fontSize={12} color="text.secondary">
                  {firstToken.amount ?? ''} &nbsp;${firstToken.usd ?? ''}
                </Typography>
              </Box>
            </Stack>
          </>
        )}

        {firstNft && (
          <>
            <Divider orientation="vertical" flexItem />
            <Avatar src={firstNft.image} sx={{ width: 36, height: 36 }} />
          </>
        )}
      </Stack>

      {/* message */}
      <Typography fontWeight={700} mb={1}>
        Message
      </Typography>
      <Typography
        sx={{
          bgcolor: '#fafafa',
          borderRadius: 1,
          px: 3,
          py: 1.5,
          mx: 'auto',
          maxWidth: 400,
          mb: 4,
        }}
      >
        {message || '—'}
      </Typography>

      {/* secret code */}
      <Typography fontWeight={700} mb={1}>
        Secret Code
      </Typography>
      <Box
        sx={{
          bgcolor: '#eeeeee',
          borderRadius: 1,
          px: 6,
          py: 2,
          mx: 'auto',
          display: 'inline-block',
          fontWeight: 800,
          letterSpacing: 1,
          fontSize: 20,
          mb: 4,
        }}
      >
        {secretCode}
      </Box>

      {/* confirm */}
      <Button
        variant="contained"
        size="large"
        onClick={onConfirm}
        disabled={disabled}
        sx={{
          bgcolor: '#0B7EFF',
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 999,
          px: 6,
          py: 1.25,
          '&:hover': { bgcolor: '#0068ff' },
        }}
      >
        Confirm &amp; Lock Gift Pack
      </Button>

      <Typography
        fontSize={12}
        color="text.secondary"
        mt={3}
        maxWidth={260}
        mx="auto"
      >
        Your gift will be stored on-chain in escrow. Only the person with the
        code can unlock and claim it.
      </Typography>
    </Paper>
  );
}
