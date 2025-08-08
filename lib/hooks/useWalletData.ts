import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { connectWallet } from '@/lib/wallet';
import { getUsdPrices } from '@/lib/prices';
import { getEthBalance } from '../balance';
import { getWalletNfts } from '../nft';

export default function useWalletData() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [address, setAddress] = useState('');
  const [ethBal, setEthBal] = useState<number>();
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [nfts, setNfts] = useState<any[]>([]);

  const connect = async () => {
    const { provider, address } = await connectWallet();
    setProvider(provider);
    setAddress(address);
  };

  useEffect(() => {
    (async () => {
      const raw: any = await detectEthereumProvider();
      if (raw?.selectedAddress) {
        const p = new ethers.BrowserProvider(raw);
        setProvider(p);
        setAddress(raw.selectedAddress);
        raw.on?.('accountsChanged', (accs: string[]) =>
          setAddress(accs?.[0] || '')
        );
        raw.on?.('chainChanged', () => location.reload());
      }
    })();
  }, []);

  useEffect(() => {
    if (!provider || !address) return;
    (async () => {
      setEthBal(await getEthBalance(provider, address));
      const priceMap = await getUsdPrices(['ethereum', 'dogecoin']);
      setPrices({ eth: priceMap.ethereum.usd, doge: priceMap.dogecoin.usd });
      try {
        const list = await getWalletNfts(address);
        const mapped = list.map((n: any) => ({
          // Preserve old shape expectations used elsewhere if any
          contract: { address: n.contract?.address },
          tokenId: n.tokenId || n.id?.tokenId,
          media: [{ gateway: n.image?.cachedUrl || n.image?.originalUrl || n.metadata?.image || '' }],
          title: n.name || n.title,
        }));
        setNfts(mapped);
      } catch {
        setNfts([]);
      }
    })();
  }, [provider, address]);

  return { connect, connected: !!address, address, ethBal, prices, nfts };
}
