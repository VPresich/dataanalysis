import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../auth/operations";
import {
  fetchFavoritesByTeacherIds,
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../favorites/operations";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    isLoading: false,
    isAdding: false,
    isDeleting: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesByTeacherIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesByTeacherIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchFavoritesByTeacherIds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //---------------------------------------------
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //---------------------------------------------
      .addCase(addFavorite.pending, (state) => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.isAdding = false;
        state.error = false;
        state.items.push(action.payload.teacher);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //---------------------------------------------
      .addCase(removeFavorite.pending, (state, action) => {
        state.isDeleting = action.meta.arg;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (favorite) => favorite._id === action.payload.teacher
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
        state.isDeleting = false;
        state.error = null;
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //-------------------------------------------
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.isLoading = false;
        state.isAdding = false;
        state.isDeleting = false;
        state.error = null;
      });
    //-----------------------------------------------
  },
});

export default favoritesSlice.reducer;
