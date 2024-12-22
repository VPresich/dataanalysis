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
    const { sinusoids, bestLines, maxVal } = result;
    if (sinusoids.length === 0 || !bestLines) return null;

    const data = {
      datasets: [
        ...sinusoids.map(({ point, data: sinusoidData }, i) => ({
          label: `Point ${i + 1} (${point.x}, ${point.y})`,
          data: sinusoidData.map(({ theta, rho }) => ({ x: theta, y: rho })),
          borderColor: `rgba(0, 123, 255, ${0.5 + (i % 2) * 0.3})`,
          showLine: false,
          fill: false,
          pointRadius: 2,
        })),
        {
          label: `Max Intersection Points (Value: ${maxVal})`,
          data: bestLines.map(({ theta, rho }) => ({
            x: theta,
            y: rho,
          })),
          labels: bestLines.map(
            ({ indices: { rhoIndex, thetaIndex } }) =>
              `[RhoIdx: ${rhoIndex}, ThetaIdx: ${thetaIndex}]`
          ),
          backgroundColor: "rgba(255, 0, 0, 0.8)",
          pointRadius: 4,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const datasetLabel = context.dataset.label || "";
              const dataIndex = context.dataIndex;

              if (datasetLabel.includes("Max Intersection Points")) {
                const { labels } = context.dataset;
                const customLabel = labels ? labels[dataIndex] : "";
                return [
                  `Cell: ${customLabel}`,
                  `Rho: ${context.raw.y.toFixed(2)}`,
                  `Theta: ${context.raw.x.toFixed(2)}`,
                  `Max Value: ${maxVal}`,
                ];
              }
              [
                `Rho: ${context.raw.y.toFixed(2)}`,
                `Theta: ${context.raw.x.toFixed(2)}`,
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
