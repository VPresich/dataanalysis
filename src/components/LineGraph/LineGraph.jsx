import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const getPointColor = (immConsistent) => {
  if (immConsistent === "0") {
    return "red";
  } else if (immConsistent === "None") {
    return "orange";
  }
  return "green";
};

const LineGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const xValues = data
    .map((row) => parseFloat(row.X))
    .filter((value) => !isNaN(value));
  const yValues = data
    .map((row) => parseFloat(row.Y))
    .filter((value) => !isNaN(value));

  const minXValue = Math.min(...xValues);
  const maxXValue = Math.max(...xValues);
  const minYValue = Math.min(...yValues);
  const maxYValue = Math.max(...yValues);

  const step = Math.ceil((maxXValue - minXValue) / 10);

  const chartData = {
    labels: data.map((row) => {
      const xValue = parseFloat(row.X);
      return !isNaN(xValue) ? xValue.toFixed(2) : "";
    }),
    datasets: [
      {
        label: "Dependence of Y on X",
        data: data.map((row) => {
          const yValue = parseFloat(row.Y);
          return !isNaN(yValue) ? yValue.toFixed(2) : null;
        }),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: data.map((row) =>
          getPointColor(row.IMMconsistent)
        ),
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
        type: "linear",
        title: {
          display: true,
          text: "X, km",
        },
        beginAtZero: false,
        min: minXValue,
        max: maxXValue,
        grid: {
          drawOnChartArea: true,
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
        },
        ticks: {
          stepSize: step,
        },
      },
      y: {
        title: {
          display: true,
          text: "Y, km",
        },
        beginAtZero: false,
        min: minYValue,
        max: maxYValue,
        grid: {
          drawOnChartArea: true,
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
        },
        ticks: {
          stepSize: step,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineGraph;
