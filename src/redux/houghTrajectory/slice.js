import { createSlice } from "@reduxjs/toolkit";
import { getHoughTrajectoryData } from "./operations";

const houghTrajectorySlice = createSlice({
  name: "houghTrajectory",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    result: null,
  },
  reducers: {
    setTrajectory(state, action) {
      state.result = action.payload;
    },
    setTrajectoryData(state, action) {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHoughTrajectoryData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHoughTrajectoryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getHoughTrajectoryData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default houghTrajectorySlice.reducer;
export const { setTrajectoryData, setTrajectory } =
  houghTrajectorySlice.actions;
