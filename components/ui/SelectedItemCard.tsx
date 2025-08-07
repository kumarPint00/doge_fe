'use client';
import Image from 'next/image';
import {
  Paper,
  Grid,
  IconButton,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GiftItem } from '@/types/gift';

export default function SelectedItemsCard({
  items,
  onRemove,
}: {
  items: GiftItem[];
  onRemove: (id: string) => void;
}) {
  if (!items.length) return null;

  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={2}>
        Items in Pack
      </Typography>

      <Stack gap={1.5}>
        {items.map((i) => (
          <Grid container alignItems="center" key={i.id} spacing={1}>
            {/* thumbnail */}
            <Grid item>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'grey.100',
                }}
              >
                <Image
                  src={i.image || '/placeholder.png'}
                  alt={i.name}
                  width={36}
                  height={36}
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Grid>

            {/* title + amount */}
            <Grid item xs>
              <Typography fontSize={14}>
                {i.name}
                {i.amount ? ` × ${i.amount}` : ''}
              </Typography>
            </Grid>

            {/* remove button */}
            <Grid item>
              <IconButton size="small" onClick={() => onRemove(i.id)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Stack>
    </Paper>
  );
}
