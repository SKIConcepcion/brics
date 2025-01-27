import { Bar } from "react-chartjs-2";
import {
  Chart as ChartBar,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartBar.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

//labels == room names
//dataset-label = user category

export default function BarChart({data, options}) {
  
  return (
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
};