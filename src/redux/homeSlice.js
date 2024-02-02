import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popularMovies: [],
    popularTvShows: [],
    upcomingMovies: [],
    trendingDay: [],
    trendingWeek: [],
    genre: [],
}

const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload.results;
        },
        setPopularTvShows: (state, action) => {
            state.popularTvShows = action.payload.results;
        },
        setUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload.results;
        },
        setTrendingDay:  (state, action) => {
            state.trendingDay = action.payload.results;
        },
        setTrendingWeek:  (state, action) => {
            state.trendingWeek = action.payload.results;
        },
        setGenre: (state, action) => {
            state.genre = action.payload.genres;
        }
    }
});

export const { setPopularMovies, setPopularTvShows, setUpcomingMovies, setTrendingDay, setTrendingWeek, setGenre } = homeSlice.actions;

export default homeSlice.reducer;