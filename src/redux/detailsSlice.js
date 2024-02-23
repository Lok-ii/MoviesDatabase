import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentMedia : {},
    recommendation: [],
    similar: [],
    videos: [],
    topCast : [],
    vote: "",
    mediaName: "",
    posterImg: "",
    ratingColor: "",
    crew: [],
    modalIsOpen: "hidden",
    playerVideo: "",
}

const  mediaSlice = createSlice({
    name: "media",
    initialState: initialState,
    reducers: {
        setCurrentMedia : (state, action) => {
            state.currentMedia = action.payload;
        },
        setRecommendations : (state, action) => {
            state.recommendation = action.payload.results;
        },
        setSimilar: (state, action) => {
            state.similar = action.payload.results;
        },
        setVideos : (state, action) => {
            state.videos = action.payload.results;
        },
        setTopCast : (state, action) => {
            state.topCast = action.payload.cast;
            state.crew = action.payload.crew;
        },
        setDetails: (state, action) => {
            state.vote = action.payload.vote;
            state.mediaName = action.payload.name;
            state.posterImg= action.payload.image;
            state.ratingColor = action.payload.color;
        },
        setModal : (state, action) => {
            state.modalIsOpen = action.payload;
        },
        setPlayerVideo: (state, action) => {
            state.playerVideo = action.payload;
        }
    }
});

export const { setCurrentMedia, setRecommendations, setSimilar, setVideos, setTopCast, setDetails, setModal, setPlayerVideo } = mediaSlice.actions;
export default mediaSlice.reducer;