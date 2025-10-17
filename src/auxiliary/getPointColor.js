export const getPointColor = (row) => {
  const vImmConsistent = String(row?.IMMconsistent ?? "");
  const vVelocityConsistent = String(row?.VelocityConsistent ?? "");
  const vTrackConsistent = String(row?.TrackConsistent ?? "");

  if (vImmConsistent === "0") {
    if (vVelocityConsistent === "0" && vTrackConsistent !== "0")
      return "orange";
    if (vTrackConsistent === "0" && vVelocityConsistent !== "0") return "blue";
    return "red";
  } else if (vImmConsistent === "None") {
    return "yellow";
  }
  return "green";
};
