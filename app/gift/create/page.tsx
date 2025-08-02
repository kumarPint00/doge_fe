'use client';

import {
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import Section from '@/components/Section';
import EscrowContext from '@/context/EscrowContext';
import { GiftItem } from '@/types/gift';
import { sealPack } from '@/lib/escrow';


import ReadyToSendCard from '@/components/ui/ReadyToSendCard';
import AddMessageCard from '@/components/ui/AddMessageCard';
import NftGallery from '@/components/ui/NftGallary';
import SealGiftCard from '@/components/ui/SealGiftCard';
import TokenPicker from '@/components/ui/TokenPicker';
import TokenAddCard from '@/components/ui/TokenAddCard';
import SelectedItemsCard from '@/components/ui/SelectedItemCard';

/* ---------------- typings ---------------- */
interface Token extends GiftItem {
  usd: number;
  balance: number;
}

/* ---------------- dummy data -------------- */
const TOKENS: Token[] = [
  { id: 'eth',  name: 'Ethereum',  symbol: 'ETH',  type: 'ERC20', image: '/tokens/eth.svg',  usd: 4529,  balance: 0.013 },
  { id: 'btc',  name: 'Bitcoin',   symbol: 'BTC',  type: 'ERC20', image: '/tokens/btc.svg',  usd: 45229, balance: 0.013 },
  { id: 'xrp',  name: 'XRP',       symbol: 'XRP',  type: 'ERC20', image: '/tokens/xrp.svg',  usd: 0.62,  balance: 0.013 },
  { id: 'bnb',  name: 'BNB',       symbol: 'BNB',  type: 'ERC20', image: '/tokens/bnb.svg',  usd: 312,   balance: 0.013 },
  { id: 'doge', name: 'Dogecoin',  symbol: 'DOGE', type: 'ERC20', image: '/tokens/doge.svg', usd: 0.18,  balance: 0.013 },
];

const NFTS = [
  { id: 'nft1', name: 'Beaver Biker',     type: 'NFT' as const, image: '/nft1.png', usd: 0 },
  { id: 'nft2', name: 'Nerd Ape',         type: 'NFT', image: '/nft2.png', usd: 0 },
  { id: 'nft3', name: 'Cat Tinkerer',     type: 'NFT', image: '/nft3.png', usd: 0 },
  { id: 'nft4', name: 'The Bakery',       type: 'NFT', image: '/nft4.png', usd: 0 },
  { id: 'nft5', name: 'Pooter Pup',       type: 'NFT', image: '/nft5.png', usd: 0 },
  { id: 'nft6', name: 'Acoustic Axolotl', type: 'NFT', image: '/nft6.png', usd: 0 },
  { id: 'nft7', name: 'Winky Yeti',       type: 'NFT', image: '/nft7.png', usd: 0 },
  { id: 'nft8', name: 'Bouncy Bee',       type: 'NFT', image: '/nft8.png', usd: 0 },
];

/* shared Paper style */
const cardSx = {
  p: { xs: 3, md: 4 },
  borderRadius: 4,
  boxShadow: '0 6px 18px rgba(0,0,0,.04)',
};

export default function CreatePack() {
  const router = useRouter();
  const [state, dispatch] = useContext(EscrowContext)!;

  const [msg,   setMsg]   = useState(state.message);
  const [code,  setCode]  = useState('');
  const [busy,  setBusy]  = useState(false);
  const [toast, setToast] = useState(false);

  /* token helpers */
  const token = state.items.find((i) => i.type === 'ERC20') as Token | undefined;
  const addToken    = (t: Token) => dispatch({ type: 'add', item: t });
  const removeToken = (id: string) => dispatch({ type: 'remove', id } as any);

  /* nft toggle */
  const toggleNft = (n: GiftItem) =>
    dispatch({
      type: state.items.find((i) => i.id === n.id) ? 'remove' : 'add',
      id: n.id,
      item: n,
    } as any);



  /* seal pack */
  const generateCode = async () => {
    if (!state.items.length) return;
    setBusy(true);
    const res = await sealPack(state.items, msg);
    setBusy(false);
    setCode(res.code);
    dispatch({ type: 'setCode', code: res.code });

    // router.push(`/gift/create/success?code=${res.code}`);
  };

  /* toast copy */
  const copy = () => {
    navigator.clipboard.writeText(
      `${location.origin}/gift/claim?code=${code}`,
    );
    setToast(true);
  };

  /* ================ MAIN ================= */
  return (
    <Section>
      <Container maxWidth="sm">
        <Typography variant="h3" textAlign="center" mb={4}>
          What’s in your pack?
        </Typography>

        <Stack spacing={4}>
          {/* ---- Token picker ---- */}
   
<TokenAddCard tokens={TOKENS} onAdd={addToken} />

{/* ---- SELECTED LIST ---- */}
<SelectedItemsCard items={state.items} onRemove={removeToken} />


          {/* ---- NFT gallery ---- */}
          <NftGallery
            nfts={NFTS}
            selectedIds={state.items.filter((i) => i.type === 'NFT').map((i) => i.id)}
            onToggle={toggleNft}
          />

          {/* ---- Message ---- */}
          <AddMessageCard value={msg} onChange={setMsg} />

          {/* ---- Seal gift ---- */}
          <SealGiftCard
            loading={busy}
            disabled={!state.items.length}
            secretCode={code}
            onGenerate={generateCode}
          />

          {/* ---- Ready summary (optional) ---- */}
          {code && (
            <ReadyToSendCard
              items={state.items}
              message={msg}
              secretCode={code}
              onConfirm={() => router.push('/gift/create/success?code=' + code)}
            />
          )}
        </Stack>
      </Container>

      {/* copy toast */}
      <Snackbar
        open={toast}
        autoHideDuration={2000}
        onClose={() => setToast(false)}
      >
        <Alert severity="success" variant="filled">
          Copied!
        </Alert>
      </Snackbar>
    </Section>
  );
}
