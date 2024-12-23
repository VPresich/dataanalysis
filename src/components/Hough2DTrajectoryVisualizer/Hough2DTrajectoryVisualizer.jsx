import Plot from "react-plotly.js";
import { useSelector } from "react-redux";
import { selectTrajectory } from "../../redux/houghTrajectory/selectors";
import css from "./Hough2DTrajectoryVisualizer.module.css";

const Hough2DTrajectoryVisualizer = () => {
  const result = useSelector(selectTrajectory);
  const renderAccumulatorVisualization = () => {
    if (!result) return null;

    const { accumulator, bestTrajectory, maxVotes = 0 } = result;
    if (!accumulator || !bestTrajectory) return null;

    const surfaceData = [];
    const xLabels = [];
    const tLabels = [];

    // Генерация данных для поверхности
    for (let t = 0; t < accumulator.length; t++) {
      const row = [];
      for (let x = 0; x < accumulator[t].length; x++) {
        let maxVotesAtX = 0; // Переменная для хранения максимума по y
        for (let y = 0; y < accumulator[t][x].length; y++) {
          const votes = accumulator[t][x][y];
          if (votes > maxVotesAtX) {
            maxVotesAtX = votes; // Обновляем максимум
          }
        }
        row.push(maxVotesAtX);
      }
      surfaceData.push(row);
      tLabels.push(t);
    }

    // Лейблы по оси X
    for (let x = 0; x < accumulator[0].length; x++) {
      xLabels.push(x);
    }

    const data = [
      {
        type: "surface",
        z: surfaceData, // Поверхность по Z
        x: xLabels, // Значения X
        y: tLabels, // Значения T
        colorscale: "Viridis",
        opacity: 0.6,
        name: "Accumulator Surface",
        hovertemplate: `x: %{x}<br>t: %{y}<br>votes: %{z}<extra></extra>`,
      },
      {
        type: "scatter3d",
        mode: "markers",
        x: [bestTrajectory.x0],
        y: [bestTrajectory.t0],
        z: [maxVotes],
        marker: {
          size: 10,
          color: "red",
          opacity: 1,
          symbol: "circle",
        },
        name: "Best Trajectory",
        hovertemplate: `x0: %{x}<br>t0: %{y}<br>votes: %{z}<extra></extra>`,
      },
    ];

    const layout = {
      autosize: true,
      scene: {
        xaxis: { title: "X0" },
        yaxis: { title: "T0" },
        zaxis: { title: "Votes" },
      },
      title: {
        text: "Hough Transform 3D Visualization (Surface)",
        font: {
          size: 16,
        },
      },
      margin: { l: 0, r: 0, t: 50, b: 20 },
    };

    return <Plot data={data} layout={layout} />;
  };

  // const renderAccumulatorVisualization = () => {
  //   if (!result) return null;

  //   const { accumulator, bestTrajectory, maxVotes = 0 } = result;
  //   if (!accumulator || !bestTrajectory) return null;

  //   const dataPoints = [];
  //   const xLabels = [];
  //   const yLabels = [];
  //   const tLabels = [];

  //   // Генерация данных из аккумулятора
  //   for (let t = 0; t < accumulator.length; t++) {
  //     for (let x = 0; x < accumulator[t].length; x++) {
  //       for (let y = 0; y < accumulator[t][x].length; y++) {
  //         const votes = accumulator[t][x][y];
  //         if (votes > 5) {
  //           dataPoints.push({ x, y, t, votes });
  //           xLabels.push(x);
  //           yLabels.push(y);
  //           tLabels.push(t);
  //         }
  //       }
  //     }
  //   }

  //   const x = dataPoints.map((point) => point.x);
  //   const y = dataPoints.map((point) => point.y);
  //   const t = dataPoints.map((point) => point.t);
  //   const votes = dataPoints.map((point) => point.votes);

  //   // Данные для Plotly
  //   const data = [
  //     {
  //       type: "scatter3d",
  //       mode: "markers",
  //       x: x,
  //       y: y,
  //       z: t,
  //       marker: {
  //         size: 5,
  //         color: votes, // Используем количество голосов для цвета
  //         colorscale: "Viridis",
  //         opacity: 0.8,
  //       },
  //       name: "Accumulator Points",
  //       hovertemplate: `x: %{x}<br>y: %{y}<br>t: %{z}<br>votes: %{marker.color}<extra></extra>`,
  //     },
  //     {
  //       type: "scatter3d",
  //       mode: "markers",
  //       x: [bestTrajectory.x0],
  //       y: [bestTrajectory.y0],
  //       z: [bestTrajectory.t0],
  //       marker: {
  //         size: 10,
  //         color: "red",
  //         opacity: 1,
  //         symbol: "circle",
  //       },
  //       name: "Best Trajectory",
  //       hovertemplate: `x0: %{x}<br>y0: %{y}<br>t0: %{z}<br>votes: ${maxVotes}<extra></extra>`,
  //     },
  //   ];

  //   const layout = {
  //     autosize: true,
  //     scene: {
  //       xaxis: { title: "X0" },
  //       yaxis: { title: "Y0" },
  //       zaxis: { title: "T0" },
  //     },
  //     title: {
  //       text: "Hough Transform 3D Visualization (Accumulator)",
  //       font: {
  //         size: 16,
  //       },
  //     },
  //     margin: { l: 0, r: 0, t: 50, b: 20 },
  //   };

  //   return <Plot data={data} layout={layout} />;
  // };

  return (
    <div className={css.visualizerContainer}>
      {renderAccumulatorVisualization()}
    </div>
  );
};

export default Hough2DTrajectoryVisualizer;

// import Plot from "react-plotly.js";
// import { useSelector } from "react-redux";
// import { selectTrajectory } from "../../redux/houghTrajectory/selectors";
// import css from "./Hough2DTrajectoryVisualizer.module.css";

// const Hough2DTrajectoryVisualizer = () => {
//   const result = useSelector(selectTrajectory);

//   const renderAccumulatorVisualization = () => {
//     if (!result) return null;

//     const { accumulator, bestTrajectory, maxVotes = 0 } = result;
//     if (!accumulator || !bestTrajectory) return null;

//     const dataPoints = [];
//     const xLabels = [];
//     const zLabels = [];
//     const votesData = [];

//     // Генерация данных из аккумулятора
//     for (let t = 0; t < accumulator.length; t++) {
//       for (let x = 0; x < accumulator[t].length; x++) {
//         for (let y = 0; y < accumulator[t][x].length; y++) {
//           const votes = accumulator[t][x][y];
//           if (votes > 0) {
//             dataPoints.push({ x0: x, t0: t, votes });
//             xLabels.push(x);
//             zLabels.push(t);
//             votesData.push(votes);
//           }
//         }
//       }
//     }

//     const x0 = dataPoints.map((point) => point.x0);
//     const t0 = dataPoints.map((point) => point.t0);
//     const votes = dataPoints.map((point) => point.votes);

//     // Данные для Plotly
//     const data = [
//       {
//         type: "scatter3d",
//         mode: "markers",
//         x: x0,
//         y: t0,
//         z: votes,
//         marker: {
//           size: 5,
//           color: votes, // Используем количество голосов для цвета
//           colorscale: "Viridis",
//           opacity: 0.8,
//         },
//         name: "Accumulator Votes",
//         hovertemplate: `x0: %{x}<br>t0: %{y}<br>votes: %{z}<extra></extra>`,
//       },
//       {
//         type: "scatter3d",
//         mode: "markers",
//         x: [bestTrajectory.x0],
//         y: [bestTrajectory.t0],
//         z: [maxVotes],
//         marker: {
//           size: 10,
//           color: "red",
//           opacity: 1,
//           symbol: "circle",
//         },
//         name: "Best Trajectory",
//         hovertemplate: `x0: %{x}<br>t0: %{y}<br>votes: %{z}<extra></extra>`,
//       },
//     ];

//     const layout = {
//       autosize: true,
//       scene: {
//         xaxis: { title: "X0" },
//         yaxis: { title: "T0" },
//         zaxis: { title: "Votes" },
//       },
//       title: {
//         text: "Hough Transform 3D Visualization (Votes on Z-Axis)",
//         font: {
//           size: 16,
//         },
//       },
//       margin: { l: 0, r: 0, t: 50, b: 20 },
//     };

//     return <Plot data={data} layout={layout} />;
//   };

//   return (
//     <div className={css.visualizerContainer}>
//       {renderAccumulatorVisualization()}
//     </div>
//   );
// };

// export default Hough2DTrajectoryVisualizer;
