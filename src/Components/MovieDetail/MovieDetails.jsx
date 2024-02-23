import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentMedia, setDetails } from "../../redux/detailsSlice";
import { fetchData } from "../../utils/Api";
import { current } from "@reduxjs/toolkit";
import poster from "../../assets/poster.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Play from "../../assets/svg/Play";

const MovieDetails = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { currentMedia, vote, posterImg, ratingColor, mediaName, crew } = useSelector((state) => state.media);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  const commonApiParams = {
    language: "en-US",
  };

  useEffect(() => {
    const url = `/movie/${param.id}`;
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

        const posterImg = data.poster_path ? baseUrl + data.poster_path : poster;

        dispatch(setDetails({vote: vote, name: mediaName, color: ratingColor, image: posterImg}));
      } catch (err) {
        console.log(err);
      }
    };

    getDetails();


  }, [param.id]);

  return (
    Object.keys(currentMedia).length !== 0 && (
      <div className="w-[75%] h-[70vh] my-8 flex items-center justify-center">
        <div className="w-[30%] h-full rounded-lg">
          <img className="w-full h-full rounded-lg" src={posterImg} alt="" />
        </div>
        <div className="w-[70%] h-full">
          <h1 className="text-4xl font-bold mb-2 text-white">{mediaName}</h1>
          <p>{currentMedia.tagline}</p>
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
            <div className="w-[5rem] h-full flex items-center">
              <CircularProgressbar
                value={vote}
                maxValue={10}
                text={vote.toString().slice(0, 3)}
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  textColor: "#fff",
                  pathColor: ratingColor,
                  trailColor: "transparent",
                  textSize: "1.8rem",
                })}
              />
            </div>
            <div className="svgHover w-1/2 h-full flex gap-4 items-center group hover:cursor-pointer">
              <Play />
              <span className="text text-xl group-hover:text-pinkText transition-all duration-700">Watch Trailer</span>
            </div>
          </div>
          <div>
            <h1>Overview</h1>
            <p>{currentMedia.overview}</p>
          </div>
          <div>
            <p>Status: <span>{currentMedia.status}</span></p>
            <p>Release Date: <span>{currentMedia.release_date}</span></p>
            <p>Runtime: <span>{`${Math.floor(currentMedia.runtime / 60)}h ${currentMedia.runtime % 60}m`}</span></p>
          </div>
          <div>
            {
              crew.map((item) => {
                if(item.job === "Director"){
                  return <p key={item.id} id={item.id}>Director: <span>{item.name || item.original_name}</span></p>
                }else if(item.job === "Writer"){
                  return <p key={item.id} id={item.id}>Writer: <span>{item.name || item.original_name}</span></p>
                }
              })
            }
          </div>
        </div>
      </div>
    )
  );
};

export default MovieDetails;
