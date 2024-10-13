import { createSlice } from "@reduxjs/toolkit";
import { getAllData } from "./operations";

const analysisSlice = createSlice({
  name: "analysis",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetDataState(state) {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addCase(getAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, resetDataState } = analysisSlice.actions;
export default analysisSlice.reducer;
