// import { createSelector } from "reselect";

export const selectDataForAnalysis = (state) => state.analysis.items;
export const selectDataForAnalysisLength = (state) =>
  state.analysis.items.length || 0;

export const selectIsLoading = (state) => state.analysis.isLoading;
export const selectError = (state) => state.analysis.error;

// export const selectTeacherById = createSelector(
//   [selectTeachers, (_, teacherId) => teacherId],
//   (teachers, teacherId) => teachers.find((teacher) => teacher._id === teacherId)
// );

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
