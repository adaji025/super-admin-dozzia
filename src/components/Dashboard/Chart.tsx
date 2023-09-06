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

  const totalPresent = metric.boys_present + metric.girl_present
  const totalAbsent = metric.boys_absent + metric.girls_absent

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
        data: [metric?.boys_present, metric?.girl_present, totalPresent],
        backgroundColor: "green",
      },
      {
        label: "Absent",
        data: [metric?.boys_absent, metric?.girls_absent, totalAbsent],
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
