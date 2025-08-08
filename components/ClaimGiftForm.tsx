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
  Chip,
} from '@mui/material';
import { useState, useEffect } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { useSubmitClaim, useClaimStatus } from '@/hooks/useClaim';
import { useGiftPackByCode, useLocalGiftVerification } from '@/hooks/useGiftPacks';
import { useLocalGiftPacks } from '@/hooks/useLocalGiftPacks';

interface ClaimGiftFormProps {
  walletAddress?: string;
}

export default function ClaimGiftForm({ walletAddress }: ClaimGiftFormProps) {
  const [giftCode, setGiftCode] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [localVerification, setLocalVerification] = useState<any>(null);

  const { data: giftPack, isLoading: isLoadingGift } = useGiftPackByCode(giftCode);
  const { data: claimStatus } = useClaimStatus(claimSubmitted ? giftCode : undefined);
  const { verifyGiftPack } = useLocalGiftVerification();
  const { updateGiftPackStatus } = useLocalGiftPacks();
  const submitClaim = useSubmitClaim();

  // Verify gift pack locally when code changes
  useEffect(() => {
    if (giftCode && giftCode.length >= 8) {
      const verification = verifyGiftPack(giftCode);
      setLocalVerification(verification);
    } else {
      setLocalVerification(null);
    }
  }, [giftCode, verifyGiftPack]);

  const handleSubmitClaim = async () => {
    if (!walletAddress || !giftCode) return;

    try {
      // If it's a local gift, update its status
      if (localVerification?.isLocal && localVerification.giftPack) {
        updateGiftPackStatus(localVerification.giftPack.id, 'claimed');
      }

      await submitClaim.mutateAsync({
        giftId: giftCode,
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

  const steps = ['Enter Gift Code', 'Claim Submitted', 'Processing', 'Completed'];

  const renderVerificationStatus = () => {
    if (!localVerification) return null;

    if (localVerification.isLocal) {
      return (
        <Alert 
          severity={localVerification.verification === 'verified' ? 'success' : 'warning'}
          icon={<LocalFireDepartmentIcon />}
          sx={{ mb: 2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">
              {localVerification.verification === 'verified' 
                ? 'Gift verified locally - Created in this browser'
                : 'Local gift found but may be invalid or expired'
              }
            </Typography>
            <Chip 
              label="Local Gift" 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          </Box>
        </Alert>
      );
    }

    return null;
  };

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
                  label="Gift Code"
                  value={giftCode}
                  onChange={(e) => setGiftCode(e.target.value)}
                  placeholder="Enter the gift code..."
                  sx={{ mb: 2 }}
                  helperText="Enter the gift code shared with you"
                />

                {renderVerificationStatus()}

                {giftPack && (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6">Gift Pack Preview</Typography>
                      {(giftPack as any).source === 'local' && (
                        <Chip 
                          label="Local" 
                          size="small" 
                          color="primary" 
                          icon={<VerifiedIcon />}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {giftPack.title || 'Untitled Gift Pack'}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Items: {giftPack.items?.length || 0}
                    </Typography>
                    {giftPack.description && (
                      <Typography variant="body2" color="text.secondary">
                        {giftPack.description}
                      </Typography>
                    )}
                  </Box>
                )}

                <Button
                  variant="contained"
                  onClick={handleSubmitClaim}
                  disabled={
                    !giftCode || 
                    !walletAddress || 
                    submitClaim.isPending || 
                    isLoadingGift ||
                    (localVerification?.isLocal && localVerification.verification !== 'verified')
                  }
                  startIcon={submitClaim.isPending ? <CircularProgress size={20} /> : null}
                  fullWidth
                >
                  {localVerification?.isLocal 
                    ? 'Claim Local Gift Pack' 
                    : 'Claim Gift Pack'
                  }
                </Button>

                {localVerification?.isLocal && localVerification.verification !== 'verified' && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    This local gift pack appears to be invalid or expired and cannot be claimed.
                  </Alert>
                )}
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
                      <Typography variant="body2" gutterBottom>
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