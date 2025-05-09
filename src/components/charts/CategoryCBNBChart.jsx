import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CategoryCBNBChart = ({ airbnbs, categories }) => {
  const chartRef = useRef(null);

  const colors = [
    'rgba(255, 99, 132, 0.15)',
    'rgba(54, 162, 235, 0.15)',
    'rgba(255, 206, 86, 0.15)',
    'rgba(75, 192, 192, 0.15)',
    'rgba(153, 102, 255, 0.15)',  
    'rgba(255, 159, 64, 0.15)',
    'rgba(255, 99, 132, 0.15)',
    'rgba(54, 162, 235, 0.15)',
    'rgba(255, 206, 86, 0.15)',
    'rgba(75, 192, 192, 0.15)'
  ];
  const borderColors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0'
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
      data: categories.map(category => {
        const rating = airbnb.ratings[category.name] || 0;
        const categoryValue = (rating * category.weight) / airbnb.price;
        return categoryValue.toFixed(2);
      }),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      pointBorderColor: borderColors[index % colors.length],
      pointBackgroundColor: borderColors[index % colors.length],
      pointBorderWidth: 2,
      fill: false,
      tension: 0.4
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
        text: 'CBNB Value by Category'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value (Rating * Weight / Price)'
        }
      }
    }
  };

  // return <Line data={data} options={options} />;
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => toggleAll(true)}>Show All</button>
        <button onClick={() => toggleAll(false)}>Hide All</button>
      </div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default CategoryCBNBChart;
