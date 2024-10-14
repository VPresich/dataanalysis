import { createSelector } from "reselect";
import { selectTrackNum } from "../datafilters/selectors";
import { selectImmConsistent } from "../datafilters/selectors";

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
    console.log("value", value);
    const normalizedValue = value ? value.toString().toLowerCase() : null;
    console.log("normalizedValue", normalizedValue);

    if (!normalizedValue || normalizedValue === "all") {
      return data;
    }

    return data.filter(
      (row) => row.IMMconsistent.toString().toLowerCase() === normalizedValue
    );
  }
);

// export const selectTeachersByLanguage = createSelector(
//   [selectTeachers, (state, language) => language],
//   (teachers, language) => {
//     if (language === "" || language === "all") return teachers;

//     return teachers.filter((teacher) =>
//       teacher.languages.some((lang) =>
//         lang.toLowerCase().includes(language.toLowerCase())
//       )
//     );
//   }
// );

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
