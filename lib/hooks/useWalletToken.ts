'use client';
import useSWR from 'swr';
import { ethers, Contract } from 'ethers';
import { ERC20_LIST } from '@/lib/tokenList';
import erc20Abi from '@/lib/erc20Abi.json';
import { getUsdPrices } from '@/lib/prices';

import { Token } from '@/types/token';

async function fetchDummyBalances(): Promise<Token[]> {
  return [
    {
      id: '1',
      name: 'USDC',
      symbol: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      chainId: 1,
      balance: 100,
      usd: 100,
      image: '/usdc.png',
      type: 'ERC20',
    },
    {
      id: '2',
      name: 'DogeGF',
      symbol: 'DOGEGF',
      address: '0x...someaddress',
      decimals: 18,
      chainId: 1,
      balance: 10000,
      usd: 100,
      image: '/dogegf.png',
      type: 'ERC20',
    },
    {
      id: '3',
      name: 'Ethereum',
      symbol: 'ETH',
      address: '0xC02aaA39b223FE8D0A0bA11b5E5e3D2a1fFf0',
      decimals: 18,
      chainId: 1,
      balance: 1,
      usd: 2000,
      image: '/eth.png',
      type: 'ERC20',
    },
    {
      id: '4',
      name: 'Bitcoin',
      symbol: 'BTC',
      address: '0x...somebtcaddress',
      decimals: 8,
      chainId: 1,
      balance: 0.5,
      usd: 25000,
      image: '/btc.png',
      type: 'ERC20',  
    },
    {
      id: '5',
      name: 'Litecoin',
      symbol: 'LTC', 
      address: '0x...someltcaddress',
      decimals: 8,
      chainId: 1,
      balance: 10,
      usd: 1000,
      image: '/ltc.png',
      type: 'ERC20',
    },
    {
      id: '6',
      name: 'Ripple',
      symbol: 'XRP',
      address: '0x...somexrpaddress',
      decimals: 6,
      chainId: 1,
      balance: 1000,
      usd: 500,
      image: '/xrp.png',
      type: 'ERC20',
    },
    {
      id: '7',
      name: 'Chainlink',
      symbol: 'LINK',
      address: '0x...somelinkaddress',
      decimals: 18,
      chainId: 1,
      balance: 50,
      usd: 1500,
      image: '/link.png',
      type: 'ERC20',
    },
    {
      id: '8',
      name: 'Cardano',
      symbol: 'ADA',
      address: '0x...someadaaddress',
      decimals: 6,
      chainId: 1,
      balance: 10000,
      usd: 2000,    
      image: '/ada.png',
      type: 'ERC20',
    },
    {
      id: '9',
      name: 'Polkadot',
      symbol: 'DOT',
      address: '0x...somedotaddress',
      decimals: 10,
      chainId: 1,
      balance: 500,
      usd: 2500,
      image: '/dot.png',
      type: 'ERC20',
    },
    {
      id: '10',
      name: 'Solana',
      symbol: 'SOL',
      address: '0x...somesolanaaddress',
      decimals: 9,
      chainId: 1,
      balance: 100,
      usd: 100,
      image: '/sol.png',
      type: 'ERC20',  
    },
  ];
}

export default function useWalletTokens(
  provider: ethers.BrowserProvider | null,
  address: string | null,
) {
  const { data, error, isLoading } = useSWR(
    ['dummy-balances'],
    fetchDummyBalances,
    { refreshInterval: 60_000 },
  );

  return { tokens: data ?? [], error, loading: isLoading };
}
