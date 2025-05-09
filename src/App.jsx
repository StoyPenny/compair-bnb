import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  AppBar,
  Toolbar,
  Grid,
  Divider,
  ButtonGroup,
  TextField,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Rating,
  Modal,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Slider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { Radar } from 'react-chartjs-2';
import AirbnbRadarChart from './components/AirbnbRadarChart';
import PriceScoreScatter from './components/PriceScoreScatter';
import CategoryComparisonBar from './components/CategoryComparisonBar';
import StackedScoreBar from './components/StackedScoreBar';
import CategoryCBNBChart from './components/CategoryCBNBChart';


const defaultCategories = [
  'Price',
  'Overall style',
  'Bathrooms',
  'Ammenities',
  'Bedrooms',
  'Air conditioning',
  'View',
  'Office space',
  'TV',
  'Couch comfort',
];

function App() {
  const [newAirbnbName, setNewAirbnbName] = useState('');
  const [trips, setTrips] = useState(() => {
    const stored = localStorage.getItem('trips');
    return stored ? JSON.parse(stored) : [];
  });
  const [airbnbs, setAirbnbs] = useState(() => {
    const stored = localStorage.getItem('airbnbs');
    return stored ? JSON.parse(stored) : [];
  });
  const [newTripName, setNewTripName] = useState('');
  const [newTripStartDate, setNewTripStartDate] = useState('');
  const [newTripEndDate, setNewTripEndDate] = useState('');
  const [newTripDescription, setNewTripDescription] = useState('');
  const [newAirbnbLink, setNewAirbnbLink] = useState('');
  const [newAirbnbPrice, setNewAirbnbPrice] = useState('');
  const [currentTrip, setCurrentTrip] = useState(null);
  const [categories, setCategories] = useState(
    defaultCategories.map((cat) => ({ name: cat, weight: 1 })),
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTripId, setEditingTripId] = useState(null);
  const [editingTripName, setEditingTripName] = useState('');
  const [allPropertiesOpen, setAllPropertiesOpen] = useState(false);
  const [isEditingTripDetails, setIsEditingTripDetails] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [tempCategories, setTempCategories] = useState([]);
  const [hasModalChanges, setHasModalChanges] = useState(false);
  const [newAirbnbLocation, setNewAirbnbLocation] = useState('');

  const handleNotesChange = (airbnbId, notes) => {
    setHasUnsavedChanges(true);
    setAirbnbs(
      airbnbs.map((airbnb) =>
        airbnb.id === airbnbId
          ? { ...airbnb, notes }
          : airbnb,
      ),
    );
  };

  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    const storedAirbnbs = localStorage.getItem('airbnbs');
    console.log('Loading from storage:', storedTrips);
    if (storedTrips) {
      try {
        const parsedTrips = JSON.parse(storedTrips);
        console.log('Parsed trips:', parsedTrips);
        setTrips(parsedTrips);
      } catch (error) {
        console.error('Error parsing stored trips:', error);
      }
    }
    if (storedAirbnbs) {
      setAirbnbs(JSON.parse(storedAirbnbs));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('trips', JSON.stringify(trips));
      console.log('Saving to storage:', trips);
    } catch (error) {
      console.error('Error saving trips:', error);
    }
  }, [trips]);

  useEffect(() => {
    try {
      localStorage.setItem('airbnbs', JSON.stringify(airbnbs));
      console.log('Saving airbnbs:', airbnbs);
    } catch (error) {
      console.error('Error saving airbnbs:', error);
    }
  }, [airbnbs]);

  const handleAddAirbnb = () => {
    if (newAirbnbName.trim() !== '') {
      const newAirbnb = {
        id: uuidv4(),
        name: newAirbnbName,
        location: newAirbnbLocation,
        link: newAirbnbLink,
        price: parseFloat(newAirbnbPrice).toFixed(2),
        ratings: categories.reduce((acc, category) => {
          acc[category.name] = 0;
          return acc;
        }, {}),
        notes: '',
        open: false,
      };
      
      // Add the new airbnb to the state
      const updatedAirbnbs = [...airbnbs, newAirbnb];
      setAirbnbs(updatedAirbnbs);
      
      // Update the current trip with the new airbnb
      if (currentTrip) {
        const updatedTrips = trips.map(trip =>
          trip.id === currentTrip.id
            ? { ...trip, airbnbs: updatedAirbnbs }
            : trip
        );
        setTrips(updatedTrips);
        setCurrentTrip({ ...currentTrip, airbnbs: updatedAirbnbs });
      }
      
      // Clear the form
      setNewAirbnbName('');
      setNewAirbnbLocation('');
      setNewAirbnbLink('');
      setNewAirbnbPrice('');
    }
  };
  

  const handleRemoveAirbnb = (id) => {
    const airbnbToDelete = airbnbs.find(airbnb => airbnb.id === id);
    if (window.confirm(`Are you sure you want to delete "${airbnbToDelete.name}"?`)) {
      const updatedAirbnbs = airbnbs.filter((airbnb) => airbnb.id !== id);
      setAirbnbs(updatedAirbnbs);
      
      // Update the current trip with the filtered airbnbs list
      if (currentTrip) {
        const updatedTrips = trips.map(trip =>
          trip.id === currentTrip.id
            ? { ...trip, airbnbs: updatedAirbnbs }
            : trip
        );
        setTrips(updatedTrips);
        setCurrentTrip({ ...currentTrip, airbnbs: updatedAirbnbs });
      }
    }
  };
  const handleRatingChange = (airbnbId, categoryName, rating) => {
    setHasUnsavedChanges(true);
    setAirbnbs(
      airbnbs.map((airbnb) =>
        airbnb.id === airbnbId
          ? {
            ...airbnb,
            ratings: { ...airbnb.ratings, [categoryName]: rating },
          }
          : airbnb,
      ),
    );
  };

  const handleToggleOpen = (id) => {
    setAirbnbs(
      airbnbs.map((airbnb) =>
        airbnb.id === id ? { ...airbnb, open: !airbnb.open } : airbnb,
      ),
    );
  };

  const handleAddTrip = () => {
    if (newTripName.trim() !== '') {
      const newTrip = {
        id: uuidv4(),
        name: newTripName,
        startDate: newTripStartDate,
        endDate: newTripEndDate,
        description: newTripDescription,
        airbnbs: [...airbnbs],
        categories: [...categories]
      };
      setTrips([...trips, newTrip]);
      setNewTripName('');
      setNewTripStartDate('');
      setNewTripEndDate('');
      setNewTripDescription('');
      setCurrentTrip(newTrip);
    }
  };

  const handleRemoveTrip = (tripId) => {
    // Add confirmation check
    const trip = trips.find(t => t.id === tripId);
    if (window.confirm(`Are you sure you want to delete trip "${trip.name}"?`)) {
      setTrips(trips.filter(trip => trip.id !== tripId));
      // If we're currently viewing the trip being deleted, clear it
      if (currentTrip && currentTrip.id === tripId) {
        setCurrentTrip(null);
        setAirbnbs([]);
      }
    }
  };

  const handleStartNewTrip = () => {
    setCurrentTrip(null);
    setAirbnbs([]);
    setCategories(defaultCategories.map(cat => ({ name: cat, weight: 1 })));
  };


  const handleViewTrip = (tripId) => {
    const trip = trips.find((t) => t.id === tripId);
    if (trip) {
      setAirbnbs(trip.airbnbs);
      setCategories(trip.categories || defaultCategories.map(cat => ({ name: cat, weight: 1 }))); // Load trip categories or use defaults
      setCurrentTrip(trip);
    }
  };

  const handleStartEditing = (trip) => {
    setEditingTripId(trip.id);
    setEditingTripName(trip.name);
  };

  const handleSaveEdit = (tripId) => {
    if (editingTripName.trim()) {
      setTrips(trips.map(trip =>
        trip.id === tripId
          ? { ...trip, name: editingTripName.trim() }
          : trip
      ));
      setEditingTripId(null);
      setEditingTripName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTripId(null);
    setEditingTripName('');
  };

  const handleToggleAllProperties = () => {
    setAllPropertiesOpen(!allPropertiesOpen);
    setAirbnbs(airbnbs.map(airbnb => ({
      ...airbnb,
      open: !allPropertiesOpen
    })));
  };

  const [editingTripDetails, setEditingTripDetails] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // Add this function to handle starting trip details edit
  const handleStartTripDetailsEdit = () => {
    setEditingTripDetails({
      name: currentTrip.name,
      startDate: currentTrip.startDate,
      endDate: currentTrip.endDate,
      description: currentTrip.description
    });
    setIsEditingTripDetails(true);
  };

  // Add this function to handle saving trip details
  const handleSaveTripDetails = () => {
    setTrips(trips.map(trip =>
      trip.id === currentTrip.id
        ? { ...trip, ...editingTripDetails }
        : trip
    ));
    setCurrentTrip({ ...currentTrip, ...editingTripDetails });
    setIsEditingTripDetails(false);
  };

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
          
          {/* Add Notes Field */}
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

  const calculateTotalScore = (airbnb) => {
    return categories.reduce((sum, category) => {
      const rating = airbnb.ratings[category.name] || 0;
      return sum + rating;
    }, 0);
  };
  const calculateTotalScorePercentage = (airbnb, categories) => {
    const score = calculateTotalScore(airbnb);
    const categoryLengths = (categories.length * 5);

    return (score / categoryLengths) * 100;
  };
  const calculatePricePerStar = (airbnb) => {
    return ((airbnb.price / calculateTotalScore(airbnb)).toFixed(2));
  };
  const cbnbRating = (airbnb) => {
    return (calculateWeightedScore(airbnb) / calculatePricePerStar(airbnb)).toFixed(2);
  };

  const calculateWeightedScore = (airbnb) => {
    return categories.reduce((sum, category) => {
      const rating = airbnb.ratings[category.name] || 0;
      return sum + rating * category.weight;
    }, 0);
  };

  const handleOpenSettings = () => {
    setTempCategories([...categories]); // Create a copy of current categories
    setIsSettingsOpen(true);
  };
  const handleCloseSettings = () => setIsSettingsOpen(false);

  const handleCategoryNameChange = (index, newName) => {
    const updatedCategories = [...tempCategories];
    updatedCategories[index].name = newName;
    setTempCategories(updatedCategories);
    setHasModalChanges(true);
  };

  const handleCategoryWeightChange = (index, newWeight) => {
    const updatedCategories = [...tempCategories];
    updatedCategories[index].weight = newWeight;
    setTempCategories(updatedCategories);
    setHasModalChanges(true);
  };

  const handleAddCategory = () => {
    setTempCategories([...tempCategories, { name: 'New Category', weight: 1 }]);
    setHasModalChanges(true);
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = tempCategories.filter((_, i) => i !== index);
    setTempCategories(updatedCategories);
    setHasModalChanges(true);
  };

  // const handleUpdateTrip = () => {
  //   if (currentTrip) {
  //     setTrips(trips.map(trip =>
  //       trip.id === currentTrip.id
  //         ? { ...trip, airbnbs: [...airbnbs], categories: [...categories] }
  //         : trip
  //     ));
  //     setHasUnsavedChanges(false);
  //   }
  // };

  const handleUpdateTrip = () => {
    if (currentTrip) {
      // Update airbnb ratings to remove any deleted categories
      const updatedAirbnbs = airbnbs.map(airbnb => {
        const newRatings = {};
        categories.forEach(category => {
          newRatings[category.name] = airbnb.ratings[category.name] || 0;
        });
        return { ...airbnb, ratings: newRatings };
      });
  
      const updatedTrip = {
        ...currentTrip,
        airbnbs: updatedAirbnbs,
        categories: categories
      };
  
      setAirbnbs(updatedAirbnbs);
      setTrips(trips.map(trip =>
        trip.id === currentTrip.id ? updatedTrip : trip
      ));
      setCurrentTrip(updatedTrip);
      setHasUnsavedChanges(false);
    }
  };
  

  const getNextCopyNumber = (trips, originalName) => {
    const copyRegex = /^(.+) - COPY (\d+)$/;
    const relatedTrips = trips.filter(trip =>
      trip.name === originalName ||
      trip.name.startsWith(originalName + ' - COPY ')
    );

    let maxNumber = 0;
    relatedTrips.forEach(trip => {
      const match = trip.name.match(copyRegex);
      if (match) {
        const number = parseInt(match[2]);
        maxNumber = Math.max(maxNumber, number);
      }
    });

    return maxNumber + 1;
  };

  const handleDuplicateTrip = (tripId) => {
    const originalTrip = trips.find(trip => trip.id === tripId);
    if (originalTrip) {
      const copyNumber = getNextCopyNumber(trips, originalTrip.name);
      const newTrip = {
        ...originalTrip,
        id: uuidv4(),
        name: `${originalTrip.name} - COPY ${copyNumber}`,
        airbnbs: [...originalTrip.airbnbs],
        categories: [...originalTrip.categories]
      };
      setTrips([...trips, newTrip]);
    }
  };

  const renderComparisonTable = () => {
    if (airbnbs.length === 0) {
      return <Typography variant="body1">No Airbnbs added yet.</Typography>;
    }

    const displayedAirbnbs = airbnbs.slice(0, 10);

    return (
      <TableContainer component={Paper} sx={{ marginTop: 2 }} className='comparison-table'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Airbnb</TableCell>
              {categories.map((category) => (
                <TableCell key={category.name}>{category.name}</TableCell>
              ))}
              <TableCell>Notes</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total Stars</TableCell>
              <TableCell>Price Per Star</TableCell>
              <TableCell>Weighted Stars</TableCell>
              <TableCell>CBNB Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedAirbnbs.map((airbnb) => (
              <TableRow key={airbnb.id}>
                <TableCell>
                  <a href={airbnb.link} target="_blank" rel="noopener noreferrer">
                    {airbnb.name}
                  </a>
                </TableCell>
                {categories.map((category) => (
                  <TableCell key={category.name}>{airbnb.ratings[category.name]}</TableCell>
                ))}
                <TableCell>{airbnb.notes}</TableCell>
                <TableCell>${airbnb.price}</TableCell>
                <TableCell>
                  {calculateTotalScore(airbnb)} / {categories.length * 5} ({calculateTotalScorePercentage(airbnb, categories).toFixed(0)}%)
                </TableCell>
                <TableCell>{calculatePricePerStar(airbnb)}</TableCell>
                <TableCell>{calculateWeightedScore(airbnb)}</TableCell>
                <TableCell>{cbnbRating(airbnb)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderSettingsModal = () => (
    <Modal open={isSettingsOpen} onClose={handleCloseSettings}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
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
                sx={{ marginRight: 2 }}
              />
              <Box sx={{ width: 100, display: 'flex', alignItems: 'center' }}>
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
          <Button onClick={() => {
            setIsSettingsOpen(false);
            setHasModalChanges(false);
          }} variant="outlined">
            Cancel
          </Button>
          {/* <Button onClick={() => {
            setCategories(tempCategories);
            handleUpdateTrip();
            setIsSettingsOpen(false);
            setHasModalChanges(false);
          }} 
          variant="contained" 
          color="primary">
            Save Changes
          </Button> */}

          <Button onClick={() => {
            // Update the main categories state with the temporary changes
            setCategories(tempCategories);
            
            // Update airbnb ratings to match the new category structure
            const updatedAirbnbs = airbnbs.map(airbnb => {
              const newRatings = {};
              tempCategories.forEach(category => {
                newRatings[category.name] = airbnb.ratings[category.name] || 0;
              });
              return { ...airbnb, ratings: newRatings };
            });
            
            setAirbnbs(updatedAirbnbs);
            
            // Update the current trip with new categories and airbnb data
            if (currentTrip) {
              const updatedTrip = {
                ...currentTrip,
                categories: tempCategories,
                airbnbs: updatedAirbnbs
              };
              setCurrentTrip(updatedTrip);
              setTrips(trips.map(trip =>
                trip.id === currentTrip.id ? updatedTrip : trip
              ));
            }
            
            setIsSettingsOpen(false);
            setHasModalChanges(false);
          }} 
          variant="contained" 
          color="primary">
            Save Changes
          </Button>

        </Box>
      </Box>
    </Modal>
  );
  

  return (
    <Box sx={{ padding: 2, minHeight: '100vh' }}>
      <div className='page-wrapper'>
        {/* Header Bar */}
        <AppBar position="static" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h4" style={{marginRight: 'auto'}}>CompareBnB</Typography>
            {/* <Typography variant="h6">Airbnb Trip Planner</Typography> */}
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Button onClick={handleStartNewTrip}>Start A New Trip</Button>

          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Grid container spacing={3}>
          {/* Left Sidebar - Trip Management */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={{ p: 2 }} className='trip-management'>
              <Typography variant="h5">My Trips</Typography>
              {/* Trip List */}
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
                          {/* <IconButton
                            onClick={() => handleStartEditing(trip)}
                            sx={{ mr: 1 }}
                            variant="outlined"
                          >
                            <EditIcon  />
                          </IconButton> */}
                          {/* <IconButton
                            onClick={() => handleDuplicateTrip(trip.id)}
                            sx={{ mr: 1 }}
                          >
                            <ContentCopyIcon />
                          </IconButton> */}
                          {/* <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveTrip(trip.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton> */}
                        </>
                      )}
                    </ListItem>
                  ))}

                </List>

              )}

            </Paper>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} md={8} lg={9}>
            {currentTrip ? (
              /* Active Trip View */
              <Paper sx={{ p: 2 }} className='trip-view' style={{ padding: '1rem 2rem 3rem' }}>
                <Box>
                  {/* Trip Header */}

                  {/* <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button onClick={handleUpdateTrip}>Save Changes</Button>
                    <Button onClick={handleStartNewTrip}>Exit Trip</Button>
                  </Box> */}

                  <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                    <Typography variant="h3" sx={{ flexGrow: 1 }}>{currentTrip.name}
                      <Typography variant="body2">{currentTrip.startDate} - {currentTrip.endDate}</Typography>
                    </Typography>

                  </Box>

                  {/* Trip Header */}
                  <Box sx={{ mb: 3 }}>
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
                        <div className='buttons-wrapper'>
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={handleStartTripDetailsEdit}
                          >
                            Edit Details
                          </Button>
                          <IconButton
                            onClick={() => handleDuplicateTrip(currentTrip.id)}
                            sx={{ mr: 1 }}
                          >
                            <ContentCopyIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveTrip(currentTrip.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </Box>
                    )}
                  </Box>

                  <br />
                  <Divider sx={{ my: 2 }} />
                  <br />

                  {/* Properties List & Comparison */}
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
                              {/* Add notes preview - show if notes exist */}
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

                    <br />

                    {/* Add Airbnb Form */}
                    <Paper sx={{ p: 2, mb: 3 }} className='airbnb-form'>
                      <Typography variant="h6">Add New Property</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <TextField fullWidth label="Name" value={newAirbnbName} onChange={(e) => setNewAirbnbName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField fullWidth label="Location" value={newAirbnbLocation} onChange={(e) => setNewAirbnbLocation(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField fullWidth label="Link" value={newAirbnbLink} onChange={(e) => setNewAirbnbLink(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField fullWidth label="Price" value={newAirbnbPrice} onChange={(e) => setNewAirbnbPrice(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <Button fullWidth variant="contained" onClick={handleAddAirbnb}>Add</Button>
                        </Grid>
                      </Grid>
                    </Paper>


                    <br />
                    <Divider sx={{ my: 2 }} />
                    <br />

                    <Typography variant="h5" style={{marginTop: '1rem', textAlign: 'center'}}>Award Winners</Typography>
                    <div className='top-performance-airbnbs'>
                      
                      <div className='top-performance-airbnb'>
                        <h4 className='tpa-title'>Top Weighted Scores</h4>
                        <h6 className='tpa-subtitle'>Higher is better</h6>
                        <ul>
                          {airbnbs
                            .sort((a, b) => calculateWeightedScore(b) - calculateWeightedScore(a))
                            .slice(0, 3)
                            .map((airbnb) => (
                              <li className='topair-weighted' key={airbnb.id}>
                                <div className='data-value'>{calculateWeightedScore(airbnb)}</div>
                                <label title={airbnb.name}>{airbnb.name}</label>
                              </li>
                          ))}
                        </ul>
                      </div>

                      <div className='top-performance-airbnb'>
                        <h4 className='tpa-title'>Most 5 Star Categories</h4>
                        <h6 className='tpa-subtitle'>Higher is better</h6>
                        <ul>
                          {airbnbs
                            .sort((a, b) => {
                              const aFiveStars = Object.values(a.ratings).filter(score => score === 5).length
                              const bFiveStars = Object.values(b.ratings).filter(score => score === 5).length
                              return bFiveStars - aFiveStars
                            })
                            .slice(0, 3)
                            .map((airbnb) => (
                              <li className='topair-cbnb' key={airbnb.id}>
                                <div className='data-value'>{Object.values(airbnb.ratings).filter(score => score === 5).length}</div>
                                <label title={airbnb.name}>{airbnb.name}</label>
                              </li>
                          ))}
                        </ul>
                      </div>

                      <div className='top-performance-airbnb'>
                        <h4 className='tpa-title'>Top CBNB Value</h4>
                        <h6 className='tpa-subtitle'>Higher is better</h6>
                        <ul>
                          {airbnbs
                            .sort((a, b) => cbnbRating(b) - cbnbRating(a))
                            .slice(0, 3)
                            .map((airbnb) => (
                              <li className='topair-cbnb' key={airbnb.id}>
                                <div className='data-value'>{cbnbRating(airbnb)}</div>
                                <label title={airbnb.name}>{airbnb.name}</label>
                              </li>
                          ))}
                        </ul>
                      </div>

                      <div className='top-performance-airbnb'>
                        <h4 className='tpa-title'>Best Stars per Dollar</h4>
                        <h6 className='tpa-subtitle'>Lower is better</h6>
                        <ul>
                          {airbnbs
                            .sort((a, b) => calculatePricePerStar(a) - calculatePricePerStar(b))
                            .slice(0, 3)
                            .map((airbnb) => (
                              <li className='topair-cbnb' key={airbnb.id}>
                                <div className='data-value'>${calculatePricePerStar(airbnb)}</div>
                                <label title={airbnb.name}>{airbnb.name}</label>
                              </li>
                          ))}
                        </ul>
                      </div>
                      
                    </div>
                    

                    <br />
                    <br />
                    <Divider sx={{ my: 2 }} />
                    <br />

                    <Typography variant="h5" style={{marginTop: '1rem', textAlign: 'center'}}>Compare and Contrast Locations</Typography>
                    {airbnbs.length > 0 && (
                      <Grid container spacing={3} className='analysis-section'>
                        
                        <Grid item xs={12} md={12}>
                          <Box>
                            <Typography variant="h6">Price vs. Score Analysis</Typography>
                            <PriceScoreScatter
                              airbnbs={airbnbs}
                              calculateWeightedScore={calculateWeightedScore}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Box>
                            <Typography variant="h6">CBNB Value by Category</Typography>
                            <CategoryCBNBChart
                              airbnbs={airbnbs}
                              categories={categories}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Box>
                            <Typography variant="h6">Category Ratings Comparison</Typography>
                            <CategoryComparisonBar
                              airbnbs={airbnbs}
                              categories={categories}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Box>
                            <Typography variant="h6">Score Composition Analysis</Typography>
                            <StackedScoreBar
                              airbnbs={airbnbs}
                              categories={categories}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Box>
                            <Typography variant="h6">Property Comparison Chart</Typography>
                            <AirbnbRadarChart airbnbs={airbnbs} categories={categories} />
                          </Box>
                        </Grid>
                        
                      </Grid>
                    )}

                    <br />
                    <Divider sx={{ my: 2 }} />
                    <br />

                    <Typography variant="h5" style={{marginTop: '1rem', marginBottom: '3rem', textAlign: 'center'}}>Review All Data</Typography>
                    {airbnbs.length > 0 && renderComparisonTable()}

                  </Box>
                </Box>
              </Paper>
            ) : (
              /* Welcome/Getting Started State */
              <Paper sx={{ p: 2, textAlign: 'center' }} className='welcome-state'>
                <Typography variant="h5">Select a trip or create a new one</Typography>

                <Divider sx={{ my: 2 }} />

                {/* New Trip Creation */}
                {!currentTrip && (
                  <>
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
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
        {renderSettingsModal()}
      </div>
    </Box>
  );
}
export default App;
