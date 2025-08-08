'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useCreateGiftPack, useAddItemToGiftPack, useRemoveItemFromGiftPack } from '@/hooks/useGiftPacks';
import { useERC20Balances, useUserNFTs, useSupportedTokens } from '@/hooks/useAssets';
import { AddItemToGiftPackData } from '@/lib/api';

interface CreateGiftPackFormProps {
  walletAddress?: string;
}

export default function CreateGiftPackForm({ walletAddress }: CreateGiftPackFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGiftPackId, setSelectedGiftPackId] = useState<string | null>(null);

  const createGiftPack = useCreateGiftPack();
  const addItem = useAddItemToGiftPack();
  const removeItem = useRemoveItemFromGiftPack();
  
  const { data: erc20Balances } = useERC20Balances(walletAddress);
  const { data: userNFTs } = useUserNFTs(walletAddress);
  const { data: supportedTokens } = useSupportedTokens();

  const handleCreateGiftPack = async () => {
    try {
      const result = await createGiftPack.mutateAsync({
        title: title || undefined,
        description: description || undefined,
      });
      setSelectedGiftPackId(result.id);
    } catch (error) {
      console.error('Failed to create gift pack:', error);
    }
  };

  const handleAddToken = async (contractAddress: string, amount: string) => {
    if (!selectedGiftPackId) return;

    const itemData: AddItemToGiftPackData = {
      type: 'token',
      contractAddress,
      amount,
    };

    try {
      await addItem.mutateAsync({ id: selectedGiftPackId, item: itemData });
    } catch (error) {
      console.error('Failed to add token:', error);
    }
  };

  const handleAddNFT = async (contractAddress: string, tokenId: string) => {
    if (!selectedGiftPackId) return;

    const itemData: AddItemToGiftPackData = {
      type: 'nft',
      contractAddress,
      tokenId,
    };

    try {
      await addItem.mutateAsync({ id: selectedGiftPackId, item: itemData });
    } catch (error) {
      console.error('Failed to add NFT:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Gift Pack
        </Typography>

        {!selectedGiftPackId ? (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Gift Pack Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title (Optional)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Awesome Gift Pack"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A special gift for someone special..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleCreateGiftPack}
                    disabled={createGiftPack.isPending}
                    startIcon={createGiftPack.isPending ? <CircularProgress size={20} /> : <AddIcon />}
                  >
                    Create Gift Pack
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {/* Token Selection */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add Tokens
                  </Typography>
                  {erc20Balances?.map((token) => (
                    <Box key={token.contractAddress} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>
                          {token.symbol} - Balance: {token.balance}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleAddToken(token.contractAddress, '1')} // You'd want a proper amount input
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* NFT Selection */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Add NFTs
                  </Typography>
                  {userNFTs?.map((nft) => (
                    <Box key={`${nft.contractAddress}-${nft.tokenId}`} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>
                          {nft.name || `Token #${nft.tokenId}`}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleAddNFT(nft.contractAddress, nft.tokenId)}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {createGiftPack.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Failed to create gift pack. Please try again.
          </Alert>
        )}
      </Box>
    </Container>
  );
}