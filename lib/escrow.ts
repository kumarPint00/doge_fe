import { GiftItem, GiftPack } from '@/types/gift';
import crypto from 'crypto';

const packs = new Map<string, GiftPack>();

export function generateSecretCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function sealPack(items: GiftItem[], message: string): Promise<{ code: string }> {
  const code = generateSecretCode();
  packs.set(code, { items, message, sealedAt: Date.now() });
  return new Promise(r => setTimeout(() => r({ code }), 500));
}

export async function claimPack(code: string): Promise<GiftPack | null> {
  return new Promise(r => setTimeout(() => r(packs.get(code) || null), 500));
}
