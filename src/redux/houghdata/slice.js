import { createSlice } from "@reduxjs/toolkit";
import { getAllHoughData } from "./operations";

const houghSlice = createSlice({
  name: "hough",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    result: null,
  },
  reducers: {
    setResult(state, action) {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllHoughData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllHoughData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getAllHoughData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default houghSlice.reducer;
export const { setResult } = houghSlice.actions;
