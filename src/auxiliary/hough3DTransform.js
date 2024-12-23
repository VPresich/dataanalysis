const hough3DTransform = (
  points,
  rhoRes = 0.01,
  thetaRes = Math.PI / 180,
  phiRes = Math.PI / 180
) => {
  let rhoMax = 0;
  points.forEach(({ x, y, t }) => {
    const rho = Math.sqrt(x * x + y * y + t * t);
    if (rho > rhoMax) rhoMax = rho;
  });

  const rhoSteps = Math.ceil((2 * rhoMax) / rhoRes);
  const thetaSteps = Math.floor(Math.PI / thetaRes);
  const phiSteps = Math.floor((2 * Math.PI) / phiRes);

  const accumulator = Array.from({ length: thetaSteps }, () =>
    Array.from({ length: phiSteps }, () => Array(rhoSteps).fill(0))
  );

  const surfaces = [];
  let maxVal = 0;

  for (const { x, y, t } of points) {
    const pointsSurface = [];

    for (let thetaIndex = 0; thetaIndex < thetaSteps; thetaIndex++) {
      const theta = thetaIndex * thetaRes;
      for (let phiIndex = 0; phiIndex < phiSteps; phiIndex++) {
        const phi = phiIndex * phiRes;

        const vx = Math.sin(theta) * Math.cos(phi);
        const vy = Math.sin(theta) * Math.sin(phi);
        const vz = Math.cos(theta);

        const rho = x * vx + y * vy + t * vz;
        if (Math.abs(rho) > rhoMax) continue;

        const rhoIndex = Math.floor((rho + rhoMax) / rhoRes);
        if (rhoIndex >= 0 && rhoIndex < rhoSteps) {
          accumulator[thetaIndex][phiIndex][rhoIndex]++;
          maxVal = Math.max(
            maxVal,
            accumulator[thetaIndex][phiIndex][rhoIndex]
          );

          pointsSurface.push({
            theta: (theta * 180) / Math.PI,
            phi: (phi * 180) / Math.PI,
            rho,
          });
        }
      }
    }
    surfaces.push({ point: { x, y, t }, surface: pointsSurface });
  }

  const threshold = maxVal * 0.8;
  const bestSurfaces = [];
  for (let thetaIndex = 0; thetaIndex < thetaSteps; thetaIndex++) {
    for (let phiIndex = 0; phiIndex < phiSteps; phiIndex++) {
      for (let rhoIndex = 0; rhoIndex < rhoSteps; rhoIndex++) {
        const value = accumulator[thetaIndex][phiIndex][rhoIndex];
        if (value >= threshold) {
          const bestTheta = thetaIndex * thetaRes;
          const bestPhi = phiIndex * phiRes;
          bestSurfaces.push({
            theta: (bestTheta * 180) / Math.PI,
            phi: (bestPhi * 180) / Math.PI,
            rho: rhoIndex * rhoRes - rhoMax,
            value,
          });
        }
      }
    }
  }

  console.log("bestSurfaces", bestSurfaces);

  return {
    bestSurfaces,
    maxVal,
    surfaces,
  };
};

export default hough3DTransform;

// function hough3DTransform(
//   points,
//   rhoRes = 0.01,
//   thetaRes = Math.PI / 180,
//   phiRes = Math.PI / 180
// ) {
//   let maxRho = 0;
//   points.forEach(({ x, y, t }) => {
//     const rho = Math.sqrt(x * x + y * y + t * t);
//     if (rho > maxRho) maxRho = rho;
//   });

//   const rhoSteps = Math.floor(maxRho / rhoRes);
//   const thetaSteps = Math.floor(Math.PI / thetaRes);
//   const phiSteps = Math.floor(Math.PI / phiRes);

//   const accumulator = Array.from({ length: rhoSteps }, () =>
//     Array.from({ length: thetaSteps }, () => Array(phiSteps).fill(0))
//   );

//   const surfaces = [];
//   let maxVal = 0;

//   // Основний алгоритм Хафа
//   points.forEach(({ x, y, t }) => {
//     for (let thetaIndex = 0; thetaIndex < thetaSteps; thetaIndex++) {
//       const theta = thetaIndex * thetaRes - Math.PI;
//       for (let phiIndex = 0; phiIndex < phiSteps; phiIndex++) {
//         const phi = phiIndex * phiRes - Math.PI / 2;
//         const rho =
//           x * Math.cos(theta) * Math.sin(phi) +
//           y * Math.sin(theta) * Math.sin(phi) +
//           t * Math.cos(phi);

//         if (rho >= 0) {
//           const rhoIndex = Math.floor(rho / rhoRes);
//           if (rhoIndex < rhoSteps) {
//             accumulator[rhoIndex][thetaIndex][phiIndex]++;
//             if (accumulator[rhoIndex][thetaIndex][phiIndex] > maxVal) {
//               maxVal = accumulator[rhoIndex][thetaIndex][phiIndex];
//             }

//             surfaces.push({
//               point: { x, y, t },
//               rho: rhoIndex * rhoRes,
//               theta: thetaIndex * thetaRes - Math.PI,
//               phi: phiIndex * phiRes - Math.PI / 2,
//               votes: accumulator[rhoIndex][thetaIndex][phiIndex],
//             });
//           }
//         }
//       }
//     }
//   });

//   // Вибір пікових точок
//   const bestSurfaces = [];
//   for (let rhoIndex = 0; rhoIndex < rhoSteps; rhoIndex++) {
//     for (let thetaIndex = 0; thetaIndex < thetaSteps; thetaIndex++) {
//       for (let phiIndex = 0; phiIndex < phiSteps; phiIndex++) {
//         const votes = accumulator[rhoIndex][thetaIndex][phiIndex];
//         if (votes === maxVal) {
//           bestSurfaces.push({
//             rho: rhoIndex * rhoRes,
//             theta: thetaIndex * thetaRes - Math.PI,
//             phi: phiIndex * phiRes - Math.PI / 2,
//             votes,
//           });
//         }
//       }
//     }
//   }

//   return { surfaces, bestSurfaces, maxVal };
// }

// export default hough3DTransform;
