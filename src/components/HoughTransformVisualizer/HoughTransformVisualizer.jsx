import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import { Scatter } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { selectResult } from "../../redux/houghdata/selectors";
import Button from "../UI/Button/Button";

import css from "./HoughTransformVisualizer.module.css";

Chart.register(...registerables, zoomPlugin);

const HoughTransformVisualizer = () => {
  const result = useSelector(selectResult);
  const chartRef = useRef(null);

  const renderAccumulator = () => {
    if (!result) return null;
    const { accumulator, sinusoids, bestLine } = result;
    if (!accumulator || sinusoids.length === 0 || !bestLine) return null;

    const { rho, theta } = bestLine;

    const data = {
      datasets: [
        ...sinusoids.map(({ point, data: sinusoidData }, i) => ({
          label: `Point ${i + 1} (${point.x}, ${point.y})`,
          data: sinusoidData.map(({ theta, rho }) => ({ x: theta, y: rho })),
          borderColor: `rgba(0, 123, 255, ${0.5 + (i % 2) * 0.3})`,
          showLine: true,
          fill: false,
          pointRadius: 0,
        })),
        {
          label: "Detected Cell",
          data: [{ x: theta, y: rho }],
          backgroundColor: "rgba(255, 0, 0, 0.8)",
          pointRadius: 6,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "xy",
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            mode: "xy",
          },
        },
      },
      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "Theta (degrees)",
          },
        },
        y: {
          type: "linear",
          title: {
            display: true,
            text: "Rho",
          },
        },
      },
    };

    return <Scatter ref={chartRef} data={data} options={options} />;
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <React.Fragment>
      <div className={css.headLine}>
        <h2>Sinusoids Visualization</h2>
        <Button onClick={resetZoom} btnAuxStyles={css.btnReset}>
          Reset zoom
        </Button>
      </div>
      {renderAccumulator()}
    </React.Fragment>
  );
};

export default HoughTransformVisualizer;

// const renderAccumulatorHeatmap = () => {
//   if (!result) return null;
//   const { accumulator, sinusoids, bestLine, rhoRes, thetaRes, maxRho, maxVal } =
//     result;

//   if (!accumulator || sinusoids.length === 0 || !bestLine) return null;

//   const { rho, theta } = bestLine;

//   const thetaMin = -Math.PI / 2;
//   const thetaSteps = accumulator[0].length;
//   const rhoSteps = accumulator.length;

//   const heatmapPoints = [];
//   for (let r = 0; r < rhoSteps; r++) {
//     for (let t = 0; t < thetaSteps; t++) {
//       const rho = r * rhoRes - maxRho;
//       const theta = thetaMin + t * thetaRes;
//       const value = accumulator[r][t];
//       heatmapPoints.push({ x: (theta * 180) / Math.PI, y: rho, value });
//     }
//   }

//   const data = {
//     datasets: [
//       {
//         label: "Accumulator Heatmap",
//         data: heatmapPoints.map(({ x, y, value }) => ({
//           x,
//           y,
//           r: Math.sqrt(value) * 5,
//         })),
//         backgroundColor: (context) => {
//           const value = context.raw.value;
//           const alpha = Math.min(1, value / maxVal);
//           return `rgba(255, ${255 - alpha * 255}, 0, ${alpha})`;
//         },
//       },
//        ...sinusoids.map(({ point, data: sinusoidData }, i) => ({
//           label: `Point ${i + 1} (x: ${point.x}, y: ${point.y})`,
//           data: sinusoidData.map(({ theta, rho }) => ({ x: theta, y: rho })),
//           borderColor: `rgba(0, 123, 255, ${0.5 + (i % 2) * 0.3})`,
//           showLine: true,
//           fill: false,
//           pointRadius: 0,
//         })),
//         {
//           label: "Detected Cell",
//           data: [{ x: theta, y: rho }],
//           backgroundColor: "rgba(255, 0, 0, 0.8)",
//           pointRadius: 6,
//         },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: true },
//     },
//     scales: {
//       x: {
//         type: "linear",
//         title: { display: true, text: "Theta (degrees)" },
//       },
//       y: {
//         type: "linear",
//         title: { display: true, text: "Rho" },
//       },
//     },
//   };

//   return <Scatter data={data} options={options} />;
// };
