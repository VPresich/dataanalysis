import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { selectResult3D } from "../../redux/houghdata/selectors";
import css from "./HoughTransform3DVisualizer.module.css";

const HoughTransform3DVisualizer = () => {
  const result = useSelector(selectResult3D);

  const renderSurfaces = () => {
    if (!result) return null;

    const { surfaces, bestSurfaces, maxVal = 0 } = result;
    if (surfaces.length === 0 || !bestSurfaces || bestSurfaces.length === 0)
      return null;

    const plots = surfaces.map((surfaceObj, index) => {
      const points = surfaceObj.surface;

      const theta = points.map((point) => point.theta);
      const phi = points.map((point) => point.phi);
      const rho = points.map((point) => point.rho);

      const bestTheta = bestSurfaces.map((point) => point.theta);
      const bestPhi = bestSurfaces.map((point) => point.phi);
      const bestRho = bestSurfaces.map((point) => point.rho);

      const data = [
        {
          type: "scatter3d",
          mode: "markers",
          x: theta,
          y: phi,
          z: rho,
          marker: {
            size: 5,
            color: rho,
            colorscale: "Viridis",
            opacity: 0.8,
          },
          name: `Surface ${index + 1}`,
          hovertemplate: `Theta: %{x}<br> Phi: %{y}<br> Rho: %{z}<extra></extra>
    `,
        },
        {
          type: "scatter3d",
          mode: "markers",
          x: bestTheta,
          y: bestPhi,
          z: bestRho,
          marker: {
            size: 8,
            color: "red",
            opacity: 1,
            symbol: "circle",
          },
          name: "Best Parameters",
          hovertemplate: `Theta: %{x}<br> Phi: %{y}<br> Rho: %{z}<br> maxVal: ${maxVal}<extra></extra> `,
        },
      ];

      const layout = {
        autosize: true,
        width: null,
        height: null,
        scene: {
          xaxis: {
            title: "θ (Theta)",
          },
          yaxis: {
            title: "ϕ (Phi)",
          },
          zaxis: {
            title: "rho (Radius)",
          },
        },
        title: {
          text: `Hough Transform 3D Visualization - Surface ${
            index + 1
          } (Point: x=${surfaceObj.point.x}, y=${surfaceObj.point.y}, t=${
            surfaceObj.point.t
          })`,
          font: {
            size: 14,
          },
        },
        responsive: true,
        margin: { l: 0, r: 0, t: 100, b: 20 },
      };

      return <Plot key={index} data={data} layout={layout} />;
    });

    return plots;
  };

  return <div className={css.visualizerContainer}>{renderSurfaces()}</div>;
};

export default HoughTransform3DVisualizer;
