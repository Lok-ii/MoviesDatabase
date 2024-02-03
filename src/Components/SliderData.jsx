import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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

  };
  const baseUrl = "https://image.tmdb.org/t/p/original";

  return (
    <div className="sliderSection w-[90%] flex flex-col gap-4 p-8">
      <div className="title flex items-center justify-between">
        <p className="text-2xl">{props.name}</p>
        <div className="toggleSection flex items-center gap-10 rounded-[2rem] font-medium bg-white text-extraTextColor w-[15rem] h-[2rem] relative transition-all duration-300">
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
      </div>
      <Slider className="w-[100%] px-8 rounded-2xl" {...settings}>
        {firstDisabled
          ? props.dataOne.map((ele) => {
            const vote = ele.vote_average.toString().length > 3
            ? ele.vote_average.toString().slice(0, 3)
            : ele.vote_average;

              return (
                <div className="carouselItem w-[20rem] rounded-2xl" key={ele.id}>
                  <div className="posterBloc w-full rounded-2xl">
                    <span className="w-full">
                      <img className="w-full" src={baseUrl + ele.poster_path} alt="" />
                    </span>
                    <div className="circleRating w-16">
                      <CircularProgressbar
                        value={vote}
                        maxValue={10}
                        text={vote.toString().slice(0, 3)}
                      />
                    </div>
                    <div className="genres">
                      {genereData.map((id) => {
                        if (
                          id.id === ele.genre_ids[0] ||
                          id.id === ele.genre_ids[1]
                        ) {
                          return <div key={id.id}>{id.name}</div>;
                        }
                      })}
                    </div>
                  </div>
                  <div className="textBlock">
                    <span className="mediaTitle">{ele.original_title || ele.original_name || ele.title || ele.name}</span>
                    <span className="date">{ele.release_date || ele.first_air_date}</span>
                  </div>
                </div>
              );
            })
          : props.dataTwo.map((ele) => {
            const vote = ele.vote_average.toString().length > 3
            ? ele.vote_average.toString().slice(0, 3)
            : ele.vote_average;

              return (
                <div className="carouselItem w-[20rem]" key={ele.id}>
                  <div className="posterBloc w-full">
                    <span className="w-full">
                      <img className="w-full" src={baseUrl + ele.poster_path} alt="" />
                    </span>
                    <div className="circleRating w-16">
                      <CircularProgressbar
                        value={vote}
                        maxValue={10}
                        text={vote.toString().slice(0, 3)}
                      />
                    </div>
                    <div className="genres">
                      {genereData.map((id) => {
                        if (
                          id.id === ele.genre_ids[0] ||
                          id.id === ele.genre_ids[1]
                        ) {
                          return <div key={id.id}>{id.name}</div>;
                        }
                      })}
                    </div>
                  </div>
                  <div className="textBlock">
                    <span className="mediaTitle">{ele.original_title}</span>
                    <span className="date">{ele.release_date}</span>
                  </div>
                </div>
              );
            })}
      </Slider>
    </div>
  );
};

export default SliderData;
