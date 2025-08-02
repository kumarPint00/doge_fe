'use client';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import EscrowContext from '@/context/EscrowContext';
import TokenCard from '@/components/ui/TokenCard';
import SelectedList from '@/components/ui/SelectedList';
import { GiftItem } from '@/types/gift';
import StepIndicator from '@/components/ui/StepIndicator';
import { useRouter } from 'next/navigation';

const dummy: GiftItem[] = [
  { id: '1', name: 'USDC', symbol: 'USDC', type: 'ERC20', amount: 1, image: '/usdc.png' },
  { id: '2', name: 'DogeGF', symbol: 'DOGEGF', type: 'ERC20', amount: 1000, image: '/dogegf.png' },
  { id: '3', name: 'Cool Cat #123', type: 'NFT', image: '/nft.png' }
];

export default function SelectPage() {
  const router = useRouter();
  const [state, dispatch] = useContext(EscrowContext)!;

  const toggle = (item: GiftItem) =>
    dispatch({ type: state.items.find(i => i.id === item.id) ? 'remove' : 'add', item, id: item.id } as any);

  return (
    <Box maxWidth={900} mx="auto" px={2} py={4}>
      <StepIndicator activeStep={0} />
      <Grid container spacing={2}>
        {dummy.map(d => (
          <Grid item xs={12} sm={4} key={d.id}>
            <TokenCard item={d} selected={!!state.items.find(i => i.id === d.id)} onToggle={toggle} />
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Typography variant="h6">Selected Items ({state.items.length})</Typography>
        <SelectedList items={state.items} onRemove={(id) => dispatch({ type: 'remove', id } as any)} />
        <Button variant="contained" disabled={state.items.length === 0} sx={{ mt: 3 }}
          onClick={() => router.push('/gift/create/message')}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
