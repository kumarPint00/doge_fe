import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

export default function BalanceFetcher() {
  const [address, setAddress] = useState('');
  const [eth, setEth] = useState<string | null>(null);

  const fetchBalance = async () => {
    // 1. ask MetaMask to expose window.ethereum
    const rawProvider: any = await detectEthereumProvider({ mustBeMetaMask: true });
    if (!rawProvider) return alert('MetaMask not installed');

    // 2. request accounts
    const provider = new ethers.BrowserProvider(rawProvider);
    const [wallet] = await provider.send('eth_requestAccounts', []);
    setAddress(wallet);

    // 3. fetch balance
    const wei   = await provider.getBalance(wallet);
    const ether = ethers.formatEther(wei);
    setEth(parseFloat(ether).toFixed(4));
  };

  return (
    <>
      <button onClick={fetchBalance}>Connect & Fetch Balance</button>
      {eth && (
        <p>
          Address: {address.slice(0, 6)}…{address.slice(-4)} <br />
          Balance: {eth} ETH
        </p>
      )}
    </>
  );
}
