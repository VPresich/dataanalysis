import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getPointColor } from "../../auxiliary/getPointColor";
import zoomPlugin from "chartjs-plugin-zoom";
import Button from "../UI/Button/Button";
import css from "./LineGraph.module.css";
Chart.register(...registerables, zoomPlugin);

const getCSSVariableValue = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
};

const optionalTooltipFields = [
  {
    key: "Kde",
    label: "Kde",
    format: (val) => (val !== "None" ? parseFloat(val).toFixed(2) : val),
  },
  {
    key: "KdeWeighted",
    label: "KdeWeighted",
    format: (val) => (val !== "None" ? parseFloat(val).toFixed(2) : val),
  },
  {
    key: "Gaussian",
    label: "Gaussian",
    format: (val) => (val !== "None" ? parseFloat(val).toFixed(2) : val),
  },
  {
    key: "GaussianWeighted",
    label: "GaussianWeighted",
    format: (val) => (val !== "None" ? parseFloat(val).toFixed(2) : val),
  },
  {
    key: "EvaluationNum",
    label: "EvaluationNum",
    format: (val) => (val !== "None" ? parseInt(val, 10) : val),
  },
  {
    key: "TrackConsistent",
    label: "TrackConsistent",
    format: (val) => val,
  },
  {
    key: "VelocityConsistent",
    label: "VelocityConsistent",
    format: (val) => val,
  },
];

const LineGraph = ({ data }) => {
  const chartRef = useRef(null);
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to display.</p>;
  }

  const groupedData = data.reduce((acc, row) => {
    const trackNum = row.TrackNum;
    if (!acc[trackNum]) {
      acc[trackNum] = [];
    }
    acc[trackNum].push(row);
    return acc;
  }, {});

  const datasets = Object.keys(groupedData)
    .map((trackNum, index) => {
      const trackData = groupedData[trackNum];

      if (trackData.length < 5) {
        return null;
      }
      trackData.sort((a, b) => parseFloat(a.Time) - parseFloat(b.Time));
      const lineColor = getCSSVariableValue(`--line${index + 1}`).trim();

      return {
        label: `${trackNum}`,
        data: trackData.map((row) => ({
          x: parseFloat(row.X),
          y: parseFloat(row.Y),
        })),
        fill: false,
        borderColor: lineColor || "rgba(75, 192, 192, 1)",
        pointBackgroundColor: trackData.map((row) => getPointColor(row)),
        pointRadius: trackData.map((row) =>
          row.IMMconsistent === "0" ? 4 : 3
        ),
        tension: 0.1,
      };
    })
    .filter((dataset) => dataset !== null);

  const chartData = {
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            const trackNum = tooltipItems[0].dataset.label;
            const trackData = groupedData[trackNum.replace("Track ", "")];
            return `Track ${trackNum}, X: ${trackData[index].X}`;
          },
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const trackNum = tooltipItem.dataset.label;
            const trackData = groupedData[trackNum.replace("Track ", "")];
            const rowData = trackData[index];

            const lines = [
              `Y: ${tooltipItem.raw.y}`,
              `Z: ${parseFloat(rowData.Z).toFixed(2)}`,
              `Probability: ${parseFloat(rowData.probability).toFixed(5)}`,
              `IMM Consistent: ${rowData.IMMconsistent}`,
              `Speed: ${
                rowData.speed !== "None"
                  ? parseFloat(rowData.speed).toFixed(2)
                  : rowData.speed
              }`,
              `Time: ${parseFloat(rowData.Time).toFixed(2)}`,
              `IMM Consistent Value: ${
                rowData.IMMconsistentValue !== "None"
                  ? parseFloat(rowData.IMMconsistentValue).toFixed(2)
                  : rowData.IMMconsistentValue
              }`,
            ];

            optionalTooltipFields.forEach(({ key, label, format }) => {
              if (key in rowData) {
                const raw = rowData[key];
                const formatted =
                  typeof format === "function" ? format(raw) : raw;
                lines.push(`${label}: ${formatted}`);
              }
            });

            return lines;
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
        grid: {
          drawOnChartArea: true,
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
        },
      },
      y: {
        title: {
          display: true,
          text: "Y, km",
        },
        beginAtZero: false,
        grid: {
          drawOnChartArea: true,
          zeroLineColor: "rgba(0, 0, 0, 0.5)",
          zeroLineWidth: 2,
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
      <Button onClick={resetZoom} btnAuxStyles={css.btnReset}>
        Reset zoom
      </Button>

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
