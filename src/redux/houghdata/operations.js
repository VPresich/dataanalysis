import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";

export const getAllHoughData = createAsyncThunk(
  "data/getAllHoughData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get("hough-data");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
