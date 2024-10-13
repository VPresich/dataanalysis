import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInst } from "../../api/axiosInst";

export const fetchFavoritesByTeacherIds = createAsyncThunk(
  "teachers/getFavoritsByTeacherIds",
  async (ids, thunkAPI) => {
    try {
      const promises = ids.map((id) => axiosInst.get(`teachers/${id}`));
      const responses = await Promise.all(promises);
      const data = responses.map((response) => response.data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get("favorites");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (idTeacher, thunkAPI) => {
    try {
      const response = await axiosInst.post(`favorites/${idTeacher}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (idTeacher, thunkAPI) => {
    try {
      const response = await axiosInst.delete(`favorites/${idTeacher}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
