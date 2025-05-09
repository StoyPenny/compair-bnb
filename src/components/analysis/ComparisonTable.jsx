import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';

const ComparisonTable = ({
  airbnbs,
  categories,
  calculateTotalScore,
  calculateTotalScorePercentage,
  calculatePricePerStar,
  calculateWeightedScore,
  cbnbRating
}) => {
  if (airbnbs.length === 0) {
    return <Typography variant="body1">No Airbnbs added yet.</Typography>;
  }

  const displayedAirbnbs = airbnbs.slice(0, 10);

  return (
    <Box>
      <Typography variant="h5" style={{textAlign: 'center', marginBottom: '2rem'}}>Review All Data</Typography>
      <TableContainer component={Paper} className='comparison-table'>
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
    </Box>
  );
};

export default ComparisonTable;