'use client';

import { PropsWithChildren, useMemo } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/lib/theme';

export default function ThemeRegistry({ children }: PropsWithChildren) {
  const cache = useMemo(() => {
    const c = createCache({ key: 'mui' });
    c.compat = true;
    return c;
  }, []);
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
