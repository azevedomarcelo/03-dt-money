import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { WrapperContainer } from './styles';

type ChartProps = {
  dataChart: Transactions[];
}

type Transactions = {
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}


export function Chart({ dataChart }: ChartProps) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = dataChart.map(data => data.category);

  const data = {
    labels,
    datasets: [
      {
        label: "Entrada",
        data: dataChart.map(data => data.type === "income" && data.price),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: "Saída",
        data: dataChart.map(data => data.type === "outcome" && data.price),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <WrapperContainer>
      <Bar options={options} data={data} />
    </WrapperContainer>
  )
}