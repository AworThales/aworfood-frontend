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
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueChart({ salesData }) {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Revenue, Orders & Users Overview',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#222',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#333',
        borderColor: '#ddd',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.formattedValue}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#666',
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        ticks: {
          color: '#198754',
        },
        grid: {
          color: '#f0f0f0',
        },
      },
      y1: {
        type: 'linear',
        display: false,
        position: 'right',
        ticks: {
          color: '#dc3545',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      // y2: {
      //   type: 'linear',
      //   display: false,
      //   position: 'right',
      //   ticks: {
      //     color: '#36a2eb',
      //   },
      //   grid: {
      //     drawOnChartArea: false,
      //   },
      // },
    },
  };

  const labels = salesData?.map((data) => data?.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: salesData?.map((data) => data?.sales),
        borderColor: '#198754',
        backgroundColor: 'rgba(25, 135, 84, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#198754',
        yAxisID: 'y',
      },
      {
        label: 'Orders',
        data: salesData?.map((data) => data?.numOrders),
        borderColor: '#dc3545',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#dc3545',
        yAxisID: 'y1',
      },
      // {
      //   label: 'Users',
      //   data: salesData?.map((data) => data?.numUsers),
      //   borderColor: '#36a2eb',
      //   backgroundColor: 'rgba(54, 162, 235, 0.1)',
      //   fill: true,
      //   tension: 0.4,
      //   pointBackgroundColor: '#36a2eb',
      //   yAxisID: 'y2',
      // },
    ],
  };

  return <Line options={options} data={data} />;
}
