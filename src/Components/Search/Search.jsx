import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils/Api";
import {
  setSearchPage,
  setSearchList,
  setTotalSearchPages,
} from "../../redux/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { DNA } from "react-loader-spinner";

const Search = () => {
  const { searchKeyword } = useParams();
  const dispatch = useDispatch();
  const { searchList, searchPage, totalSearchPages } = useSelector(
    (state) => state.home
  );

  const increasePageNum = () => {
    dispatch(setSearchPage(searchPage + 1));
  };

  useEffect(() => {
    const searchResults = async () => {
      try {
        const data = await fetchData(`/search/multi`, {
          language: "en-US",
          page: searchPage,
          query: searchKeyword,
        });
        dispatch(setSearchList(data.results));
        dispatch(setTotalSearchPages(data.total_pages));
      } catch (error) {
        console.log(error);
      }
    };
    searchResults();

    return () => {
      dispatch(setSearchPage(1));
      dispatch(setSearchList([]));
      dispatch(setTotalSearchPages(1));
    };
  }, [dispatch, searchKeyword, searchPage]);

  return (
    <div className="flex flex-col items-center w-full text-white">
      <div className="w-[70%]">
        <h1>Search results for `{searchKeyword}`</h1>
      </div>
      <div className=" w-[70%]">
        {searchList?.length !== 0 ? (
          <InfiniteScroll
            className="content flex flex-wrap gap-y-8"
            dataLength={searchList?.length || []}
            next={increasePageNum}
            hasMore={searchPage <= totalSearchPages}
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
            {searchList?.map((item) => (
              <MovieCard key={item.id} endPoint={item.media_type} ele={item} />
            ))}
          </InfiniteScroll>
        ) : (
          <span className="resultNotFound">Sorry, Results not found!</span>
        )}
      </div>
    </div>
  );
};

export default Search;