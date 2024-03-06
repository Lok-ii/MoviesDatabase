import { useEffect, useRef } from "react";
import { fetchData } from "../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  setPopularMovies,
  setPopularTvShows,
  setTopMovies,
  setTopTvShows,
  setTrendingDay,
  setTrendingWeek,
  setGenre,
} from "../redux/homeSlice";
import SliderData from "./SliderData";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const searchRef = useRef();
  useEffect(() => {
  const commonApiParams = {
    language: "en-US",
    page: 1,
  };
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

    const getPopularMovies = async () => {
      try {
        const data = await fetchData("/movie/popular", commonApiParams);
        console.log(data);
        dispatch(setPopularMovies(data));
      } catch (error) {
        console.log(error);
      }
    };
    getPopularMovies();

    const getPopularTvShows = async () => {
      try {
        const data = await fetchData("/tv/popular", commonApiParams);
        console.log(data);
        dispatch(setPopularTvShows(data));
      } catch (error) {
        console.log(error);
      }
    };

    getPopularTvShows();

    const getTopMovies = async () => {
      try {
        const data = await fetchData("/movie/top_rated", commonApiParams);
        console.log(data);
        dispatch(setTopMovies(data));
      } catch (error) {
        console.log(error);
      }
    };
    getTopMovies();

    const getTopTvShows = async () => {
      try {
        const data = await fetchData("/tv/top_rated", commonApiParams);
        console.log(data);
        dispatch(setTopTvShows(data));
      } catch (error) {
        console.log(error);
      }
    };
    getTopTvShows();

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
  }, [dispatch]);

  const {
    trendingDay,
    trendingWeek,
    popularMovies,
    popularTvShows,
    topMovies,
    topTvShows,
  } = useSelector((store) => store.home);

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
            className="w-[80%] h-14 outline-none px-6 rounded-l-[2rem] text-gray-700"
            placeholder="Search for a movie, TV show or person"
            ref={searchRef}
          ></input>
          <button
            type="submit"
            className="w-[20%] h-14 rounded-r-[2rem] bg-buttonGradient"
            onClick={() => {
              // dispatch(setFilters({type: "with_keywords", value: searchRef.current.value}))
              navigateTo(`/search/${searchRef.current.value}`)
            }}
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
          dataTwo={popularTvShows}
        />
        <SliderData
          name="Top Rated"
          toggle={["Movies", "Tv Shows"]}
          dataOne={topMovies}
          dataTwo={topTvShows}
        />
      </div>
    </div>
  );
};

export default Home;
