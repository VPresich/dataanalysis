import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
// import css from "./LineGraph.module.css";

const LineGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to display.</p>;
  }
  const chartData = {
    labels: data.map((row) => {
      const timeValue = parseFloat(row.X);
      return timeValue.toFixed(2);
    }),
    datasets: [
      {
        label: "Dependence of Y on X",
        data: data.map((row) => parseFloat(row.Y).toFixed(2)),
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
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `X: ${data[index].X}`;
          },
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            return [
              `Y: ${tooltipItem.raw}`,
              `IMM Consistent: ${data[index].IMMconsistent}`,
              `Speed: ${parseFloat(data[index].speed).toFixed(2)}`,
              `Time: ${parseFloat(data[index].Time).toFixed(2)}`,
              `IMM Consistent Value: ${parseFloat(
                data[index].IMMconsistentValue
              ).toFixed(2)}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "X, km",
        },
        beginAtZero: true,
        grid: {
          drawOnChartArea: true,
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "Y, km",
        },
        beginAtZero: true,
        grid: {
          drawOnChartArea: true,
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineGraph;
