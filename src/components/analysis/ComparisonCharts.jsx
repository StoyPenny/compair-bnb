import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import AirbnbRadarChart from '../charts/AirbnbRadarChart';
import PriceScoreScatter from '../charts/PriceScoreScatter';
import CategoryComparisonBar from '../charts/CategoryComparisonBar';
import StackedScoreBar from '../charts/StackedScoreBar';
import CategoryCBNBChart from '../charts/CategoryCBNBChart';

const ComparisonCharts = ({ airbnbs, categories, calculateWeightedScore }) => {
  return (
    <Box>
      <Typography variant="h5" style={{textAlign: 'center', marginBottom: '2rem'}}>Compare and Contrast Locations</Typography>
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
    </Box>
  );
};

export default ComparisonCharts;