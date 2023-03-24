import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Avgust',
  'September',
  'October',
  'November',
  'December',
];

export const data = (dataSet) => {
  return {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataSet,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};

const ChartActive = ({ activeClientsNmb, dataSet, percentage }) => {
  return (
    <div className='chart'>
      <Line options={options} data={data(dataSet)} />
      <div className='chart-subsection'>
        <p style={{ marginRight: '4%' }}>active: {activeClientsNmb}</p>
        <p style={{ marginRight: '2%' }}>{percentage.toFixed(0)}%</p>
        {percentage > 0 ? <BiTrendingUp /> : <BiTrendingDown />}
      </div>
    </div>
  );
};

export default ChartActive;
