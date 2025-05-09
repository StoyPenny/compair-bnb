import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Collapse,
  Rating,
  TextField
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

const PropertyList = ({
  airbnbs,
  categories,
  handleToggleOpen,
  handleRatingChange,
  handleNotesChange,
  handleRemoveAirbnb,
  calculateTotalScore,
  handleOpenSettings,
  handleUpdateTrip,
  hasUnsavedChanges,
  handleToggleAllProperties,
  allPropertiesOpen,
  hasModalChanges
}) => {
  const renderRatingInputs = (airbnb) => {
    return (
      <Collapse in={airbnb.open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 2 }} className="rating-input" >
          {categories.map((category) => (
            <Box
              key={category.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 1,
              }}
            >
              <Typography variant="subtitle2" sx={{ width: 120 }}>
                {category.name}:
              </Typography>
              <Rating
                name={`rating-${airbnb.id}-${category.name}`}
                value={airbnb.ratings[category.name]}
                onChange={(event, newValue) => {
                  handleRatingChange(airbnb.id, category.name, newValue);
                }}
              />
            </Box>
          ))}
          
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Notes:</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add notes about this property..."
              value={airbnb.notes || ''}
              onChange={(e) => handleNotesChange(airbnb.id, e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => handleRemoveAirbnb(airbnb.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Collapse>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" style={{ marginRight: 'auto' }}>Properties</Typography>
        <IconButton 
          onClick={handleOpenSettings} 
          color="inherit" 
          style={{ 
            marginRight: '1rem',
            color: hasModalChanges ? '#00b084' : 'inherit'
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateTrip}
          disabled={!hasUnsavedChanges}
          sx={{
            mr: 2,
            backgroundColor: hasUnsavedChanges ? '#00b084' : 'default',
            '&:hover': {
              backgroundColor: hasUnsavedChanges ? '#009070' : 'default',
            }
          }}
        >
          Save Changes
        </Button>

        <Button
          variant="outlined"
          onClick={handleToggleAllProperties}
          startIcon={allPropertiesOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        >
          {allPropertiesOpen ? 'Close All' : 'Open All'}
        </Button>
      </Box>

      <Box sx={{ mb: 2 }} className='properties-list'>
        {airbnbs.map((airbnb) => (
          <Box
            key={airbnb.id}
            sx={{
              border: '1px solid #00b084',
              padding: 1,
              marginBottom: 1,
              borderRadius: 1,
              backgroundColor: 'background.paper',
            }}
            className={`airbnb-card ${airbnb.open ? 'open' : ''}`}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h6" className='airbnb-name'>
                  <a href={airbnb.link} target="_blank" rel="noopener noreferrer">
                    {airbnb.name}
                  </a>
                </Typography>
                {airbnb.location && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      mt: -0.5,
                      mb: 0.5
                    }}
                  >
                    {airbnb.location}
                  </Typography>
                )}
                {airbnb.notes && !airbnb.open && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      mt: 0.5,
                      mb: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    Note: {airbnb.notes}
                  </Typography>
                )}
              </div>
              <Typography variant="subtitle1">${airbnb.price}</Typography>
              <Typography variant="subtitle1" sx={{ mx: 2 }}>
                {calculateTotalScore(airbnb)} stars
              </Typography>
              <IconButton onClick={() => handleToggleOpen(airbnb.id)}>
                {airbnb.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Box>
            {renderRatingInputs(airbnb)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PropertyList;