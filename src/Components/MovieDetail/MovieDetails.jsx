import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentMedia, setDetails } from "../../redux/detailsSlice";
import { fetchData } from "../../utils/Api";
import poster from "../../assets/poster.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Play from "../../assets/svg/Play";

const MovieDetails = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const {
    currentMedia,
    vote,
    posterImg,
    backdropImg,
    ratingColor,
    mediaName,
    crew,
    date,
  } = useSelector((state) => state.media);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const commonApiParams = {
      language: "en-US",
    };
    const url = `/${param.mediaType}/${param.id}`;
    console.log("fetched", url);
    const getDetails = async () => {
      try {
        const data = await fetchData(url, commonApiParams);
        console.log(data);
        dispatch(setCurrentMedia(data));
        const vote =
          data.vote_average.toString().length > 3
            ? data.vote_average.toString().slice(0, 3)
            : data.vote_average;

        const ratingColor = vote >= 7 ? "#008101" : "#FFA401";

        const mediaName =
          data.original_title || data.original_name || data.title || data.name;

        //  displayText =
        //     mediaName.length > 19 ? `${mediaName.slice(0, 19)}...` : mediaName;

        const posterImg = data.poster_path
          ? baseUrl + data.poster_path
          : poster;

        const backdropImg = data.backdrop_path
          ? baseUrl + data.backdrop_path
          : "";

        const date = data.release_date || data.first_air_date || "";

        dispatch(
          setDetails({
            vote: vote,
            name: mediaName,
            color: ratingColor,
            image: posterImg,
            backdropImg: backdropImg,
            date: date,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();
  }, [param.id, dispatch, param.mediaType]);

  return (
    currentMedia !== undefined &&
    currentMedia !== null &&
    Object.keys(currentMedia).length !== 0 && (
      <div
        className="w-full flex justify-center -mt-20 pt-20 bg-top bg-no-repeat bg-cover"
        style={{
          backgroundImage: `linear-gradient(transparent 0%, rgb(4, 21, 45, 0.9) 0), url(${backdropImg})`,
        }}
      >
        <div className="w-[75%] min-h-[70vh] my-8 justify-between flex ">
          <div className="w-[30%] h-[70vh] rounded-lg self-start">
            <img className="w-full h-full rounded-lg" src={posterImg} alt="" />
          </div>
          <div className="w-[66%] h-full flex flex-col gap-5">
            <div className="flex flex-col">
              <h1 className="text-4xl font-semibold text-white">
                {mediaName} ({date.substr(0, 4)})
              </h1>
              <p className="text-lg font-semibold text-gray-500">
                {currentMedia.tagline}
              </p>
            </div>
            <div className="genres flex items-center flex-wrap gap-1">
              {currentMedia.genres.map((genre) => {
                return (
                  <p
                    className="bg-[#DA2F68] px-2 py-1 rounded-lg text-xs"
                    key={genre.id}
                  >
                    {genre.name}
                  </p>
                );
              })}
            </div>
            <div className="h-[7rem] flex items-center gap-8">
              <div className="w-[6rem] h-full flex items-center">
                <CircularProgressbar
                  value={vote}
                  maxValue={10}
                  text={vote.toString().slice(0, 3)}
                  background
                  backgroundPadding={2}
                  styles={buildStyles({
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    textColor: "#fff",
                    pathColor: ratingColor,
                    trailColor: "transparent",
                    textSize: "1.8rem",
                    fontWeight: "400",
                  })}
                />
              </div>
              <div className="svgHover h-full flex gap-4 items-center group hover:cursor-pointer" >
                <div className="w-[6rem]">
                  <Play />
                </div>
                <span className="text text-xl group-hover:text-pinkText transition-all duration-700">
                  Watch Trailer
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-medium text-[1.5rem]">Overview</h1>
              <p className="text-[1rem] font-medium">{currentMedia.overview}</p>
            </div>
            <div className="flex gap-12 font-medium text-[1rem] border-b pb-4 border-[#1E2C41]">
              <p className="text-[1rem] font-medium">
                Status:{" "}
                <span className="text-gray-500">{currentMedia.status}</span>
              </p>
              <p className="text-[1rem] font-medium">
                Release Date: <span className="text-gray-500">{date}</span>
              </p>
              {currentMedia.runtime ? (
                <p className="text-[1rem] font-medium">
                  Runtime:{" "}
                  <span className="text-gray-500">{`${Math.floor(
                    currentMedia.runtime / 60
                  )}h ${currentMedia.runtime % 60}m`}</span>
                </p>
              ) : (
                <p className="text-[1rem] font-medium">
                  Episode Time:{" "}
                  <span className="text-gray-500">{currentMedia.episode_run_time}m</span>
                </p>
              )}
            </div>
            <div className="flex flex-col">
              {crew.map((item) => {
                if (item.job === "Director" || item.job === "Writer") {
                  console.log(item.job);
                  return (
                    <p
                      key={item.id}
                      id={item.id}
                      className="text-[1rem] font-medium border-b pb-4 border-[#1E2C41]"
                    >
                      {item.job}:{" "}
                      <span className="text-gray-500 font-bold">
                        {item.name || item.original_name}
                      </span>
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
