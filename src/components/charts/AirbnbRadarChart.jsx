import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AirbnbRadarChart = ({ airbnbs, categories }) => {

  const chartRef = useRef(null);

  const colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
  ];

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
    labels: categories.map(cat => cat.name),
    datasets: airbnbs.map((airbnb, index) => ({
      label: airbnb.name,
      data: categories.map(cat => airbnb.ratings[cat.name]),
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1
    }))
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    }
  };


  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => toggleAll(true)}>Show All</button>
        <button onClick={() => toggleAll(false)}>Hide All</button>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Radar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default AirbnbRadarChart;
