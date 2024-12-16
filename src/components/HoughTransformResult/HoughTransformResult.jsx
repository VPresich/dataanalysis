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

  const bestLine = result?.bestLine;
  const rho = bestLine?.rho || 0;
  const theta = bestLine?.theta || 0;

  const renderPointsAndLine = () => {
    if (!result) return null;
    const { bestLine } = result;
    if (!bestLine) return null;
    const { rho, theta } = bestLine;

    const minX = Math.min(...points.map(({ x }) => x));
    const maxX = Math.max(...points.map(({ x }) => x));

    const thetaInRadians = (theta * Math.PI) / 180;

    const y1 =
      (rho - minX * Math.cos(thetaInRadians)) / Math.sin(thetaInRadians);
    const y2 =
      (rho - maxX * Math.cos(thetaInRadians)) / Math.sin(thetaInRadians);

    const x0 = rho * Math.cos(thetaInRadians);
    const y0 = rho * Math.sin(thetaInRadians);

    const lineData = {
      labels: ["Detected Line"],
      datasets: [
        {
          label: "Points",
          data: points.map(({ x, y }) => ({ x, y })),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          pointRadius: 5,
        },
        {
          label: "Detected Line",
          data: [
            { x: minX, y: y1 },
            { x: maxX, y: y2 },
          ],
          borderColor: "rgba(0, 123, 255, 1)",
          backgroundColor: "rgba(0, 123, 255, 1)",
          borderWidth: 1,
          fill: false,
          showLine: true,
        },
        {
          label: "Perpendicular Line",
          data: [
            { x: 0, y: 0 },
            { x: x0, y: y0 },
          ],
          borderColor: "rgba(0, 255, 123, 1)",
          backgroundColor: "rgba(0, 255, 123, 1)",
          borderWidth: 1,
          showLine: true,
        },
      ],
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

    return <Scatter ref={chartRef} data={lineData} options={options} />;
  };

  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <React.Fragment>
      <div className={css.headLine}>
        <h2>Points and Detected Line</h2>
        <span>{`Rho: ${rho}, Theta: ${theta}`}</span>
        <Button onClick={resetZoom} btnAuxStyles={css.btnReset}>
          Reset zoom
        </Button>
      </div>
      <div className={css.chartContainer}>{renderPointsAndLine()}</div>
    </React.Fragment>
  );
};

export default HoughTransformResult;
