'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

interface WalletCtx {
  provider: ethers.BrowserProvider | null;
  address:  string | null;
  connect:  () => Promise<void>;
}

/* default stub */
const Ctx = createContext<WalletCtx>({
  provider: null,
  address:  null,
  connect:  async () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [provider, setProv] = useState<ethers.BrowserProvider | null>(null);
  const [address,  setAddr] = useState<string | null>(null);

  /* one-shot connect */
  const connect = async () => {
    const raw = (await detectEthereumProvider()) as any;
    if (!raw) throw new Error('MetaMask not found');
    const p = new ethers.BrowserProvider(raw);
    const [addr] = await p.send('eth_requestAccounts', []);
    setProv(p);
    setAddr(addr);

    /* refresh on account / network change */
    raw.on('accountsChanged', () => location.reload());
    raw.on('chainChanged', () => location.reload());
  };

  /* auto-connect if already authorised */
  useEffect(() => {
    (async () => {
      const raw: any = await detectEthereumProvider();
      if (raw && raw.selectedAddress) {
        const p = new ethers.BrowserProvider(raw);
        setProv(p);
        setAddr(raw.selectedAddress);
      }
    })();
  }, []);

  return (
    <Ctx.Provider value={{ provider, address, connect }}>
      {children}
    </Ctx.Provider>
  );
}

/* convenient hook */
export function useWallet() {
  return useContext(Ctx);
}
