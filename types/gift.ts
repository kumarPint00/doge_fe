export type TokenType = 'ERC20' | 'NFT';

export interface GiftItem {
  id: string;
  name: string;
  symbol?: string;
  type: TokenType;
  usd: number; 
  balance?: number; 
  amount?: number;
  image?: string;
}

export interface GiftPack {
  items: GiftItem[];
  message: string;
  sealedAt: number;
}
