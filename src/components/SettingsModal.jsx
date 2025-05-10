import React from 'react';
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Slider,
  IconButton,
  Button,
  ListItemSecondaryAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const SettingsModal = ({
  isOpen,
  onClose,
  tempCategories,
  handleCategoryNameChange,
  handleCategoryWeightChange,
  handleAddCategory,
  handleRemoveCategory,
  handleSaveSettings,
  hasModalChanges
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Settings
        </Typography>
        <List sx={{ flex: 1, overflowY: 'auto' }}>
          {tempCategories.map((category, index) => (
            <ListItem key={index}>
              <TextField
                label="Category Name"
                value={category.name}
                onChange={(e) => handleCategoryNameChange(index, e.target.value)}
                sx={{ marginRight: 2, minWidth: '150px' }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '120px' }}>
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  Weight:
                </Typography>
                <Slider
                  size="small"
                  value={category.weight}
                  onChange={(e, newValue) => handleCategoryWeightChange(index, newValue)}
                  aria-label="Weight"
                  valueLabelDisplay="auto"
                  min={1}
                  max={5}
                />
              </Box>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveCategory(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem>
            <Button startIcon={<AddIcon />} onClick={handleAddCategory}>
              Add Category
            </Button>
          </ListItem>
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            variant="contained" 
            color="primary"
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;