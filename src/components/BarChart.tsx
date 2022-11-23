import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Chart,
  ChartData,
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March'];

export const data = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [140, 100, 200],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export default function BarChart(data: ChartData<'bar'>) {
  return <Bar options={options} data={data} />;
}
