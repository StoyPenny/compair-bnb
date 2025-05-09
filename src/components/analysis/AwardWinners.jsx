import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const AwardWinners = ({ 
  airbnbs, 
  calculateWeightedScore, 
  calculatePricePerStar, 
  cbnbRating 
}) => {
  return (
    <Box>
      <Typography variant="h5" style={{textAlign: 'center', marginBottom: '2rem'}}>Award Winners</Typography>
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
    </Box>
  );
};

export default AwardWinners;