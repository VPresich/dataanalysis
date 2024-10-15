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
  },
  reducers: {
    saveTrackNum: (state, action) => {
      state.trackNum = action.payload;
    },

    saveImmConsistent: (state, action) => {
      state.immConsistent = action.payload;
    },

    saveImmConsistentMaxValue: (state, action) => {
      state.immConsistentMaxValue = action.payload;
    },

    resetDataFilters: (state) => {
      state.trackNum = "All";
      state.immConsistent = "All";
      state.immConsistentMaxValue = "0.0";
    },
  },
});

export const {
  saveTrackNum,
  saveImmConsistent,
  saveImmConsistentMaxValue,
  resetDataFilters,
} = dataFiltersSlice.actions;
export default dataFiltersSlice.reducer;
