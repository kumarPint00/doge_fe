'use client';
import {
  Paper,
  Grid,
  IconButton,
  Typography,
  Stack,
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

      <Stack gap={1}>
        {items.map((i) => (
          <Grid container alignItems="center" key={i.id}>
            <Grid item xs>
              • {i.name} {i.amount && `× ${i.amount}`}
            </Grid>
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
