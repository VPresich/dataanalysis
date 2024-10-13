import { createSelector } from "reselect";
export const selectFavorites = (state) => state.favorites.items;

export const selectIsFavorite = createSelector(
  [selectFavorites, (_, teacherId) => teacherId],
  (favorites, teacherId) => {
    if (!favorites || !teacherId || favorites.length === 0) return false;
    return favorites.some((favorite) => favorite._id === teacherId);
  }
);
