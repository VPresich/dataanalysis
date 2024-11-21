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
  async (sensorNum, thunkAPI) => {
    try {
      const response = await axiosInst.get(`data/${sensorNum}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFilteredData = createAsyncThunk(
  "data/getFilteredData",
  async ({ sensorNum, startTime, endTime }, thunkAPI) => {
    try {
      const params = {};
      if (startTime) params.startTime = startTime;
      if (endTime) params.endTime = endTime;
      const response = await axiosInst.get(`data/${sensorNum}`, { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
