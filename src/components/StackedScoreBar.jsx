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

const StackedScoreBar = ({ airbnbs, categories }) => {

  const chartRef = useRef(null);

  // Generate dynamic colors based on index
  const getColor = (index) => {
    const colors = [
      'rgba(255, 99, 132, 0.27)',
      'rgba(54, 162, 235, 0.27)',
      'rgba(255, 206, 86, 0.27)',
      'rgba(75, 192, 192, 0.27)',
      'rgba(153, 102, 255, 0.27)',
      'rgba(255, 159, 64, 0.27)',
      'rgba(199, 199, 199, 0.27)',
      'rgba(83, 102, 255, 0.27)',
      'rgba(255, 99, 255, 0.27)',
      'rgba(159, 159, 64, 0.27)',
    ];
    return colors[index % colors.length];
  };

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
    labels: airbnbs.map(airbnb => airbnb.name),
    datasets: categories.map((category, index) => {
      const color = getColor(index);
      return {
        label: category.name,
        data: airbnbs.map(airbnb => airbnb.ratings[category.name] * category.weight),
        backgroundColor: color,
        borderColor: color.replace('0.27', '1'),
        borderWidth: 2
      };
    })
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Properties'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Weighted Score Composition'
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Score Breakdown by Category'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const categoryName = context.dataset.label;
            const score = context.parsed.y.toFixed(1);
            return `${categoryName}: ${score} points`;
          }
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
      <div>
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );

};

export default StackedScoreBar;
