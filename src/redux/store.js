import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "../redux/auth/slice";
import teachersReducer from "../redux/teachers/slice";
import filtersReducer from "../redux/filters/slice";
import favoritesReducer from "../redux/favorites/slice";
import analysisReducer from "../redux/data/slice";
import dataFiltersReducer from "../redux/datafilters/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const authPersistConfig = {
  key: "authAnalysis",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    teachers: teachersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
    analysis: analysisReducer,
    datafilters: dataFiltersReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
