import React from 'react';
import { Typography, Grid, TextField, Button, Paper, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NewPropertyForm = ({
  isOpen,
  onClose,
  newAirbnbName,
  newAirbnbLocation,
  newAirbnbLink,
  newAirbnbPrice,
  newAirbnbNotes,
  setNewAirbnbName,
  setNewAirbnbLocation,
  setNewAirbnbLink,
  setNewAirbnbPrice,
  setNewAirbnbNotes,
  handleAddAirbnb
}) => {
  const handleSubmit = () => {
    handleAddAirbnb();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-property-modal"
      aria-describedby="modal-to-add-new-property"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '80%', md: '70%' },
        maxWidth: '800px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 1
      }}>
        <Paper sx={{ p: 3 }} className='airbnb-form'>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add New Property</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Name" 
                value={newAirbnbName} 
                onChange={(e) => setNewAirbnbName(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Location" 
                value={newAirbnbLocation} 
                onChange={(e) => setNewAirbnbLocation(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Link" 
                value={newAirbnbLink} 
                onChange={(e) => setNewAirbnbLink(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                label="Price" 
                value={newAirbnbPrice} 
                onChange={(e) => setNewAirbnbPrice(e.target.value)} 
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Notes" 
                value={newAirbnbNotes || ''} 
                onChange={(e) => setNewAirbnbNotes(e.target.value)} 
                multiline
                rows={3}
                placeholder="Add notes about this property..."
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end" mt={2}>
              <Button 
                variant="contained" 
                onClick={handleSubmit}
                sx={{ mr: 1 }}
              >
                Add Property
              </Button>
              <Button 
                variant="outlined" 
                onClick={onClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default NewPropertyForm;