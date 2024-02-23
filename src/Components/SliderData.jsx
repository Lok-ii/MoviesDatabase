import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import poster from "../assets/poster.png";
import LeftArrow from "./SliderArrows/LeftArrow";
import RightArrow from "./SliderArrows/RightArrow";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const SliderData = (props) => {
  const [switchToggle, setSwitch] = useState(true);
  const [firstDisabled, setFirstDisabled] = useState(true);
  const [secondDisabled, setSecondDisabled] = useState(false);
  const toggled = () => {
    setSwitch((prev) => !prev);
    setFirstDisabled((prev) => !prev);
    setSecondDisabled((prev) => !prev);
  };

  const genereData = useSelector((state) => state.home.genre);

  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 5,
    lazyLoad: "ondemand",
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="sliderSection slider-container w-[90%] flex flex-col gap-4 p-8">
      <div className="title flex items-center justify-between">
        <p className="text-2xl">{props.name}</p>
        {
          props.toggle && <div className="toggleSection flex items-center gap-10 rounded-[2rem] font-medium bg-white text-extraTextColor w-[15rem] h-[2rem] relative transition-all duration-300">
          <div
            className={`absolute bg-buttonGradient w-[50%] h-[90%] rounded-[2rem] ${
              switchToggle ? " left-[0.5%]" : "left-[49.2%]"
            } transition-all duration-300 ease-in-out`}
          ></div>
          <button
            disabled={firstDisabled}
            className={`z-[1] w-1/2 text-center pl-4 cursor-pointer flex items-center justify-center ${
              firstDisabled ? "text-white" : "text-extraTextColor"
            }`}
            onClick={toggled}
          >
            {props.toggle[0]}
          </button>
          <button
            disabled={secondDisabled}
            className={`z-[1] w-1/2 text-center pr-4 cursor-pointer flex items-center justify-center  ${
              secondDisabled ? "text-white" : "text-extraTextColor"
            }`}
            onClick={toggled}
          >
            {props.toggle[1]}
          </button>
        </div>
        }
      </div>
      <Slider className="w-[100%] px-8 rounded-2xl" {...settings}>
        {firstDisabled
          ? props.dataOne.map((ele) => {
              const vote =
                ele.vote_average.toString().length > 3
                  ? ele.vote_average.toString().slice(0, 3)
                  : ele.vote_average;

              const ratingColor = vote >= 7 ? "#008101" : "#FFA401";

              const mediaName =
                ele.original_title ||
                ele.original_name ||
                ele.title ||
                ele.name;

              const displayText =
                mediaName.length > 19
                  ? `${mediaName.slice(0, 19)}...`
                  : mediaName;

              const posterImg = ele.poster_path
                ? baseUrl + ele.poster_path
                : poster;

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
                          backgroundPadding={6}
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
                          if (
                            id.id === ele.genre_ids[0] ||
                            id.id === ele.genre_ids[1]
                          ) {
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
            })
          : props.dataTwo.map((ele) => {
              const vote =
                ele.vote_average.toString().length > 3
                  ? ele.vote_average.toString().slice(0, 3)
                  : ele.vote_average;

              const ratingColor = vote >= 7 ? "#008101" : "#FFA401";

              const mediaName =
                ele.original_title ||
                ele.original_name ||
                ele.title ||
                ele.name;

              const displayText =
                mediaName.length > 19
                  ? `${mediaName.slice(0, 19)}...`
                  : mediaName;

              const posterImg = ele.poster_path
                ? baseUrl + ele.poster_path
                : poster;

              return (
                <div className="carouselItem cursor-pointer" key={ele.id}>
                  <div className="posterBloc w-full rounded-2xl relative">
                    <span className="w-full">
                      <img className="w-full" src={posterImg} alt="" />
                    </span>
                    <div className="circleRating w-12 absolute bottom-[-1.5rem] left-2">
                      <CircularProgressbar
                        value={vote}
                        maxValue={10}
                        text={vote.toString().slice(0, 3)}
                        background
                        backgroundPadding={6}
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
                        if (
                          id.id === ele.genre_ids[0] ||
                          id.id === ele.genre_ids[1]
                        ) {
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
              );
            })}
      </Slider>
    </div>
  );
};

export default SliderData;
