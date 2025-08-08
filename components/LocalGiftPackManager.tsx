'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Alert,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import StorageIcon from '@mui/icons-material/Storage';
import { useLocalGiftPacks } from '@/hooks/useLocalGiftPacks';
import { localStorageService } from '@/lib/localStorage';

export default function LocalGiftPackManager() {
  const { localGifts, removeGiftPack, storageStats } = useLocalGiftPacks();
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportData, setExportData] = useState('');

  const handleExport = () => {
    const data = localStorageService.exportGiftPacks();
    setExportData(data);
    setExportDialogOpen(true);
  };

  const handleDownloadExport = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doge-gift-packs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const success = localStorageService.importGiftPacks(jsonData);
        if (success) {
          alert('Gift packs imported successfully!');
        } else {
          alert('Failed to import gift packs. Please check the file format.');
        }
      } catch (error) {
        alert('Error reading file. Please ensure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const clearAllGifts = () => {
    if (confirm('Are you sure you want to delete all local gift packs? This cannot be undone.')) {
      localStorageService.clearAllGiftPacks();
      window.location.reload();
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Local Gift Pack Storage</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Export gift packs">
                <IconButton onClick={handleExport}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Import gift packs">
                <IconButton component="label">
                  <UploadIcon />
                  <input
                    type="file"
                    hidden
                    accept=".json"
                    onChange={handleImport}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Chip
              icon={<StorageIcon />}
              label={`${storageStats.count} gift packs`}
              variant="outlined"
            />
            <Chip
              label={`${storageStats.sizeKB} KB used`}
              variant="outlined"
            />
          </Box>

          {localGifts.length === 0 ? (
            <Alert severity="info">
              No local gift packs found. Gift packs created in this browser will appear here.
            </Alert>
          ) : (
            <>
              <List>
                {localGifts.map((gift) => (
                  <ListItem
                    key={gift.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => removeGiftPack(gift.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography>{gift.title || 'Untitled Gift Pack'}</Typography>
                          <Chip
                            label={gift.status}
                            size="small"
                            color={gift.status === 'active' ? 'success' : 'default'}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Code: {gift.code}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Items: {gift.items.length} • Created: {new Date(gift.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                variant="outlined"
                color="error"
                onClick={clearAllGifts}
                sx={{ mt: 2 }}
              >
                Clear All Local Gift Packs
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Export Gift Packs</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Copy the data below or download as a file:
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: 'grey.100',
              p: 2,
              borderRadius: 1,
              maxHeight: 400,
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {exportData}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Close</Button>
          <Button onClick={handleDownloadExport} variant="contained">
            Download File
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}