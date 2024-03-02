import { useEffect } from "react";
import Select from "react-select";
import { fetchData } from "../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { setGenre } from "../../redux/homeSlice";
import {
  resetValue,
  setFilters,
  setMediaList,
  setTotalPage,
} from "../../redux/exploreSlice";
import { useParams } from "react-router-dom";
import MovieCard from "../MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { DNA } from "react-loader-spinner";

const Explore = () => {
  const dispatch = useDispatch();
  const { mediaType } = useParams();

  const { genre } = useSelector((state) => state.home);
  const { mediaList, filters, totalPages } = useSelector(
    (state) => state.explore
  );

  const genreOptions = genre.map((item) => {
    return { value: item.id, label: item.name };
  });

  const sortData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
      value: "primary_release_date.desc",
      label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

  const handleGenre = (selectedOptions) => {
    const genre = selectedOptions.reduce((acc, item, idx, arr) => {
      if (idx !== arr.length - 1) {
        return acc + item.value + ",";
      }
      return acc + item.value;
    }, "");
    dispatch(setMediaList({ type: "new", data: [] }));
    dispatch(setFilters({ type: "with_genre", value: genre }));
  };

  const handleSort = (selectedOption) => {
    console.log(selectedOption);
    dispatch(setMediaList({ type: "new", data: [] }));
    dispatch(setFilters({ type: "sort_by", value: selectedOption.value }));
  };

  const increasePageNum = () => {
    dispatch(setFilters({ type: "page", value: filters.page + 1 }));
  };

  useEffect(() => {
    dispatch(resetValue());
    handleGenre([]);
    handleSort(sortData[0]);

    const commonApiParams = {
      language: "en-US",
      page: 1,
    };
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
  }, [mediaType, dispatch]);

  useEffect(() => {
    const fetchMedia = async () => {
      console.log(filters);
      try {
        const data = await fetchData(`/discover/${mediaType}`, filters);
        console.log(data);
        dispatch(setTotalPage(data.total_pages));
        dispatch(setMediaList({ type: "old", data: data.results }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedia();
  }, [dispatch, filters, mediaType]);
  return (
    genre && (
      <div className="flex flex-col text-white items-center">
        <div className="flex items-center justify-between py-8 w-[70%]">
          <h1 className="text-white w-[20%]">
            Explore {mediaType === "movie" ? "Movies" : "Tv Shows"}{" "}
          </h1>
          <div className="w-[80%] flex items-center justify-end gap-8 text-black">
            <Select
              isMulti
              name="genres"
              placeholder="Select a genre..."
              options={genreOptions}
              isSearchable={true}
              isClearable={true}
              className="basic-multi-select max-w-[100%] w-[25%] rounded-full bg-lightBackground"
              classNamePrefix="innerSelect select"
              onChange={handleGenre}
            />
            <Select
              name="sortBy"
              placeholder="Sort by..."
              options={sortData}
              isClearable={true}
              className="basic-multi-select max-w-[100%] w-[45%] rounded-full bg-lightBackground"
              classNamePrefix="innerSelect select"
              onChange={handleSort}
            />
          </div>
        </div>
        {/* <div className="w-[70%] flex flex-wrap gap-y-8">
          {mediaList.length !== 0 &&
            mediaList.map((media) => {
              return <MovieCard ele={media} key={media.id} />;
            })}
        </div> */}
        <div className=" w-[70%]">
          {mediaList?.length !== 0 ? (
            <InfiniteScroll
              className="content flex flex-wrap gap-y-8"
              dataLength={mediaList?.length || []}
              next={increasePageNum}
              hasMore={filters.page <= totalPages}
              loader={
                <DNA
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              }
            >
              {mediaList?.map((item) => {
                return <MovieCard key={item.id} ele={item} />;
              })}
            </InfiniteScroll>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </div>
      </div>
    )
  );
};

export default Explore;