import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import Button from "../UI/Button/Button";
import css from "./LineGraph.module.css";
Chart.register(...registerables, zoomPlugin);

const getPointColor = (immConsistent) => {
  if (immConsistent === "0") {
    return "red";
  } else if (immConsistent === "None") {
    return "orange";
  }
  return "green";
};

const LineGraph = ({ data }) => {
  const chartRef = useRef(null);

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

  const step = Math.ceil((maxXValue - minXValue) / 5);

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
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          enabled: true,
          mode: "xy",
          wheel: { enabled: true },
          pinch: { enabled: true },
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

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <React.Fragment>
      <Button onClick={resetZoom}>Reset Zoom</Button>
      <Line
        className={css.container}
        ref={chartRef}
        data={chartData}
        options={options}
      />
    </React.Fragment>
  );
};

export default LineGraph;
