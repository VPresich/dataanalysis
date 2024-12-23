import { createSlice } from "@reduxjs/toolkit";
import { getHoughTrajectoryData } from "./operations";

const houghTrajectorySlice = createSlice({
  name: "houghtrack",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    result: null,
  },
  reducers: {
    setHoughTrajectory(state, action) {
      state.result = action.payload;
    },
    setTrajectoryData(state, action) {
      state.items = action.payload;
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
        console.log("action.payload", action.payload);
        state.items = action.payload;
      })
      .addCase(getHoughTrajectoryData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default houghTrajectorySlice.reducer;
export const { setTrajectoryData, setHoughTrajectory } =
  houghTrajectorySlice.actions;
