import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";

export const store = configureStore({
  reducer: {
    rootStore: rootReducer,
  },
});
