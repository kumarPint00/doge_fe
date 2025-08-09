export type Erc20Meta = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  coingeckoId: string;
  image?: string; // path under /public
};

// Curated minimal list of popular ERC-20s on Ethereum mainnet
export const ERC20_LIST: Erc20Meta[] = [
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    decimals: 6,
    coingeckoId: 'usd-coin',
    image: '/usdc.png',
  },
  {
    symbol: 'DAI',
    name: 'Dai',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    coingeckoId: 'dai',
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    decimals: 18,
    coingeckoId: 'chainlink',
    image: '/link.png',
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ether',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    coingeckoId: 'weth',
  },
];
