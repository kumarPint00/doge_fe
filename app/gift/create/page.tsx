'use client';

import { Container, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import Section from '@/components/Section';
import EscrowContext from '@/context/EscrowContext';
import { sealPack } from '@/lib/escrow';
import { useWallet } from '@/context/WalletContext';
import useWalletNfts from '@/lib/hooks/useWalletNft';

// Components
import ReadyToSendCard from '@/components/ui/ReadyToSendCard';
import AddMessageCard from '@/components/ui/AddMessageCard';
import NftGallery from '@/components/ui/NftGallary';
import SealGiftCard from '@/components/ui/SealGiftCard';
import TokenAddCard from '@/components/ui/TokenAddCard';
import SelectedItemsCard from '@/components/ui/SelectedItemCard';

// Types and Constants
import { GiftItem } from '@/types/gift';
import { Token } from '@/types/token';
import { tokens } from '@/constants/tokens';
import useWalletTokens from '@/lib/hooks/useWalletToken';

const CreatePack: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useContext(EscrowContext)!;

  // Local state
  const [msg, setMsg] = useState<string>(state.message);
  const [code, setCode] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);

  const { provider, address }             = useWallet();
  const { nfts, loading: nftsLoading } = useWalletNfts(address);
const { tokens, loading: tokLoading }   = useWalletTokens(provider, address);


  // Handlers
  const handleAddToken = (token: Token) => {
    dispatch({ type: 'add', item: { ...token, type: 'ERC20' } });
  };

  const handleRemoveToken = (id: string) => {
    dispatch({ type: 'remove', id });
  };

  const handleNftToggle = (nft: GiftItem) => {
    dispatch({
      type: state.items.find((i) => i.id === nft.id) ? 'remove' : 'add',
      id: nft.id,
      item: nft,
    });
  };

  const handleGenerateCode = async () => {
    if (!state.items.length) return;
    
    setBusy(true);
    try {
      const res = await sealPack(state.items, msg);
      setCode(res.code);
      dispatch({ type: 'setCode', code: res.code });
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${location.origin}/gift/claim?code=${code}`);
    setToast(true);
  };

  const selectedNftIds = state.items
    .filter((i) => i.type === 'NFT')
    .map((i) => i.id);

  return (
    <Section>
      <Container maxWidth="sm">
        <Typography variant="h3" textAlign="center" mb={4}>
          What&apos;s in your pack?
        </Typography>

        <Stack spacing={4}>
          <TokenAddCard tokens={tokens} loading={tokLoading} onAdd={handleAddToken} />
          <SelectedItemsCard items={state.items} onRemove={handleRemoveToken} />
          <NftGallery
            nfts={nfts}
            selectedIds={selectedNftIds}
            onToggle={handleNftToggle}
          />
          <AddMessageCard value={msg} onChange={setMsg} />
          <SealGiftCard
            loading={busy}
            disabled={!state.items.length}
            secretCode={code}
            onGenerate={handleGenerateCode}
          />

          {code && (
            <ReadyToSendCard
              items={state.items}
              message={msg}
              secretCode={code}
              onConfirm={() => router.push(`/gift/create/success?code=${code}`)}
            />
          )}
        </Stack>
      </Container>

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
};

export default CreatePack;
