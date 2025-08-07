import { api } from "./api";

export async function createDraft() {
  return api('/giftpacks', { method: 'POST' }).then(r => r.json());
}

export async function addItem(id: string, item: any) {
  return api(`/giftpacks/${id}/items`, {
    method: 'POST',
    body: JSON.stringify(item),
  });
}

export async function sealPack(id: string, message: string) {
  await api(`/giftpacks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ message, status: 'sealed' }),
  });
  return api(`/giftpacks/${id}`).then(r => r.json());  
