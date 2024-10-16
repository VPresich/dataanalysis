import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";

export const getAllData = createAsyncThunk(
  "data/getAllData",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get(`data`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDataByNumber = createAsyncThunk(
  "data/getDataByNumber",
  async (number, thunkAPI) => {
    try {
      const response = await axiosInst.get(`data/${number}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
