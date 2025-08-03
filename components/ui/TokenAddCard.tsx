'use client';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Token } from '@/types/token';           // { id,name,symbol,image,balance,usd }
import TokenPickerV2 from './TokenS';

interface Props {
  tokens: Token[];                               // live wallet tokens from useWalletTokens
  loading: boolean;                              // pass loading flag so we can show spinner
  onAdd: (item: Token & { amount: number }) => void;
}

export default function TokenAddCard({ tokens, loading, onAdd }: Props) {
  const [tokenId, setTokenId] = useState('');
  const [amount,  setAmount]  = useState('');

  const selected = tokens.find((t) => t.id === tokenId) || null;
  const amountNum = Number(amount);

  const handleAdd = () => {
    if (!selected || !amountNum) return;
    onAdd({ ...selected, amount: amountNum });
    setTokenId('');
    setAmount('');
  };

  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={2}>
        Select Token
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {loading && !tokens.length ? (
            <CircularProgress size={28} />
          ) : (
            <TokenPickerV2
              selected={selected}
              onAdd={(t) => setTokenId(t.id)}
              onRemove={() => setTokenId('')}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Enter Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        fullWidth
        startIcon={<AddIcon />}
        sx={{
          mt: 3,
          bgcolor: '#0B7EFF',
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 700,
          '&:hover': { bgcolor: '#0068ff' },
        }}
        disabled={!selected || !amountNum}
        onClick={handleAdd}
      >
        Add Another Item
      </Button>
    </Paper>
  );
}
