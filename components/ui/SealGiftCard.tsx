'use client';
import {
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Box,
  Stack,
  Link,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

interface Props {
  loading: boolean;
  disabled: boolean;
  secretCode: string | null;   // <- gets set by parent after sealPack()
  onGenerate: () => void;
}

export default function SealGiftCard({
  loading,
  disabled,
  secretCode,
  onGenerate,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!secretCode) return;
    navigator.clipboard.writeText(secretCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} fontSize={22} mb={1}>
        Seal the Gift
      </Typography>

      <Typography fontSize={14} color="text.secondary" mb={4} maxWidth={450}>
        We’ll create a unique secret code for you. Share this code with someone
        privately—they’ll need it to claim the gift.
      </Typography>

      {/* always-visible button */}
      <Stack alignItems="center" mb={secretCode ? 4 : 0}>
        <Button
          variant="contained"
          disabled={disabled || loading}
          onClick={onGenerate}
          sx={{
            bgcolor: '#0B7EFF',
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 999,
            width: 230,
            py: 1.2,
            '&:hover': { bgcolor: '#0068ff' },
          }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Generate Code'}
        </Button>
      </Stack>

      {/* show this *only* after parent supplies secretCode */}
      {secretCode && (
        <>
          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" textAlign="center" mb={1}>
            Hurray!
          </Typography>
          <Typography
            textAlign="center"
            fontSize={14}
            maxWidth={420}
            mx="auto"
            mb={3}
          >
            Your pack is now sealed in escrow. Only the person with this code
            can open it.
          </Typography>

          <Box
            sx={{
              bgcolor: '#f2f2f2',
              borderRadius: 1,
              px: 6,
              py: 2,
              mx: 'auto',
              fontWeight: 800,
              letterSpacing: 1,
              fontSize: 20,
              mb: 1.5,
              width: 'fit-content',
            }}
          >
            {secretCode}
          </Box>

          <Stack direction="row" justifyContent="center" spacing={0.5}>
            {copied ? (
              <Typography color="primary.main" fontWeight={700} fontSize={14}>
                Copied!
              </Typography>
            ) : (
              <>
                <Link
                  component="button"
                  fontSize={14}
                  underline="hover"
                  onClick={copy}
                >
                  Copy&nbsp;Secret&nbsp;Code
                </Link>
                <ContentCopyIcon fontSize="small" sx={{ color: 'primary.main' }} />
              </>
            )}
          </Stack>
        </>
      )}
    </Paper>
  );
}
