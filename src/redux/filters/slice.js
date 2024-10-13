import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    params: {
      level: "A1 Beginner",
      language: "English",
      price_per_hour: "40 $",
    },
  },
  reducers: {
    saveQueryParams: (state, action) => {
      state.params = action.payload;
    },
    saveLanguage: (state, action) => {
      state.params.language = action.payload;
    },
    saveLevel: (state, action) => {
      state.params.level = action.payload;
    },
    savePrice: (state, action) => {
      state.params.price_per_hour = action.payload;
    },
  },
});

export const { saveQueryParams, saveLevel, saveLanguage, savePrice } =
  filtersSlice.actions;
export default filtersSlice.reducer;
