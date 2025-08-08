export interface LocalGiftPack {
  id: string;
  code: string;
  title?: string;
  description?: string;
  items: Array<{
    id: string;
    type: 'token' | 'nft';
    contractAddress: string;
    tokenId?: string;
    amount?: string;
    symbol?: string;
    name?: string;
  }>;
  createdBy: string;
  createdAt: string;
  status: 'draft' | 'active' | 'claimed' | 'expired';
  isLocalGift: true;
}

export interface LocalStorageManager {
  saveGiftPack: (giftPack: LocalGiftPack) => void;
  getGiftPack: (id: string) => LocalGiftPack | null;
  getGiftPackByCode: (code: string) => LocalGiftPack | null;
  getAllLocalGiftPacks: () => LocalGiftPack[];
  updateGiftPackStatus: (id: string, status: LocalGiftPack['status']) => void;
  removeGiftPack: (id: string) => void;
  clearAllGiftPacks: () => void;
}

class LocalStorageService implements LocalStorageManager {
  private readonly STORAGE_KEY = 'doge_gift_packs';
  private readonly MAX_STORAGE_SIZE = 10 * 1024 * 1024; // 10MB limit

  private getStoredGiftPacks(): LocalGiftPack[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  private saveToStorage(giftPacks: LocalGiftPack[]): void {
    try {
      const serialized = JSON.stringify(giftPacks);
      
      // Check storage size
      if (serialized.length > this.MAX_STORAGE_SIZE) {
        console.warn('Gift pack data exceeds storage limit, removing oldest entries');
        this.cleanupOldEntries(giftPacks);
        return;
      }

      localStorage.setItem(this.STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Handle quota exceeded
      if (error instanceof DOMException && error.code === 22) {
        this.cleanupOldEntries(giftPacks);
      }
    }
  }

  private cleanupOldEntries(giftPacks: LocalGiftPack[]): void {
    // Remove oldest 20% of entries
    const sorted = giftPacks.sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    const keepCount = Math.floor(sorted.length * 0.8);
    const cleaned = sorted.slice(-keepCount);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cleaned));
    } catch (error) {
      console.error('Failed to cleanup localStorage:', error);
    }
  }

  saveGiftPack(giftPack: LocalGiftPack): void {
    const existing = this.getStoredGiftPacks();
    const index = existing.findIndex(g => g.id === giftPack.id);
    
    if (index >= 0) {
      existing[index] = giftPack;
    } else {
      existing.push(giftPack);
    }
    
    this.saveToStorage(existing);
  }

  getGiftPack(id: string): LocalGiftPack | null {
    const giftPacks = this.getStoredGiftPacks();
    return giftPacks.find(g => g.id === id) || null;
  }

  getGiftPackByCode(code: string): LocalGiftPack | null {
    const giftPacks = this.getStoredGiftPacks();
    return giftPacks.find(g => g.code === code) || null;
  }

  getAllLocalGiftPacks(): LocalGiftPack[] {
    return this.getStoredGiftPacks();
  }

  updateGiftPackStatus(id: string, status: LocalGiftPack['status']): void {
    const existing = this.getStoredGiftPacks();
    const index = existing.findIndex(g => g.id === id);
    
    if (index >= 0) {
      existing[index].status = status;
      this.saveToStorage(existing);
    }
  }

  removeGiftPack(id: string): void {
    const existing = this.getStoredGiftPacks();
    const filtered = existing.filter(g => g.id !== id);
    this.saveToStorage(filtered);
  }

  clearAllGiftPacks(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Utility methods
  getStorageStats(): { count: number; sizeKB: number } {
    const giftPacks = this.getStoredGiftPacks();
    const serialized = JSON.stringify(giftPacks);
    return {
      count: giftPacks.length,
      sizeKB: Math.round(serialized.length / 1024)
    };
  }

  exportGiftPacks(): string {
    return JSON.stringify(this.getStoredGiftPacks(), null, 2);
  }

  importGiftPacks(jsonData: string): boolean {
    try {
      const imported: LocalGiftPack[] = JSON.parse(jsonData);
      const existing = this.getStoredGiftPacks();
      
      // Merge without duplicates
      const merged = [...existing];
      imported.forEach(gift => {
        if (!merged.find(g => g.id === gift.id)) {
          merged.push(gift);
        }
      });
      
      this.saveToStorage(merged);
      return true;
    } catch (error) {
      console.error('Failed to import gift packs:', error);
      return false;
    }
  }
}

export const localStorageService = new LocalStorageService();