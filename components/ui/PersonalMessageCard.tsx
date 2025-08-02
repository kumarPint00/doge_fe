'use client';
import { Paper, Typography, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (msg: string) => void;
}

/**
 * Card-style textarea that matches the mock:
 * – bold headline
 * – helper subtitle
 * – large rounded textarea
 */
export default function PersonalMessageCard({ value, onChange }: Props) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} fontSize={22} mb={1}>
        Let’s Make it&nbsp;Personalize
      </Typography>

      <Typography fontSize={14} color="text.secondary" mb={3}>
        Write something meaningful, playful, or mysterious. It’s your message, your vibe.
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="You’ve been amazing lately. Here’s a little surprise."
        value={value}
        onChange={handle}
        sx={{
          '& .MuiOutlinedInput-root': { borderRadius: 3 },
        }}
      />
    </Paper>
  );
}
