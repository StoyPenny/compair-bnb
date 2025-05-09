import React from 'react';
import { Typography, Box, TextField, Button, Divider } from '@mui/material';

const NewTripForm = ({
  newTripName,
  newTripStartDate,
  newTripEndDate,
  newTripDescription,
  setNewTripName,
  setNewTripStartDate,
  setNewTripEndDate,
  setNewTripDescription,
  handleAddTrip
}) => {
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <br />
      <br />
      <Box sx={{ mb: 3 }} style={{ maxWidth: '600px', margin: '0 auto 6rem', width: '100%' }} className='new-trip-form'>
        <Typography variant="h6">Create New Trip</Typography>
        <br />
        <TextField
          fullWidth
          label="Trip Name"
          value={newTripName}
          onChange={(e) => setNewTripName(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          value={newTripStartDate}
          onChange={(e) => setNewTripStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          type="date"
          label="End Date"
          value={newTripEndDate}
          onChange={(e) => setNewTripEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={newTripDescription}
          onChange={(e) => setNewTripDescription(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddTrip}
        >
          Create Trip
        </Button>
      </Box>
    </>
  );
};

export default NewTripForm;