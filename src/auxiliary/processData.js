const processData = (data, numPoints) => {
  const groupedData = data.reduce((acc, row) => {
    const trackNum = row.TrackNum;
    if (!acc[trackNum]) {
      acc[trackNum] = [];
    }
    acc[trackNum].push(row);
    return acc;
  }, {});

  const filteredTracks = Object.keys(groupedData).filter(
    (trackNum) => groupedData[trackNum].length >= numPoints
  );

  return filteredTracks;
};

export default processData;
