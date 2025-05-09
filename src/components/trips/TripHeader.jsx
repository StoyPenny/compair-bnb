import React, { useState } from 'react';
import {
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Grid, 
  TextField,
  Paper,
  Menu,
  MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const TripHeader = ({
  currentTrip,
  isEditingTripDetails,
  editingTripDetails,
  handleStartTripDetailsEdit,
  handleSaveTripDetails,
  setIsEditingTripDetails,
  setEditingTripDetails,
  handleDuplicateTrip,
  handleRemoveTrip
}) => {
  // Add state for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>{currentTrip.name}
          <Typography variant="body2">{currentTrip.startDate} - {currentTrip.endDate}</Typography>
        </Typography>
        
        {/* Add dropdown menu button here */}
        {!isEditingTripDetails && (
          <>
            <IconButton
              aria-label="more actions"
              aria-controls="trip-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="trip-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => {
                handleStartTripDetailsEdit();
                handleMenuClose();
              }}>
                <EditIcon sx={{ mr: 1 }} /> Edit Details
              </MenuItem>
              <MenuItem onClick={() => {
                handleDuplicateTrip(currentTrip.id);
                handleMenuClose();
              }}>
                <ContentCopyIcon sx={{ mr: 1 }} /> Duplicate Trip
              </MenuItem>
              <MenuItem onClick={() => {
                handleRemoveTrip(currentTrip.id);
                handleMenuClose();
              }} sx={{ color: 'error.main' }}>
                <DeleteIcon sx={{ mr: 1 }} /> Delete Trip
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>

      {isEditingTripDetails ? (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Edit Trip Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Trip Name"
                value={editingTripDetails.name}
                onChange={(e) => setEditingTripDetails({
                  ...editingTripDetails,
                  name: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={editingTripDetails.startDate}
                onChange={(e) => setEditingTripDetails({
                  ...editingTripDetails,
                  startDate: e.target.value
                })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={editingTripDetails.endDate}
                onChange={(e) => setEditingTripDetails({
                  ...editingTripDetails,
                  endDate: e.target.value
                })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={editingTripDetails.description}
                onChange={(e) => setEditingTripDetails({
                  ...editingTripDetails,
                  description: e.target.value
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSaveTripDetails} sx={{ mr: 1 }}>
                Save Changes
              </Button>
              <Button onClick={() => setIsEditingTripDetails(false)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', gap: '1rem' }}>
          <Box>
            <Typography variant="h6">{currentTrip.description}</Typography>
          </Box>
          {/* Removed buttons-wrapper div as it's now in the dropdown */}
        </Box>
      )}
    </Box>
  );
};

export default TripHeader;