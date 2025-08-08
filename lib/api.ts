import { ethers } from "ethers";
import { localStorageService, LocalGiftPack } from './localStorage';

let JWT = '';

export async function walletLogin(provider: ethers.BrowserProvider) {
  const signer = await provider.getSigner();
  const addr   = await signer.getAddress();

  const { nonce } = await fetch('/auth/wallet-nonce', {
    method: 'POST',
    body: JSON.stringify({ wallet: addr }),
    headers: { 'Content-Type': 'application/json' },
  }).then(r => r.json());

  const msg   = `Sign in with DogeGifty\n\nNonce: ${nonce}`;
  const sig   = await signer.signMessage(msg);

  const { token } = await fetch('/auth/siwe', {
    method: 'POST',
    body: JSON.stringify({ wallet: addr, signature: sig }),
    headers: { 'Content-Type': 'application/json' },
  }).then(r => r.json());

  JWT = token;
}

/* helper wrapper */
export function api(path: string, init?: RequestInit) {
  return fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JWT}`,
      ...(init?.headers || {}),
    },
  });
}

export interface WalletNonceResponse {
  nonce: string;
  message: string;
}

export interface SiweAuthResponse {
  token: string;
  user: {
    address: string;
    chainId: number;
  };
}

export interface WalletSession {
  address: string;
  chainId: number;
  isConnected: boolean;
}

export interface ERC20Balance {
  contractAddress: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  logoURI?: string;
}

export interface NFTAsset {
  tokenId: string;
  contractAddress: string;
  name: string;
  description?: string;
  image?: string;
  metadata?: any;
  collection?: {
    name: string;
    description?: string;
  };
}

export interface AllowedToken {
  contractAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: number;
  logoURI?: string;
  isActive: boolean;
}

export interface GiftPack {
  id: string;
  createdBy: string;
  title?: string;
  description?: string;
  status: 'draft' | 'active' | 'claimed' | 'expired';
  createdAt: string;
  updatedAt: string;
  claimedAt?: string;
  claimedBy?: string;
  items: GiftPackItem[];
  claimCode?: string;
}

export interface GiftPackItem {
  id: string;
  type: 'token' | 'nft';
  contractAddress: string;
  tokenId?: string;
  amount?: string;
  symbol?: string;
  name?: string;
  metadata?: any;
}

export interface CreateGiftPackData {
  title?: string;
  description?: string;
}

export interface UpdateGiftPackData {
  title?: string;
  description?: string;
}

export interface AddItemToGiftPackData {
  type: 'token' | 'nft';
  contractAddress: string;
  tokenId?: string;
  amount?: string;
}

export interface ClaimRequest {
  giftId: string;
  recipientAddress: string;
  signature?: string;
}

export interface ClaimStatus {
  giftId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionHash?: string;
  claimedAt?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;
  
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }
    
    return response.json();
  }

  // ==================== AUTH ENDPOINTS ====================

  /**
   * POST /auth/wallet-nonce - Request a SIWE nonce
   */
  async requestWalletNonce(): Promise<WalletNonceResponse> {
    return this.request('/auth/wallet-nonce', {
      method: 'POST',
    });
  }

  /**
   * POST /auth/siwe - Exchange SIWE signature for JWT
   */
  async exchangeSiweSignature(message: string, signature: string): Promise<SiweAuthResponse> {
    return this.request('/auth/siwe', {
      method: 'POST',
      body: JSON.stringify({ message, signature }),
    });
  }

  /**
   * GET /auth/session - Get current wallet session
   */
  async getCurrentSession(): Promise<WalletSession> {
    return this.request('/auth/session');
  }

  // ==================== ASSETS ENDPOINTS ====================

  /**
   * GET /assets/erc20 - Get ERC-20 token balances for a wallet
   */
  async getERC20Balances(walletAddress: string): Promise<ERC20Balance[]> {
    return this.request(`/assets/erc20?wallet=${encodeURIComponent(walletAddress)}`);
  }

  /**
   * GET /assets/nft - Get NFTs owned by a wallet
   */
  async getNFTsOwned(walletAddress: string): Promise<NFTAsset[]> {
    return this.request(`/assets/nft?wallet=${encodeURIComponent(walletAddress)}`);
  }

  /**
   * GET /assets/tokens/allow-list - Get supported token allow list
   */
  async getSupportedTokens(): Promise<AllowedToken[]> {
    return this.request('/assets/tokens/allow-list');
  }

  // ==================== GIFTPACKS ENDPOINTS ====================

  /**
   * POST /giftpacks - Create a new draft gift pack
   */
  async createGiftPack(data: CreateGiftPackData): Promise<GiftPack> {
    const result = await this.request<GiftPack>('/giftpacks', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // Save to localStorage for local verification
    const localGiftPack: LocalGiftPack = {
      id: result.id,
      code: result.claimCode || this.generateLocalCode(),
      title: data.title,
      description: data.description,
      items: result.items.map(item => ({
        id: item.id,
        type: item.type,
        contractAddress: item.contractAddress,
        tokenId: item.tokenId,
        amount: item.amount,
        symbol: item.symbol,
        name: item.name,
      })),
      createdBy: result.createdBy,
      createdAt: result.createdAt,
      status: result.status,
      isLocalGift: true,
    };

    localStorageService.saveGiftPack(localGiftPack);
    return result;
  }

  /**
   * GET /giftpacks/{id} - Get a gift pack by ID
   */
  async getGiftPack(id: string): Promise<GiftPack> {
    return this.request(`/giftpacks/${id}`);
  }

  /**
   * PATCH /giftpacks/{id} - Update draft gift pack metadata
   */
  async updateGiftPack(id: string, data: UpdateGiftPackData): Promise<GiftPack> {
    return this.request(`/giftpacks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE /giftpacks/{id} - Delete a draft gift pack
   */
  async deleteGiftPack(id: string): Promise<{ success: boolean }> {
    return this.request(`/giftpacks/${id}`, {
      method: 'DELETE',
    });
  }

  /**
   * POST /giftpacks/{id}/items - Add item to gift pack
   */
  async addItemToGiftPack(id: string, item: AddItemToGiftPackData): Promise<GiftPack> {
    return this.request(`/giftpacks/${id}/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
  }

  /**
   * DELETE /giftpacks/{id}/items/{itemId} - Remove item from gift pack
   */
  async removeItemFromGiftPack(id: string, itemId: string): Promise<GiftPack> {
    return this.request(`/giftpacks/${id}/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // ==================== CLAIM ENDPOINTS ====================

  /**
   * POST /claim - Submit a gasless claim for a gift
   */
  async submitClaim(claimData: ClaimRequest): Promise<{ claimId: string; status: string }> {
    return this.request('/claim', {
      method: 'POST',
      body: JSON.stringify(claimData),
    });
  }

  /**
   * GET /claim/status/{giftId} - Check claim status for a gift
   */
  async getClaimStatus(giftId: string): Promise<ClaimStatus> {
    return this.request(`/claim/status/${giftId}`);
  }

  // ==================== USER DATA ENDPOINTS ====================

  /**
   * Get user's gift packs
   */
  async getUserGiftPacks(address: string): Promise<GiftPack[]> {
    return this.request(`/giftpacks?creator=${encodeURIComponent(address)}`);
  }

  /**
   * Get user's claimed gifts
   */
  async getUserClaimedGifts(address: string): Promise<GiftPack[]> {
    return this.request(`/giftpacks?claimedBy=${encodeURIComponent(address)}`);
  }

  /**
   * Enhanced gift pack retrieval that checks localStorage first
   */
  async getGiftPackWithLocalFallback(id: string): Promise<GiftPack | LocalGiftPack> {
    // First check localStorage
    const localGift = localStorageService.getGiftPack(id);
    if (localGift) {
      return localGift;
    }

    // Fall back to API
    return this.getGiftPack(id);
  }

  /**
   * Enhanced gift pack retrieval by code with local verification
   */
  async getGiftPackByCodeWithLocalFallback(code: string): Promise<GiftPack | LocalGiftPack> {
    // First check localStorage for local verification
    const localGift = localStorageService.getGiftPackByCode(code);
    if (localGift) {
      return localGift;
    }

    // Fall back to API
    return this.getGiftPackByCode(code);
  }

  /**
   * Verify if a gift pack was created locally
   */
  verifyLocalGiftPack(code: string): {
    isLocal: boolean;
    giftPack?: LocalGiftPack;
    verification: 'verified' | 'not_found' | 'invalid';
  } {
    const localGift = localStorageService.getGiftPackByCode(code);
    
    if (!localGift) {
      return {
        isLocal: false,
        verification: 'not_found'
      };
    }

    // Additional verification logic
    const isValid = this.validateLocalGiftPack(localGift);
    
    return {
      isLocal: true,
      giftPack: localGift,
      verification: isValid ? 'verified' : 'invalid'
    };
  }

  private validateLocalGiftPack(giftPack: LocalGiftPack): boolean {
    // Validate gift pack structure and data
    if (!giftPack.id || !giftPack.code || !giftPack.createdAt) {
      return false;
    }

    // Check if gift pack is not expired (example: 30 days)
    const createdDate = new Date(giftPack.createdAt);
    const expiryDate = new Date(createdDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    if (new Date() > expiryDate) {
      return false;
    }

    // Check if gift pack has items
    if (!giftPack.items || giftPack.items.length === 0) {
      return false;
    }

    return true;
  }

  private generateLocalCode(): string {
    // Generate a unique code for local gift packs
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

export const apiService = new ApiService();
