import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";

export const getTeachersPerPage = createAsyncThunk(
  "teachers/getPage",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await axiosInst.get(`teachers`, {
        params: {
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTeacherById = createAsyncThunk(
  "teachers/teacherById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInst.get(`teachers/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getTeachersWithParams = createAsyncThunk(
  "teachers/withParams",
  async ({ page, limit, query }, thunkAPI) => {
    try {
      const response = await axiosInst.get(`teachers`, {
        params: {
          page,
          limit,
          ...query,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
