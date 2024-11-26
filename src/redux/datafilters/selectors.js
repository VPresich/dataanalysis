export const selectTrackNum = (state) => state.datafilters.trackNum;
export const selectSensorNum = (state) => state.datafilters.sensorNum;
export const selectTrackNumbers = (state) =>
  state.datafilters.trackNumbers || [];

export const selectTrackNumbersForMultySelect = (state) =>
  state.datafilters.trackNumbers.filter((track) => track !== "All") || [];

export const selectImmConsistent = (state) => state.datafilters.immConsistent;
export const selectImmConsistentValues = (state) =>
  state.datafilters.immConsistentValues;
export const selectImmConsistentMaxValue = (state) =>
  state.datafilters.immConsistentMaxValue;

export const selectStartTime = (state) => state.datafilters.startTime;
export const selectEndTime = (state) => state.datafilters.endTime;
export const selectSelectedTrackNums = (state) =>
  state.datafilters.selectedTrackNums;

export const selectIs3D = (state) => state.datafilters.is3D;
