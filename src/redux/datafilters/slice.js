import { createSlice } from "@reduxjs/toolkit";
import generateTrackNumbers from "../../auxiliary/generateTrackNumbers";
import generateImmConsistentValues from "../../auxiliary/generateImmConsistentValues";

const dataFiltersSlice = createSlice({
  name: "datafilters",
  initialState: {
    trackNum: "All",
    trackNumbers: generateTrackNumbers(29),
    immConsistent: "All",
    immConsistentValues: generateImmConsistentValues(),
    immConsistentMaxValue: "0.0",
    sensorNum: 31,
  },
  reducers: {
    saveTrackNum: (state, action) => {
      state.trackNum = action.payload;
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
      state.trackNumbers = action.payload;
      state.trackNumbers.push("All");
    },

    resetDataFilters: (state) => {
      state.trackNum = "All";
      state.immConsistent = "All";
      state.sensorNum = 3;
      state.immConsistentMaxValue = "0.0";
    },
  },
});

export const {
  saveTrackNum,
  saveSensorNum,
  saveImmConsistent,
  saveImmConsistentMaxValue,
  updateTrackNumbers,
  resetDataFilters,
} = dataFiltersSlice.actions;
export default dataFiltersSlice.reducer;
