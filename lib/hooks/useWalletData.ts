import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { connectWallet } from '@/lib/wallet';
import { getUsdPrices } from '@/lib/prices';
import { getEthBalance } from '../balance';
import { getWalletNfts } from '../nft';

export default function useWalletData() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address,  setAddress]  = useState('');
  const [ethBal,   setEthBal]   = useState<number>();
  const [prices,   setPrices]   = useState<Record<string, number>>({});
  const [nfts,     setNfts]     = useState<any[]>([]);

  /* connect once */
  const connect = async () => {
    const { provider, address } = await connectWallet();
    setProvider(provider);
    setAddress(address);
  };

  /* pull data when address present */
  useEffect(() => {
    if (!provider || !address) return;

    (async () => {
      setEthBal(await getEthBalance(provider, address));

      const priceMap = await getUsdPrices(['ethereum', 'dogecoin']);
      setPrices({
        eth: priceMap.ethereum.usd,
        doge: priceMap.dogecoin.usd,
      });

      setNfts(await getWalletNfts(address));
    })();
  }, [provider, address]);

  return {
    connect,
    connected: !!address,
    address,
    ethBal,
    prices,
    nfts,
  };
}
