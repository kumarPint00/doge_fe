'use client';
import {
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { GiftItem } from '@/types/gift';
import TokenPickerV2 from './TokenS';

interface Props {
  tokens: GiftItem[];
  onAdd: (i: GiftItem & { amount: number }) => void;
}

export default function TokenAddCard({ tokens, onAdd }: Props) {
  const [tokenId, setTokenId] = useState('');
  const [amount,  setAmount]  = useState('');

  const handleAdd = () => {
    const token = tokens.find((t) => t.id === tokenId);
    if (!token || !amount) return;
    onAdd({ ...token, amount: Number(amount) });
    setTokenId('');
    setAmount('');
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={2}>
        Select Token
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          {/* <Select
            fullWidth
            value={tokenId}
            displayEmpty
            onChange={(e) => setTokenId(e.target.value as string)}
            sx={{ borderRadius: 3 }}
          >
            <MenuItem value="">
              <em>Select Token</em>
            </MenuItem>
            {tokens.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select> */}
          <TokenPickerV2
            tokens={tokens}
            selected={tokens.find((t) => t.id === tokenId) || null}
            onAdd={(t) => {
              setTokenId(t.id);
              setAmount('');
            }}
            onRemove={(id) => {
              if (id === tokenId) {
                setTokenId('');
                setAmount('');
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Enter Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ borderRadius: 3 }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{
          bgcolor: '#0B7EFF',
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 999,
          px: 3,
          '&:hover': { bgcolor: '#0068ff' },
        }}
      >
        Add Another Item
      </Button>
    </Paper>
  );
}
