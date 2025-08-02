import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

export type MetaMaskProvider = ethers.BrowserProvider;

export async function connectWallet() {
  const raw = (await detectEthereumProvider()) as any;
  if (!raw) throw new Error('MetaMask not found');
  const provider = new ethers.BrowserProvider(raw);
  const [address] = await provider.send('eth_requestAccounts', []);
  return { provider, address };
}

export const formatAddress = (a: string) => a.slice(0, 6) + '…' + a.slice(-4);
