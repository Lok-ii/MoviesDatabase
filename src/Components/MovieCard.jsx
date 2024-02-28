import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import poster from "../assets/poster.png";
import { useSelector } from "react-redux";

const MovieCard = ({ele}) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const genereData = useSelector((state) => state.home.genre);
  const vote =
    ele.vote_average.toString().length > 3
      ? ele.vote_average.toString().slice(0, 3)
      : ele.vote_average;

  const ratingColor = vote >= 7 ? "#008101" : "#FFA401";

  const mediaName =
    ele.original_title || ele.original_name || ele.title || ele.name;

  const displayText =
    mediaName.length > 19 ? `${mediaName.slice(0, 19)}...` : mediaName;

  const posterImg = ele.poster_path ? baseUrl + ele.poster_path : poster;

  return (
    <Link to={"/details/" + ele.id} key={ele.id}>
      <div className="carouselItem cursor-pointer">
        <div className="posterBloc w-full rounded-2xl relative">
          <span className="w-full rounded-[1rem]">
            <LazyLoadImage
              className="w-full rounded-[1rem]"
              src={posterImg}
              effect="blur"
              alt=""
            />
          </span>
          <div className="circleRating w-12 absolute bottom-[-1.5rem] left-2">
            <CircularProgressbar
              value={vote}
              maxValue={10}
              text={vote.toString().slice(0, 3)}
              background
              backgroundPadding={1}
              styles={buildStyles({
                backgroundColor: "#fff",
                textColor: "#000",
                pathColor: ratingColor,
                trailColor: "transparent",
                textSize: "1.8rem",
              })}
            />
          </div>
          <div className="genres flex items-center justify-end flex-wrap gap-1 w-1/2 absolute bottom-4 right-2">
            {genereData.map((id) => {
              if (id.id === ele.genre_ids[0] || id.id === ele.genre_ids[1]) {
                return (
                  <p
                    className="bg-[#DA2F68] px-2 py-1 rounded-lg text-xs"
                    key={id.id}
                  >
                    {id.name}
                  </p>
                );
              }
            })}
          </div>
        </div>
        <br />
        <div className="textBlock mt-2 flex flex-col gap-1 text-ellipsis whitespace-nowrap overflow-hidden">
          <span className="mediaTitle text-lg ">{displayText}</span>
          <span className="date text-xs font-semibold text-gray-400">
            {ele.release_date || ele.first_air_date}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
