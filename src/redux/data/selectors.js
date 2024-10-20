import { createSelector } from "reselect";
import { selectTrackNum } from "../datafilters/selectors";
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

export const selectDataForImmConsistent = createSelector(
  [selectDataForTrack, selectImmConsistent],
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

// export const selectTeachersByLevel = createSelector(
//   [selectTeachers, (state, level) => level],
//   (teachers, level) => {
//     if (level === "" || level === "all") return teachers;

//     return teachers.filter((teacher) =>
//       teacher.languages.some((lev) =>
//         lev.toLowerCase().includes(level.toLowerCase())
//       )
//     );
//   }
// );

// export const selectTeachersByPrice = createSelector(
//   [selectTeachers, (state, price) => price],
//   (teachers, price) => {
//     const pricePerHour = parseFloat(price);
//     if (isNaN(pricePerHour)) return teachers;
//     return teachers.filter((teacher) => teacher.price_per_hour <= pricePerHour);
//   }
// );
