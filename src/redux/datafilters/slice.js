import { createSlice } from "@reduxjs/toolkit";
import generateTrackNumbers from "../../auxiliary/generateTrackNumbers";
import generateImmConsistentValues from "../../auxiliary/generateImmConsistentValues";

const dataFiltersSlice = createSlice({
  name: "datafilters",
  initialState: {
    trackNum: "All",
    trackNumbers: generateTrackNumbers(27),
    immConsistent: "All",
    immConsistentValues: generateImmConsistentValues(),
  },
  reducers: {
    saveTrackNum: (state, action) => {
      state.trackNum = action.payload;
    },

    saveImmConsistent: (state, action) => {
      state.immConsistent = action.payload;
    },
  },
});

export const { saveTrackNum, saveImmConsistent } = dataFiltersSlice.actions;
export default dataFiltersSlice.reducer;
