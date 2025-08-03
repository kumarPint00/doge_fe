'use client';
import useSWR from 'swr';
import qs from 'qs';

const ALCHEMY = process.env.NEXT_PUBLIC_ALCHEMY_KEY!;

async function fetchNfts(addr: string) {
  const query = qs.stringify({ owner: addr, pageSize: 40 });
  const url   = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY}/getNFTs?${query}`;
  const res   = await fetch(url, { cache: 'no-store' });
  const json  = await res.json();

    const toHttp = (u: string) =>
    u.startsWith('ipfs://')
      ? `https://ipfs.io/ipfs/${u.slice(7)}`
      : u;

  return json.ownedNfts.map((n: any) => ({
    id: `${n.contract.address}:${n.tokenId}`,
    name: n.title || `#${n.tokenId}`,
    image:
      toHttp(n.media[0]?.gateway || n.media[0]?.raw || '') ||
      '/placeholder.png',
    usd: 0,
  }));
}

export default function useWalletNfts(addr: string | null) {
  const { data, error, isLoading } = useSWR(
    addr ? ['nfts', addr] : null,
    () => fetchNfts(addr!),
    { refreshInterval: 3 * 60_000 },
  );

  return { nfts: data ?? [], error, loading: isLoading };
}
