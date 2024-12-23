import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import { Scatter } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import Button from "../UI/Button/Button";
import {
  selectTrajectoryData,
  selectTrajectory,
} from "../../redux/houghTrajectory/selectors";
import css from "./Hough2DTrajectoryResult.module.css";

Chart.register(...registerables, zoomPlugin);

const Hough2DTrajectoryResult = () => {
  const houghResult = useSelector(selectTrajectory);
  const points = useSelector(selectTrajectoryData);
  const chartRef = useRef(null);

  const renderPointsAndTrajectory = () => {
    if (!houghResult) return null;
    const { bestTrajectory } = houghResult;
    if (!bestTrajectory || bestTrajectory.length === 0) return null;

    const xMax = Math.max(...points.map((p) => p.x));
    const xMin = Math.min(...points.map((p) => p.x));

    const { x0, y0, vx, vy } = bestTrajectory;

    console.log("bestTrajectory", bestTrajectory);

    const trajectoryData = [];
    for (let t = -50; t <= 100; t++) {
      const x = x0 + vx * t;
      const y = y0 + vy * t;
      if (x < xMin || x > xMax) continue;
      trajectoryData.push({ x, y });
    }
    console.log("trajectoryData", trajectoryData);

    const pointDataset = {
      label: "Points",
      data: points.map(({ x, y, t }) => ({ x, y, t })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 5,
    };

    const trajectoryDataset = {
      label: "Detected Trajectory",
      data: trajectoryData,
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      showLine: true,
      fill: false,
      pointRadius: 0,
    };

    const data = {
      datasets: [pointDataset, trajectoryDataset],
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
        <h2>Points and Detected Trajectory</h2>
        {houghResult && houghResult.bestTrajectory && (
          <ul className={css.trajectoryParams}>
            <li className={css.trajectoryParam}>
              <strong>t0:</strong> {houghResult.bestTrajectory.t0.toFixed(1)}
            </li>
            <li>
              <strong>x0:</strong> {houghResult.bestTrajectory.x0.toFixed(1)}
            </li>
            <li>
              <strong>y0:</strong> {houghResult.bestTrajectory.y0.toFixed(1)}
            </li>
            <li>
              <strong>vx:</strong> {houghResult.bestTrajectory.vx.toFixed(1)}
            </li>
            <li>
              <strong>vy:</strong> {houghResult.bestTrajectory.vy.toFixed(2)}
            </li>
          </ul>
        )}
        <Button onClick={resetZoom} btnAuxStyles={css.btnReset}>
          Reset zoom
        </Button>
      </div>
      <div className={css.chartContainer}>{renderPointsAndTrajectory()}</div>
    </React.Fragment>
  );
};

export default Hough2DTrajectoryResult;
