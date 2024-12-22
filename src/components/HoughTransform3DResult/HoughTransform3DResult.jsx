import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Plot from "react-plotly.js";
import {
  selectResult3D,
  selectHoughData,
} from "../../redux/houghdata/selectors";
import css from "./HoughTransform3DResult.module.css";

const calculateLinePoints = (theta, phi, rho, lambda) => {
  const x0 = rho * Math.sin(theta) * Math.cos(phi);
  const y0 = rho * Math.sin(theta) * Math.sin(phi);
  const t0 = rho * Math.cos(theta);

  const vx = Math.sin(theta) * Math.cos(phi);
  const vy = Math.sin(theta) * Math.sin(phi);
  const vt = Math.cos(theta);

  const x = x0 + lambda * vx;
  const y = y0 + lambda * vy;
  const t = t0 + lambda * vt;

  return { x, y, t };
};

const HoughTransform3DResult = () => {
  const result = useSelector(selectResult3D);
  const points = useSelector(selectHoughData);
  const plotRef = useRef(null);

  const minT = Math.min(...points.map(({ t }) => t));
  const maxT = Math.max(...points.map(({ t }) => t));

  const renderPointsAndLines = () => {
    if (!result) return null;
    const { bestSurfaces } = result;

    if (!bestSurfaces || bestSurfaces.length === 0) return null;

    const linesData = bestSurfaces.map(({ theta, phi, rho }) => {
      const thetaRad = (theta * Math.PI) / 180;
      const phiRad = (phi * Math.PI) / 180;

      const point1 = calculateLinePoints(thetaRad, phiRad, rho, 0);
      const point2 = calculateLinePoints(thetaRad, phiRad, rho, maxT - minT);
      const point3 = calculateLinePoints(
        thetaRad,
        phiRad,
        rho,
        2 * (maxT - minT)
      );

      return {
        lineX: [point1.x, point2.x, point3.x],
        lineY: [point1.y, point2.y, point3.y],
        lineT: [point1.t, point2.t, point3.t],
      };
    });

    const originalX = points.map((point) => point.x);
    const originalY = points.map((point) => point.y);
    const originalT = points.map((point) => point.t);

    const data = [
      {
        type: "scatter3d",
        mode: "lines+markers",
        x: originalX,
        y: originalY,
        z: originalT,
        marker: {
          size: 5,
          color: "blue",
          opacity: 0.6,
        },
        name: "Original Points",
        hovertemplate: `X: %{x}<br>Y: %{y}<br>T: %{z}<extra></extra>`,
      },
      ...linesData.map((lineData, index) => ({
        type: "scatter3d",
        mode: "lines+markers",
        x: lineData.lineX,
        y: lineData.lineY,
        z: lineData.lineT,
        line: {
          color: `rgb(${(index * 50) % 255}, ${(index * 80) % 255}, ${
            (index * 120) % 255
          })`,
          width: 2,
        },
        name: `Hough Line ${index + 1}`,
      })),
    ];

    const layout = {
      scene: {
        xaxis: { title: "X" },
        yaxis: { title: "Y" },
        zaxis: { title: "T (Time)" },
      },
      title: "Hough Transform 3D Line Visualization",
      margin: { l: 10, r: 10, b: 10, t: 40 },
    };

    return <Plot ref={plotRef} data={data} layout={layout} />;
  };

  return (
    <React.Fragment>
      <div className={css.chartContainer}>{renderPointsAndLines()}</div>
    </React.Fragment>
  );
};

export default HoughTransform3DResult;
