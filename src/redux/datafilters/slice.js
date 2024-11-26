import { createSlice } from "@reduxjs/toolkit";
import generateTrackNumbers from "../../auxiliary/generateTrackNumbers";
import generateImmConsistentValues from "../../auxiliary/generateImmConsistentValues";

const dataFiltersSlice = createSlice({
  name: "datafilters",
  initialState: {
    trackNum: "All",
    selectedTrackNums: generateTrackNumbers(29),
    trackNumbers: generateTrackNumbers(29),
    immConsistent: "All",
    immConsistentValues: generateImmConsistentValues(),
    immConsistentMaxValue: "0.0",
    sensorNum: 31,
    startTime: "",
    endTime: "",
    is3D: false,
  },
  reducers: {
    saveTrackNum: (state, action) => {
      state.trackNum = action.payload;
    },

    saveSelectedTrackNums: (state, action) => {
      state.selectedTrackNums = action.payload;
    },

    saveSensorNum: (state, action) => {
      state.sensorNum = action.payload;
    },

    saveImmConsistent: (state, action) => {
      state.immConsistent = action.payload;
    },

    saveImmConsistentMaxValue: (state, action) => {
      state.immConsistentMaxValue = action.payload;
    },

    updateTrackNumbers: (state, action) => {
      state.selectedTrackNums = [...action.payload];
      state.trackNumbers = action.payload;
      state.trackNumbers.push("All");
    },

    saveTime: (state, action) => {
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },

    setIs3D: (state, action) => {
      state.is3D = action.payload;
    },

    resetDataFilters: (state) => {
      state.trackNum = "All";
      state.immConsistent = "All";
      state.sensorNum = 31;
      state.immConsistentMaxValue = "0.0";
      state.startTime = "";
      state.endTime = "";
    },
  },
});

export const {
  saveTrackNum,
  saveSelectedTrackNums,
  saveSensorNum,
  saveImmConsistent,
  saveImmConsistentMaxValue,
  updateTrackNumbers,
  saveTime,
  setIs3D,
  resetDataFilters,
} = dataFiltersSlice.actions;
export default dataFiltersSlice.reducer;
