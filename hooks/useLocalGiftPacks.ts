import { useState, useEffect } from 'react';
import { localStorageService, LocalGiftPack } from '@/lib/localStorage';

export function useLocalGiftPacks() {
  const [localGifts, setLocalGifts] = useState<LocalGiftPack[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLocalGifts = () => {
      try {
        const gifts = localStorageService.getAllLocalGiftPacks();
        setLocalGifts(gifts);
      } catch (error) {
        console.error('Failed to load local gift packs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocalGifts();

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'doge_gift_packs') {
        loadLocalGifts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveGiftPack = (giftPack: LocalGiftPack) => {
    localStorageService.saveGiftPack(giftPack);
    setLocalGifts(localStorageService.getAllLocalGiftPacks());
  };

  const updateGiftPackStatus = (id: string, status: LocalGiftPack['status']) => {
    localStorageService.updateGiftPackStatus(id, status);
    setLocalGifts(localStorageService.getAllLocalGiftPacks());
  };

  const removeGiftPack = (id: string) => {
    localStorageService.removeGiftPack(id);
    setLocalGifts(localStorageService.getAllLocalGiftPacks());
  };

  const getGiftPackByCode = (code: string): LocalGiftPack | null => {
    return localStorageService.getGiftPackByCode(code);
  };

  return {
    localGifts,
    isLoading,
    saveGiftPack,
    updateGiftPackStatus,
    removeGiftPack,
    getGiftPackByCode,
    storageStats: localStorageService.getStorageStats(),
  };
}