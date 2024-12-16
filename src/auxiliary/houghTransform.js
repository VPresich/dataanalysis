const houghTransform = (points, rhoRes = 0.5, thetaRes = Math.PI / 360) => {
  const maxX = Math.max(...points.map((p) => p.x));
  const maxY = Math.max(...points.map((p) => p.y));
  const maxRho = Math.sqrt(maxX ** 2 + maxY ** 2);

  const thetaMin = 0;
  const thetaMax = Math.PI;
  const thetaSteps = Math.floor((thetaMax - thetaMin) / thetaRes);
  const rhoSteps = Math.ceil((2 * maxRho) / rhoRes);

  const accumulator = Array.from({ length: rhoSteps }, () =>
    Array(thetaSteps).fill(0)
  );

  const sinusoids = points.map(({ x, y }) => {
    const data = [];
    for (let t = 0; t < thetaSteps; t++) {
      const theta = thetaMin + t * thetaRes;
      const rho = x * Math.cos(theta) + y * Math.sin(theta);
      data.push({ theta: (theta * 180) / Math.PI, rho });
    }
    return { point: { x, y }, data };
  });

  points.forEach(({ x, y }) => {
    for (let t = 0; t < thetaSteps; t++) {
      const theta = thetaMin + t * thetaRes;
      const rho = x * Math.cos(theta) + y * Math.sin(theta);
      const rhoIndex = Math.round((rho + maxRho) / rhoRes);

      if (rhoIndex >= 0 && rhoIndex < rhoSteps) {
        accumulator[rhoIndex][t] += 1;
      }
    }
  });

  let maxVal = 0;
  let bestRhoIndex = 0;
  let bestThetaIndex = 0;

  for (let r = 0; r < rhoSteps; r++) {
    for (let t = 0; t < thetaSteps; t++) {
      if (accumulator[r][t] > maxVal) {
        maxVal = accumulator[r][t];
        bestRhoIndex = r;
        bestThetaIndex = t;
      }
    }
  }

  const bestRhoValue = bestRhoIndex * rhoRes - maxRho;
  const bestThetaValue = thetaMin + bestThetaIndex * thetaRes;

  return {
    accumulator,
    sinusoids,
    rhoSteps,
    thetaSteps,
    rhoRes,
    thetaRes,
    maxRho,
    maxVal,
    bestLine: {
      rho: bestRhoValue,
      theta: (bestThetaValue * 180) / Math.PI,
    },
  };
};

export default houghTransform;

// const houghTransform = (points, rhoRes = 0.5, thetaRes = Math.PI / 360) => {
//   const maxX = Math.max(...points.map((p) => p.x));
//   const maxY = Math.max(...points.map((p) => p.y));

//   const maxRho = Math.sqrt(maxX ** 2 + maxY ** 2);

//   const thetaMin = 0;
//   const thetaMax = 2 * Math.PI;
//   const thetaSteps = Math.floor((thetaMax - thetaMin) / thetaRes);
//   const rhoSteps = Math.ceil((2 * maxRho) / rhoRes);

//   const accumulator = Array.from({ length: rhoSteps }, () =>
//     Array(thetaSteps).fill(0)
//   );

//   const sinusoids = points.map(({ x, y }) => {
//     const data = [];
//     for (let t = 0; t < thetaSteps; t++) {
//       const theta = thetaMin + t * thetaRes;
//       const rho = x * Math.cos(theta) + y * Math.sin(theta);
//       const positiveRho = Math.abs(rho);
//       data.push({ theta: (theta * 180) / Math.PI, rho: positiveRho });
//     }
//     return { point: { x, y }, data };
//   });

//   points.forEach(({ x, y }) => {
//     for (let t = 0; t < thetaSteps; t++) {
//       const theta = thetaMin + t * thetaRes;
//       const rho = x * Math.cos(theta) + y * Math.sin(theta);
//       const positiveRho = Math.abs(rho);
//       const rhoIndex = Math.round((positiveRho + maxRho) / rhoRes);

//       if (rhoIndex >= 0 && rhoIndex < rhoSteps) {
//         accumulator[rhoIndex][t] += 1;
//       }
//     }
//   });

//   let maxVal = 0;
//   let bestRhoIndex = 0;
//   let bestThetaIndex = 0;

//   for (let r = 0; r < rhoSteps; r++) {
//     for (let t = 0; t < thetaSteps; t++) {
//       if (accumulator[r][t] > maxVal) {
//         maxVal = accumulator[r][t];
//         bestRhoIndex = r;
//         bestThetaIndex = t;
//       }
//     }
//   }

//   const bestRhoValue = bestRhoIndex * rhoRes - maxRho;
//   const bestThetaValue = thetaMin + bestThetaIndex * thetaRes;

//   return {
//     accumulator,
//     sinusoids,
//     rhoSteps,
//     thetaSteps,
//     rhoRes,
//     thetaRes,
//     maxRho,
//     maxVal,
//     bestLine: {
//       rho: bestRhoValue,
//       theta: (bestThetaValue * 180) / Math.PI,
//     },
//   };
// };

// export default houghTransform;
