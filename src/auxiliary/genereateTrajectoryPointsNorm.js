const normalRandom = (mean, stdDev) => {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2); // Бокс-Мюллер
  return mean + z0 * stdDev;
};

const generateTrajectoryPoints = (
  m = 1,
  b = 0,
  xRange = 10,
  noiseStdDev = 0.5
) => {
  const generatedPoints = [];
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * xRange;
    let y = m * x + b;
    y += normalRandom(0, noiseStdDev);
    const t = Math.random() * 10;
    generatedPoints.push({ x, y, t });
  }

  return generatedPoints;
};

export default generateTrajectoryPoints;
