export const selectTrackNum = (state) => state.datafilters.trackNum;
export const selectSensorNum = (state) => state.datafilters.sensorNum;
export const selectTrackNumbers = (state) =>
  state.datafilters.trackNumbers || [];

export const selectImmConsistent = (state) => state.datafilters.immConsistent;
export const selectImmConsistentValues = (state) =>
  state.datafilters.immConsistentValues;
export const selectImmConsistentMaxValue = (state) =>
  state.datafilters.immConsistentMaxValue;
