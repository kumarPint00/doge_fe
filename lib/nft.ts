const KEY   = process.env.NEXT_PUBLIC_ALCHEMY_KEY!;
const CHAIN = 'ethereum';        

export async function getWalletNfts(address: string) {
  const url =
    `https://${CHAIN}.g.alchemy.com/v2/${KEY}/getNFTs/?owner=${address}&pageSize=30`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('NFT fetch');
  const json = await res.json();
  return json.ownedNfts as any[];
}
