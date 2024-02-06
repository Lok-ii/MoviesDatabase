import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import moviesReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    movies: moviesReducer,
  },
});
