import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CategoryComparisonBar = ({ airbnbs, categories }) => {

  const chartRef = useRef(null);

  const colors = [
    'rgba(255, 99, 132, 0.27)',
    'rgba(54, 162, 235, 0.27)',
    'rgba(255, 206, 86, 0.27)',
    'rgba(75, 192, 192, 0.27)',
    'rgba(153, 102, 255, 0.27)',    
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
      borderColor: colors[index % colors.length].replace('0.27', '1'),
      borderWidth: 2
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Ratings Comparison'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y} stars`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        title: {
          display: true,
          text: 'Rating'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Categories'
        }
      }
    }
  };

  // return (
  //   <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
  //     <Bar data={data} options={options} />
  //   </div>
  // );
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => toggleAll(true)}>Show All</button>
        <button onClick={() => toggleAll(false)}>Hide All</button>
      </div>
      <div >
        <Bar ref={chartRef}  data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryComparisonBar;
