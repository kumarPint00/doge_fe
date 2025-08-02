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
  onAdd: (item: GiftItem & { amount: number }) => void;
}

export default function TokenAddCard({ tokens, onAdd }: Props) {
  const [tokenId, setTokenId] = useState('');
  const [amount, setAmount] = useState('');

  const handle = () => {
    const t = tokens.find((x) => x.id === tokenId);
    if (!t || !amount) return;
    onAdd({ ...t, amount: Number(amount) });
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
          {/* <Select
            fullWidth
            value={tokenId}
            displayEmpty
            onChange={(e) => setTokenId(e.target.value as string)}
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
        onClick={handle}
      >
        Add Another Item
      </Button>
    </Paper>
  );
}
