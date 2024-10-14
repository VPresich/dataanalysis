export const selectTrackNum = (state) => state.datafilters.trackNum;
export const selectTrackNumbers = (state) =>
  state.datafilters.trackNumbers || [];

export const selectImmConsistent = (state) => state.datafilters.immConsistent;
export const selectImmConsistentValues = (state) =>
  state.datafilters.immConsistentValues;
