import { ethers } from "ethers";

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
