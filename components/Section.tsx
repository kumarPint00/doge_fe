'use client';
import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export default function Section({
  children,
  sx = {},
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      component="section"
      sx={{
        /* 🌅 default background wash */
        background:
          'radial-gradient(circle at 0 20%, #fde7c3 0%, rgba(253,231,195,0) 60%), ' +
          'radial-gradient(circle at 100% 80%, #ffd6e8 0%, rgba(255,214,232,0) 55%)',
        py: { xs: 6, md: 8 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
