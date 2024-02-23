import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import moviesReducer from "./moviesSlice";
import mediaReducer from "./detailsSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    movies: moviesReducer,
    media: mediaReducer,
  },
});
