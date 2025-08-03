import { EscrowProvider } from '@/context/EscrowContext';
import ThemeRegistry from '@/components/ThemeRegistry';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { WalletProvider } from '@/context/WalletContext';

export const metadata: Metadata = {
  title: 'DogeGiFty',
  description: 'Send Kindness, Onchain.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <EscrowProvider>
            <WalletProvider>
              <Navbar />
              {children}
              <Footer />
            </WalletProvider>
          </EscrowProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
