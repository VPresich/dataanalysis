const generateRandomPoints = () => {
  const generatedPoints = [];
  for (let i = 0; i < 100; i++) {
    const t = Math.random() * 100;
    generatedPoints.push([Math.random() * 800, Math.random() * 600, t]);
  }
  return generatedPoints;
};

export default generateRandomPoints;
