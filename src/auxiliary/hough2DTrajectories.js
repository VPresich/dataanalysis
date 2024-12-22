function hough2DTrajectories(points, tRes, xRes, yRes, tRange, xRange, yRange) {
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

  points.forEach(([x, y, t]) => {
    for (let t0Index = 0; t0Index < tSteps; t0Index++) {
      const t0 = t0Index * tRes;
      if (t === t0) continue;

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
          }
        }
      }
    }
  });

  let maxVotes = 0;
  let bestTrajectory = null;

  for (let t0Index = 0; t0Index < tSteps; t0Index++) {
    for (let x0Index = 0; x0Index < xSteps; x0Index++) {
      for (let y0Index = 0; y0Index < ySteps; y0Index++) {
        if (accumulator[t0Index][x0Index][y0Index] > maxVotes) {
          maxVotes = accumulator[t0Index][x0Index][y0Index];
          bestTrajectory = {
            t0: t0Index * tRes,
            x0: x0Index * xRes - xRange / 2,
            y0: y0Index * yRes - yRange / 2,
          };
        }
      }
    }
  }

  return { bestTrajectory, maxVotes, accumulator };
}

export default hough2DTrajectories;
