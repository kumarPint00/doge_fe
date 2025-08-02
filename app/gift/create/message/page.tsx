'use client';
import { Box, Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import EscrowContext from '@/context/EscrowContext';
import StepIndicator from '@/components/ui/StepIndicator';
import { useRouter } from 'next/navigation';

export default function MessagePage() {
  const router = useRouter();
  const [state, dispatch] = useContext(EscrowContext)!;
  const [msg, setMsg] = useState(state.message || '');

  return (
    <Box maxWidth={600} mx="auto" px={2} py={4}>
      <StepIndicator activeStep={1} />
      <TextField fullWidth multiline rows={4} label="Personal Message" value={msg}
        onChange={e => setMsg(e.target.value)} />
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => { dispatch({ type: 'setMessage', message: msg }); router.push('/gift/create/seal'); }}>
        Next
      </Button>
    </Box>
  );
}
