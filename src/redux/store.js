import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import exploreReducer from "./exploreSlice";
import mediaReducer from "./detailsSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    explore: exploreReducer,
    media: mediaReducer,
  },
});
