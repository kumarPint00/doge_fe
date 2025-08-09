'use client';
import useSWR from 'swr';
import { ethers, Contract } from 'ethers';
import { ERC20_LIST, type Erc20Meta } from '@/lib/tokenList';
import erc20Abi from '@/lib/erc20Abi.json';
import { getUsdPrices } from '@/lib/prices';

import { Token } from '@/types/token';

async function getEthEntry(provider: ethers.BrowserProvider, address: string, ethUsd: number): Promise<Token> {
  const wei = await provider.getBalance(address);
  const balance = Number(ethers.formatEther(wei));
  return {
    id: 'eth-native',
    name: 'Ethereum',
    symbol: 'ETH',
    address: 'native',
    decimals: 18,
    chainId: 1,
    balance,
    usd: balance * (ethUsd || 0),
    image: '/eth.png',
    type: 'ERC20',
    isNative: true,
  };
}

async function getErc20Entry(p: ethers.BrowserProvider, wallet: string, meta: Erc20Meta, usdPrice: number): Promise<Token | null> {
  try {
    const c = new Contract(meta.address, erc20Abi, p);
    const balRaw = await c.balanceOf(wallet);
    const balance = parseFloat(ethers.formatUnits(balRaw, meta.decimals));
    if (balance <= 0) return null;
    return {
      id: meta.address.toLowerCase(),
      name: meta.name,
      symbol: meta.symbol,
      address: meta.address,
      decimals: meta.decimals,
      chainId: 1,
      balance,
      usd: balance * (usdPrice || 0),
      image: meta.image,
      type: 'ERC20',
    };
  } catch {
    return null;
  }
}

async function fetchWalletTokens(provider: ethers.BrowserProvider, address: string): Promise<Token[]> {
  // Fetch prices for ETH and our curated list
  const ids = ['ethereum', ...Array.from(new Set(ERC20_LIST.map(t => t.coingeckoId)))];
  const priceMap = await getUsdPrices(ids);
  const ethUsd = priceMap?.ethereum?.usd ?? 0;

  const [ethEntry, erc20s] = await Promise.all([
    getEthEntry(provider, address, ethUsd),
    Promise.all(
      ERC20_LIST.map(async (meta) =>
        getErc20Entry(provider, address, meta, priceMap?.[meta.coingeckoId]?.usd ?? 0)
      )
    ),
  ]);

  // Filter nulls and sort by USD value desc
  const list = [ethEntry, ...erc20s.filter(Boolean) as Token[]].sort((a, b) => (b.usd || 0) - (a.usd || 0));
  return list;
}

export default function useWalletTokens(
  provider: ethers.BrowserProvider | null,
  address: string | null,
) {
  const shouldFetch = !!provider && !!address;
  const { data, error, isLoading } = useSWR(
    shouldFetch ? ['wallet-tokens', address] : null,
    () => fetchWalletTokens(provider!, address!),
    { refreshInterval: 60_000 }
  );

  return { tokens: data ?? [], error, loading: isLoading };
}
