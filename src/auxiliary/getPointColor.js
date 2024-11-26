export const getPointColor = (immConsistent) => {
  if (immConsistent === "0") {
    return "#ef2447";
  } else if (immConsistent === "None") {
    return "orange";
  }
  return "green";
};
