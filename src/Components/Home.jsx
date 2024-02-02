import React, { useEffect } from "react";
import { fetchData } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setPopularMovies,
  setPopularTvShows,
  setUpcomingMovies,
  setTrendingDay,
  setTrendingWeek,
  setGenre,
} from "../redux/homeSlice";
import Header from "./Header";
import SliderData from "./SliderData";

const Home = () => {
  const dispatch = useDispatch();
  const commonApiParams = {
    language: "en-US",
    page: 1,
  };
  useEffect(() => {
    const getTrendingDay = async () => {
      try {
        const data = await fetchData("/trending/all/day", commonApiParams);
        console.log(data);
        dispatch(setTrendingDay(data));
      } catch (err) {
        console.log(err);
      }
    };

    getTrendingDay();

    const getTrendingWeek = async () => {
      try {
        const data = await fetchData("/trending/all/week", commonApiParams);
        console.log(data);
        dispatch(setTrendingWeek(data));
      } catch (err) {
        console.log(err);
      }
    };

    getTrendingWeek();

    const getMovies = async () => {
      try {
        const data = await fetchData("/movie/popular", commonApiParams);
        console.log(data);
        dispatch(setPopularMovies(data));
      } catch (error) {
        console.log(error);
      }
    }

    const getTvShows = async () => {
      try {
        const data = await fetchData("/tv/popular", commonApiParams);
        console.log(data);
        dispatch(setPopularTvShows(data));
      } catch (error) {
        console.log(error);
      }
    };

    getTvShows();

    const getUpcomingMovies = async () => {
      try {
        const data = await fetchData("/movie/upcoming", commonApiParams);
        console.log(data);
        dispatch(setUpcomingMovies(data));
      } catch (error) {
        console.log(error);
      }
    };
    getUpcomingMovies();

    const fetchGenre = async () => {
      try {
        const data = await fetchData("/genre/movie/list", commonApiParams);
        console.log(data);
        dispatch(setGenre(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenre();
  }, []);

  const trendingDay = useSelector((store) => store.home.trendingDay);
  const trendingWeek = useSelector((store) => store.home.trendingWeek);
  const popularMovies = useSelector(store => store.home.popularMovies);
  const popularTvShows = useSelector(store => store.home.popularTvShows);

  return (
    <div className="home w-full text-white flex flex-col items-center">
      <div className="hero w-full h-[110vh] bg-gradientImage bg-top bg-no-repeat	bg-cover mt-[-5rem] flex flex-col justify-center items-center gap-4">
        <p className="text-[4rem] font-bold tracking-wider	">Welcome.</p>
        <p className="text-xl font-semibold tracking-wider">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <form action="" className="w-[60%] flex items-center rounded-[2rem]">
          <input
            type="text"
            className="w-[80%] h-14 outline-none px-6 rounded-l-[2rem]"
            placeholder="Search for a movie, TV show or person"
          ></input>
          <button
            type="submit"
            className="w-[20%] h-14 rounded-r-[2rem] bg-buttonGradient"
          >
            Search
          </button>
        </form>
      </div>
      <div className="dataSliders w-full flex flex-col items-center gap-16">
      <SliderData
        name="Trending"
        toggle={["Day", "Week"]}
        dataOne={trendingDay}
        dataTwo={trendingWeek}
      />
      <SliderData 
        name="What's Popular"
        toggle={["Movies", "Tv Shows"]}
        dataOne={popularMovies}
        dataTwo={popularTvShows} />
      </div>
    </div>
  );
};

export default Home;