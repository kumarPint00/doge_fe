'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useState } from 'react';
import { useSubmitClaim, useClaimStatus } from '@/hooks/useClaim';
import { useGiftPack } from '@/hooks/useGiftPacks';

interface ClaimGiftFormProps {
  walletAddress?: string;
}

export default function ClaimGiftForm({ walletAddress }: ClaimGiftFormProps) {
  const [giftId, setGiftId] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const { data: giftPack, isLoading: isLoadingGift } = useGiftPack(giftId);
  const { data: claimStatus } = useClaimStatus(claimSubmitted ? giftId : undefined);
  const submitClaim = useSubmitClaim();

  const handleSubmitClaim = async () => {
    if (!walletAddress || !giftId) return;

    try {
      await submitClaim.mutateAsync({
        giftId,
        recipientAddress: walletAddress,
      });
      setClaimSubmitted(true);
    } catch (error) {
      console.error('Failed to submit claim:', error);
    }
  };

  const getActiveStep = () => {
    if (!claimSubmitted) return 0;
    if (claimStatus?.status === 'pending') return 1;
    if (claimStatus?.status === 'processing') return 2;
    if (claimStatus?.status === 'completed') return 3;
    return 0;
  };

  const steps = ['Enter Gift ID', 'Claim Submitted', 'Processing', 'Completed'];

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Claim Your Gift
        </Typography>

        <Card>
          <CardContent>
            {!claimSubmitted ? (
              <>
                <TextField
                  fullWidth
                  label="Gift Pack ID"
                  value={giftId}
                  onChange={(e) => setGiftId(e.target.value)}
                  placeholder="Enter the gift pack ID..."
                  sx={{ mb: 3 }}
                />

                {giftPack && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6">Gift Pack Preview</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {giftPack.title || 'Untitled Gift Pack'}
                    </Typography>
                    <Typography variant="body2">
                      Items: {giftPack.items.length}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  onClick={handleSubmitClaim}
                  disabled={!giftId || !walletAddress || submitClaim.isPending || isLoadingGift}
                  startIcon={submitClaim.isPending ? <CircularProgress size={20} /> : null}
                >
                  Claim Gift Pack
                </Button>
              </>
            ) : (
              <Box>
                <Stepper activeStep={getActiveStep()} sx={{ mb: 4 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {claimStatus && (
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Claim Status: {claimStatus.status}
                    </Typography>
                    
                    {claimStatus.transactionHash && (
                      <Typography variant="body2">
                        Transaction: {claimStatus.transactionHash}
                      </Typography>
                    )}

                    {claimStatus.status === 'completed' && (
                      <Alert severity="success">
                        Gift successfully claimed! Check your wallet.
                      </Alert>
                    )}

                    {claimStatus.status === 'failed' && (
                      <Alert severity="error">
                        Claim failed: {claimStatus.error}
                      </Alert>
                    )}
                  </Box>
                )}
              </Box>
            )}

            {submitClaim.isError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Failed to submit claim. Please try again.
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}