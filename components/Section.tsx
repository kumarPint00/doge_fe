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
        /* Default background gradient shared by Hero and GiftCards */
        background:
          'radial-gradient(circle at 0% 0%, #f9dfb6 0%, rgba(249,223,182,0) 45%), #fff7fb',
        py: { xs: 6, md: 8 },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
