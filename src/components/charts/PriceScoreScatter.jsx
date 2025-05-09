import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const PriceScoreScatter = ({ airbnbs, calculateWeightedScore }) => {
  const chartRef = useRef(null);

  // Transform airbnb data into scatter plot points
  const scatterData = airbnbs.map(airbnb => ({
    x: airbnb.price,
    y: calculateWeightedScore(airbnb),
    label: airbnb.name
  }));

  const toggleAll = (show) => {
    const chart = chartRef.current;
    if (chart) {
      chart.data.datasets.forEach((dataset, index) => {
        const meta = chart.getDatasetMeta(index);
        meta.hidden = !show;
      });
      chart.update();
    }
  };

  const data = {
    datasets: [{
      label: 'Price vs. Weighted Score',
      data: scatterData,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      pointRadius: 8,
      pointHoverRadius: 10,
    }]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price ($)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Weighted Score'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = scatterData[context.dataIndex];
            return `${point.label}: $${point.x}, Score: ${point.y.toFixed(1)}`;
          }
        }
      }
    }
  };

  // return (
  //   <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
  //     <Scatter data={data} options={options} />
  //   </div>
  // );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => toggleAll(true)}>Show All</button>
        <button onClick={() => toggleAll(false)}>Hide All</button>
      </div>
      <div>
        <Scatter ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default PriceScoreScatter;
