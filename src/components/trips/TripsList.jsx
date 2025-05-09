import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  IconButton,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

const TripsList = ({ 
  trips, 
  editingTripId, 
  editingTripName, 
  handleStartEditing, 
  handleSaveEdit,
  handleCancelEdit,
  handleViewTrip,
  handleDuplicateTrip, 
  handleRemoveTrip,
  setEditingTripName,
  handleStartNewTrip
}) => {
  return (
    <Paper sx={{ p: 2 }} className='trip-management'>
      <Typography variant="h5">My Trips</Typography>
      {trips.length === 0 ? (
        <Typography>No trips saved yet.</Typography>
      ) : (
        <List>
          {trips.map((trip) => (
            <ListItem key={trip.id} className='my-trips-list-item'>
              {editingTripId === trip.id ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    value={editingTripName}
                    onChange={(e) => setEditingTripName(e.target.value)}
                    size="small"
                    autoFocus
                  />
                  <Button onClick={() => handleSaveEdit(trip.id)}>Save</Button>
                  <Button onClick={handleCancelEdit}>Cancel</Button>
                </Box>
              ) : (
                <>
                  <ListItemText
                    primary={trip.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2">
                          {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Button
                    variant="outlined"
                    onClick={() => handleViewTrip(trip.id)}
                    sx={{ mr: 1 }}
                  >
                    View Trip
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      )}
      <Button onClick={handleStartNewTrip} variant="contained" sx={{ mt: 2 }}>Start A New Trip</Button>
    </Paper>
  );
};

export default TripsList;