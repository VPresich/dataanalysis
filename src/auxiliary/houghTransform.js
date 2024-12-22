const houghTransform = (points, rhoRes = 0.01, thetaRes = Math.PI / 180) => {
  const xMax = Math.max(...points.map((p) => p.x));
  const yMax = Math.max(...points.map((p) => p.y));
  const rhoMax = Math.sqrt(xMax ** 2 + yMax ** 2);

  const thetaMin = 0;
  const thetaMax = Math.PI;
  const thetaSteps = Math.floor((thetaMax - thetaMin) / thetaRes);
  const rhoSteps = Math.ceil((2 * rhoMax) / rhoRes);

  const accumulator = Array.from({ length: rhoSteps }, () =>
    Array(thetaSteps).fill(0)
  );

  const sinusoids = points.map(({ x, y }) => {
    const data = [];
    for (let t = 0; t < thetaSteps; t++) {
      const theta = thetaMin + t * thetaRes;
      const rho = x * Math.cos(theta) + y * Math.sin(theta);
      data.push({ theta: (theta * 180) / Math.PI, rho });

      const rhoIndex = Math.round((rho + rhoMax) / rhoRes);
      if (rhoIndex >= 0 && rhoIndex < rhoSteps) {
        accumulator[rhoIndex][t] += 1;
      }
    }

    return { point: { x, y }, data };
  });

  let maxVal = 0;
  for (let r = 0; r < rhoSteps; r++) {
    for (let t = 0; t < thetaSteps; t++) {
      maxVal = Math.max(maxVal, accumulator[r][t]);
    }
  }

  const bestLines = [];
  for (let r = 0; r < rhoSteps; r++) {
    for (let t = 0; t < thetaSteps; t++) {
      if (accumulator[r][t] === maxVal) {
        const bestRhoValue = r * rhoRes - rhoMax;
        const bestThetaValue = thetaMin + t * thetaRes;
        bestLines.push({
          rho: bestRhoValue,
          theta: (bestThetaValue * 180) / Math.PI,
          indices: { rhoIndex: r, thetaIndex: t },
        });
      }
    }
  }

  return {
    sinusoids,
    rhoSteps,
    rhoRes,
    rhoMax,
    thetaSteps,
    thetaRes,
    thetaMin,
    thetaMax,
    maxVal,
    bestLines,
  };
};

export default houghTransform;
