import { createSelector } from "reselect";

// Basic selectors
const selectAuth = (state) => state.auth;
export const selectUser = createSelector(selectAuth, (auth) => auth.user);
export const selectUserName = createSelector(
  selectAuth,
  (auth) => auth.user.name
);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (auth) => auth.isLoggedIn
);

export const selectTheme = createSelector(selectUser, (user) => user.theme);

export const selectIsRefreshing = createSelector(
  selectAuth,
  (auth) => auth.isRefreshing
);
