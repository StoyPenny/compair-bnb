import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  AppBar,
  Toolbar,
  Grid,
  Divider,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Import components
import TripsList from './components/trips/TripsList';
import TripHeader from './components/trips/TripHeader';
import NewTripForm from './components/trips/NewTripForm';
import PropertyList from './components/airbnbs/PropertyList';
import NewPropertyForm from './components/airbnbs/NewPropertyForm';
import AwardWinners from './components/analysis/AwardWinners';
import ComparisonCharts from './components/analysis/ComparisonCharts';
import ComparisonTable from './components/analysis/ComparisonTable';
import SettingsModal from './components/SettingsModal';

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

// TabPanel component for the tabbed interface
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

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
  // New state for tabs
  const [activeTab, setActiveTab] = useState(0);
  const [isPropertyFormOpen, setIsPropertyFormOpen] = useState(false);

  const handleOpenPropertyForm = () => {
    console.log('Opening property form modal');
    setIsPropertyFormOpen(true);
  };

  const handleClosePropertyForm = () => {
    setIsPropertyFormOpen(false);
  };

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
      setActiveTab(0); // Reset to first tab when viewing a trip
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

  const handleStartTripDetailsEdit = () => {
    setEditingTripDetails({
      name: currentTrip.name,
      startDate: currentTrip.startDate,
      endDate: currentTrip.endDate,
      description: currentTrip.description
    });
    setIsEditingTripDetails(true);
  };

  const handleSaveTripDetails = () => {
    setTrips(trips.map(trip =>
      trip.id === currentTrip.id
        ? { ...trip, ...editingTripDetails }
        : trip
    ));
    setCurrentTrip({ ...currentTrip, ...editingTripDetails });
    setIsEditingTripDetails(false);
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

  const calculateWeightedScore = (airbnb) => {
    return categories.reduce((sum, category) => {
      const rating = airbnb.ratings[category.name] || 0;
      return sum + rating * category.weight;
    }, 0);
  };

  const cbnbRating = (airbnb) => {
    return (calculateWeightedScore(airbnb) / calculatePricePerStar(airbnb)).toFixed(2);
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

  const handleSaveSettings = () => {
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
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ padding: 2, minHeight: '100vh' }}>
      <div className='page-wrapper'>
        {/* Header Bar */}
        <AppBar position="static" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h4" style={{marginRight: 'auto'}}>CompairBnB</Typography>
            <Button onClick={handleStartNewTrip}>Start A New Trip</Button>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Grid container spacing={3}>
          {/* Left Sidebar - Trip Management */}
          <Grid item xs={12} md={4} lg={3}>
            <TripsList 
              trips={trips}
              editingTripId={editingTripId}
              editingTripName={editingTripName}
              handleStartEditing={handleStartEditing}
              handleSaveEdit={handleSaveEdit}
              handleCancelEdit={handleCancelEdit}
              handleViewTrip={handleViewTrip}
              handleDuplicateTrip={handleDuplicateTrip}
              handleRemoveTrip={handleRemoveTrip}
              setEditingTripName={setEditingTripName}
              handleStartNewTrip={handleStartNewTrip}
            />
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} md={8} lg={9}>
            {currentTrip ? (
              /* Active Trip View */
              <Paper sx={{ p: 2 }} className='trip-view' style={{ padding: '1rem 2rem 3rem' }}>
                <Box>
                  {/* Trip Header */}
                  <TripHeader 
                    currentTrip={currentTrip}
                    isEditingTripDetails={isEditingTripDetails}
                    editingTripDetails={editingTripDetails}
                    handleStartTripDetailsEdit={handleStartTripDetailsEdit}
                    handleSaveTripDetails={handleSaveTripDetails}
                    setIsEditingTripDetails={setIsEditingTripDetails}
                    setEditingTripDetails={setEditingTripDetails}
                    handleDuplicateTrip={handleDuplicateTrip}
                    handleRemoveTrip={handleRemoveTrip}
                  />

                  <Divider sx={{ my: 2 }} />

                  {/* Properties List */}
                  <PropertyList 
                    airbnbs={airbnbs}
                    categories={categories}
                    handleToggleOpen={handleToggleOpen}
                    handleRatingChange={handleRatingChange}
                    handleNotesChange={handleNotesChange}
                    handleRemoveAirbnb={handleRemoveAirbnb}
                    calculateTotalScore={calculateTotalScore}
                    handleOpenSettings={handleOpenSettings}
                    handleUpdateTrip={handleUpdateTrip}
                    hasUnsavedChanges={hasUnsavedChanges}
                    handleToggleAllProperties={handleToggleAllProperties}
                    allPropertiesOpen={allPropertiesOpen}
                    hasModalChanges={hasModalChanges}
                  />

                  {/* Add Airbnb Form */}
                  <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => setIsPropertyFormOpen(true)}
                      startIcon={<AddIcon />}
                    >
                      Add New Property
                    </Button>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Tabbed interface for analysis sections */}
                  <Box sx={{ width: '100%' }}>
                    <Tabs 
                      value={activeTab} 
                      onChange={handleTabChange} 
                      centered
                      variant="fullWidth"
                    >
                      <Tab label="Award Winners" />
                      <Tab label="Compare & Contrast" />
                      <Tab label="Data Table" />
                    </Tabs>

                    {/* Tab content panels */}
                    <TabPanel value={activeTab} index={0}>
                      <AwardWinners 
                        airbnbs={airbnbs}
                        calculateWeightedScore={calculateWeightedScore}
                        calculatePricePerStar={calculatePricePerStar}
                        cbnbRating={cbnbRating}
                      />
                    </TabPanel>

                    <TabPanel value={activeTab} index={1}>
                      <ComparisonCharts 
                        airbnbs={airbnbs}
                        categories={categories}
                        calculateWeightedScore={calculateWeightedScore}
                      />
                    </TabPanel>

                    <TabPanel value={activeTab} index={2}>
                      <ComparisonTable 
                        airbnbs={airbnbs}
                        categories={categories}
                        calculateTotalScore={calculateTotalScore}
                        calculateTotalScorePercentage={calculateTotalScorePercentage}
                        calculatePricePerStar={calculatePricePerStar}
                        calculateWeightedScore={calculateWeightedScore}
                        cbnbRating={cbnbRating}
                      />
                    </TabPanel>
                  </Box>
                </Box>
              </Paper>
            ) : (
              /* Welcome/Getting Started State */
              <Paper sx={{ p: 2, textAlign: 'center' }} className='welcome-state'>
                <Typography variant="h5">Select a trip or create a new one</Typography>
                <NewTripForm 
                  newTripName={newTripName}
                  newTripStartDate={newTripStartDate}
                  newTripEndDate={newTripEndDate}
                  newTripDescription={newTripDescription}
                  setNewTripName={setNewTripName}
                  setNewTripStartDate={setNewTripStartDate}
                  setNewTripEndDate={setNewTripEndDate}
                  setNewTripDescription={setNewTripDescription}
                  handleAddTrip={handleAddTrip}
                />
              </Paper>
            )}
          </Grid>
        </Grid>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={isSettingsOpen}
          onClose={handleCloseSettings}
          tempCategories={tempCategories}
          handleCategoryNameChange={handleCategoryNameChange}
          handleCategoryWeightChange={handleCategoryWeightChange}
          handleAddCategory={handleAddCategory}
          handleRemoveCategory={handleRemoveCategory}
          handleSaveSettings={handleSaveSettings}
          hasModalChanges={hasModalChanges}
        />
        <NewPropertyForm 
          isOpen={isPropertyFormOpen}
          onClose={() => setIsPropertyFormOpen(false)}
          newAirbnbName={newAirbnbName}
          newAirbnbLocation={newAirbnbLocation}
          newAirbnbLink={newAirbnbLink}
          newAirbnbPrice={newAirbnbPrice}
          setNewAirbnbName={setNewAirbnbName}
          setNewAirbnbLocation={setNewAirbnbLocation}
          setNewAirbnbLink={setNewAirbnbLink}
          setNewAirbnbPrice={setNewAirbnbPrice}
          handleAddAirbnb={handleAddAirbnb}
        />
      </div>
    </Box>
  );
}

export default App;

