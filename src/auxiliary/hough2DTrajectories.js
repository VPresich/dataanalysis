function hough2DTrajectories(
  points,
  tRes = 0.1,
  xRes = 0.05,
  yRes = 0.05,
  tRange = 10,
  xRange = 10,
  yRange = 10
) {
  const tSteps = Math.ceil(tRange / tRes);
  const xSteps = Math.ceil(xRange / xRes);
  const ySteps = Math.ceil(yRange / yRes);

  const accumulator = Array(tSteps)
    .fill(0)
    .map(() =>
      Array(xSteps)
        .fill(0)
        .map(() => Array(ySteps).fill(0))
    );

  let maxVotes = 0;
  let bestTrajectory = null;

  points.forEach(({ x, y, t }) => {
    for (let t0Index = 0; t0Index < tSteps; t0Index++) {
      const t0 = t0Index * tRes;
      // if (t === t0) continue;

      for (let vx = -1; vx <= 1; vx += 0.1) {
        for (let vy = -1; vy <= 1; vy += 0.1) {
          const x0 = x - vx * (t - t0);
          const y0 = y - vy * (t - t0);
          const x0Index = Math.floor((x0 + xRange / 2) / xRes);
          const y0Index = Math.floor((y0 + yRange / 2) / yRes);

          if (
            x0Index >= 0 &&
            x0Index < xSteps &&
            y0Index >= 0 &&
            y0Index < ySteps
          ) {
            accumulator[t0Index][x0Index][y0Index]++;

            if (accumulator[t0Index][x0Index][y0Index] > maxVotes) {
              maxVotes = accumulator[t0Index][x0Index][y0Index];
              bestTrajectory = {
                t0: t0,
                x0: x0,
                y0: y0,
                vx: vx,
                vy: vy,
              };
            }
          }
        }
      }
    }
  });

  return { bestTrajectory, maxVotes, accumulator };
}

export default hough2DTrajectories;

// function hough2DTrajectories(
//   points,
//   tRes = 0.1,
//   xRes = 0.05,
//   yRes = 0.05,
//   tRange = 10,
//   xRange = 10,
//   yRange = 10,
//   topN = 3
// ) {
//   const tSteps = Math.ceil(tRange / tRes);
//   const xSteps = Math.ceil(xRange / xRes);
//   const ySteps = Math.ceil(yRange / yRes);

//   const accumulator = Array(tSteps)
//     .fill(0)
//     .map(() =>
//       Array(xSteps)
//         .fill(0)
//         .map(() => Array(ySteps).fill(0))
//     );

//   const trajectories = [];

//   points.forEach(({ x, y, t }) => {
//     for (let t0Index = 0; t0Index < tSteps; t0Index++) {
//       const t0 = t0Index * tRes;

//       for (let vx = -1; vx <= 1; vx += 0.1) {
//         for (let vy = -1; vy <= 1; vy += 0.1) {
//           const x0 = x - vx * (t - t0);
//           const y0 = y - vy * (t - t0);
//           const x0Index = Math.floor((x0 + xRange / 2) / xRes);
//           const y0Index = Math.floor((y0 + yRange / 2) / yRes);

//           if (
//             x0Index >= 0 &&
//             x0Index < xSteps &&
//             y0Index >= 0 &&
//             y0Index < ySteps
//           ) {
//             accumulator[t0Index][x0Index][y0Index]++;

//             if (accumulator[t0Index][x0Index][y0Index] > 3) {
//               trajectories.push({
//                 votes: accumulator[t0Index][x0Index][y0Index],
//                 trajectory: {
//                   t0: t0,
//                   x0: x0,
//                   y0: y0,
//                   vx: vx,
//                   vy: vy,
//                 },
//               });
//             }
//           }
//         }
//       }
//     }
//   });

//   trajectories.sort((a, b) => b.votes - a.votes);

//   const bestTrajectories = trajectories
//     .slice(0, topN)
//     .map((item) => item.trajectory);
//   const maxVotes = bestTrajectories.votes;

//   return { bestTrajectories, maxVotes, accumulator };
// }

// export default hough2DTrajectories;
