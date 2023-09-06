import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AttendanceMetrics } from "../../types/metricsTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  metric: AttendanceMetrics;
};

const Chart = ({ metric }: ChartProps) => {
  const labels = ["Boys", "Girls", "Total"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Present",
        // data: [20, 30, 40, 50, 60, 70],
        data: [metric?.boys_present, metric?.girl_present, 1],
        backgroundColor: "green",
      },
      {
        label: "Absent",
        // data: [20, 30, 40, 50, 60, 70],
        data: [metric?.boys_absent, metric?.girls_absent, 1],
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
