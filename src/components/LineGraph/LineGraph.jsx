import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
// import css from "./LineGraph.module.css";

const LineGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to display.</p>;
  }
  console.log("data:", data);
  const chartData = {
    labels: data.map((row) => {
      const timeValue = parseFloat(row.Time);
      return timeValue.toFixed(2);
    }),
    datasets: [
      {
        label: "Dependence of Azimuth on time",
        data: data.map((row) => row.speed),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: data.map((row) => {
          if (row.IMMconsistent === "0") {
            return "red";
          } else if (row.IMMconsistent === "None") {
            return "orange";
          } else {
            return "green";
          }
        }),
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time, c",
        },
      },
      y: {
        title: {
          display: true,
          text: "Azimuth. grad",
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineGraph;
