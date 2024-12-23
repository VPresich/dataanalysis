import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";

export const getHoughTrajectoryData = createAsyncThunk(
  "data/getTrajectoryData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get("hough-data");
      console.log("Data", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
