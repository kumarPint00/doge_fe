'use client';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { GiftItem } from '@/types/gift';   

export interface NftGalleryProps {
  nfts: GiftItem[];          
  selectedIds: string[];
  onToggle: (n: GiftItem) => void;
}

export default function NftGallery({ nfts, selectedIds, onToggle }: NftGalleryProps) {
  if (!nfts.length) {
    return (
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography textAlign="center">No NFTs found in wallet.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 4, borderRadius: 4 }}>
      <Typography fontWeight={700} mb={3} fontSize={20}>
        Select NFT
      </Typography>

      <Grid container spacing={3}>
        {nfts.map((n) => {
          const added = selectedIds.includes(n.id);
          return (
            <Grid item xs={6} md={3} key={n.id}>
              <Box textAlign="center">
                <Box
                  sx={{
                    mb: 1.5,
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: added ? 4 : 2,
                  }}
                >
                  <Image
                    src={n.image || '/placeholder.png'}
                    alt={n.name}
                    width={160}
                    height={160}
                    style={{ width: '100%', height: 'auto' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/placeholder.png';
                    }}
                  />
                </Box>

                <Typography fontSize={14} fontWeight={600} noWrap>
                  {n.name}
                </Typography>
                <Typography fontSize={13} color="text.secondary" mb={1}>
                  ${n.usd.toFixed(2)}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: added ? 'error.main' : '#0B7EFF',
                    borderRadius: 999,
                    textTransform: 'none',
                    fontWeight: 700,
                    '&:hover': { bgcolor: added ? 'error.dark' : '#0068ff' },
                  }}
                  onClick={() => onToggle(n)}
                >
                  {added ? 'Remove' : 'Add'}
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
