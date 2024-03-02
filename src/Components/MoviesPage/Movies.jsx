import { useEffect } from "react";
import Select from "react-select";
import { fetchData } from "../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { setGenre } from "../../redux/homeSlice";

const Movies = () => {
  const dispatch = useDispatch();

  const { genre } = useSelector((state) => state.home);

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

  useEffect(() => {
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
  }, [dispatch]);
  return (
    genre && (
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-12">
          <h1 className="text-white w-[10%]">Explore Movies</h1>
          <div className="w-1/2">
            <Select
              isMulti
              name="genres"
              placeholder="Select a genre..."
              options={genreOptions}
              isSearchable={true}
              isClearable={true}
              className="basic-multi-select max-w-[100%] w-[100%] rounded-full bg-lightBackground"
              classNamePrefix="innerSelect select"
              onChange={onchange}
            />
            <Select 
              isMulti
              name="sortBy"
              placeholder="Sort by..."
              options={sortData}
              isSearchable={true}
              isClearable={true}
              className="basic-multi-select max-w-[100%] w-[100%] rounded-full bg-lightBackground"
              classNamePrefix="innerSelect select"
              onChange={onchange}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default Movies;
