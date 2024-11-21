import { createSelector } from "reselect";
import { selectTrackNum } from "../datafilters/selectors";
import { selectSelectedTrackNums } from "../datafilters/selectors";

import { selectImmConsistent } from "../datafilters/selectors";
import { selectImmConsistentMaxValue } from "../datafilters/selectors";

export const selectDataForAnalysis = (state) => state.analysis.items;
export const selectDataForAnalysisLength = (state) =>
  state.analysis.items.length || 0;
export const selectIsLoading = (state) => state.analysis.isLoading;
export const selectError = (state) => state.analysis.error;

export const selectDataForTrack = createSelector(
  [selectDataForAnalysis, selectTrackNum],
  (data, trackNum) => {
    if (!trackNum || trackNum === "All") {
      return data;
    }
    return data.filter((row) => row.TrackNum === Number(trackNum));
  }
);

export const selectDataForTracks = createSelector(
  [selectDataForAnalysis, selectSelectedTrackNums],
  (data, trackNums) => {
    const trackNumsAsNumbers = trackNums.map(Number);
    return data.filter((row) =>
      trackNumsAsNumbers.includes(Number(row.TrackNum))
    );
  }
);

export const selectDataForImmConsistent = createSelector(
  [selectDataForTracks, selectImmConsistent],
  (data, value) => {
    const normalizedValue = value ? value.toString().toLowerCase() : null;
    if (!normalizedValue || normalizedValue === "all") {
      return data;
    }
    return data.filter(
      (row) => row.IMMconsistent.toString().toLowerCase() === normalizedValue
    );
  }
);

export const selectFilteredData = createSelector(
  [selectDataForImmConsistent, selectImmConsistentMaxValue],
  (data, value) => {
    const normalizedValue = value ? Number(value) : 0;
    if (!normalizedValue) {
      return data;
    }
    return data.filter((row) => row.IMMconsistentValue >= normalizedValue);
  }
);
