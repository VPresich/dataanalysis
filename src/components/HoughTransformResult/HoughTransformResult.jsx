import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import { Scatter } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import Button from "../UI/Button/Button";
import { selectResult, selectHoughData } from "../../redux/houghdata/selectors";
import css from "./HoughTransformResult.module.css";

Chart.register(...registerables, zoomPlugin);

const HoughTransformResult = () => {
  const result = useSelector(selectResult);
  const points = useSelector(selectHoughData);
  const chartRef = useRef(null);

  const renderPointsAndLines = () => {
    if (!result) return null;
    const { bestLines } = result;
    if (!bestLines || bestLines.length === 0) return null;

    const minX = Math.min(...points.map(({ x }) => x));
    const maxX = Math.max(...points.map(({ x }) => x));

    const lineDatasets = bestLines.map(({ rho, theta }, index) => {
      const thetaInRadians = (theta * Math.PI) / 180;

      const y1 =
        (rho - minX * Math.cos(thetaInRadians)) / Math.sin(thetaInRadians);
      const y2 =
        (rho - maxX * Math.cos(thetaInRadians)) / Math.sin(thetaInRadians);

      return {
        label: `Line ${index + 1} (Rho: ${rho}, Theta: ${theta})`,
        data: [
          { x: minX, y: y1 },
          { x: maxX, y: y2 },
        ],
        borderColor: `rgba(${(index * 50) % 255}, ${(index * 80) % 255}, ${
          (index * 120) % 255
        }, 1)`,
        borderWidth: 1,
        fill: false,
        showLine: true,
        pointRadius: 0,
      };
    });

    const pointDataset = {
      label: "Points",
      data: points.map(({ x, y }) => ({ x, y })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
    };

    const data = {
      datasets: [pointDataset, ...lineDatasets],
    };

    const options = {
      responsive: true,
      aspectRatio: 1,
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
          position: "bottom",
          ticks: {
            beginAtZero: true,
          },
        },
        y: {
          type: "linear",
          position: "left",
          ticks: {
            beginAtZero: true,
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
        <h2>Points and Detected Lines</h2>
        <Button onClick={resetZoom} btnAuxStyles={css.btnReset}>
          Reset zoom
        </Button>
      </div>
      <div className={css.chartContainer}>{renderPointsAndLines()}</div>
    </React.Fragment>
  );
};

export default HoughTransformResult;
