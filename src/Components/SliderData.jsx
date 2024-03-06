import PropTypes from "prop-types";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "react-circular-progressbar/dist/styles.css";
import LeftArrow from "./SliderArrows/LeftArrow";
import RightArrow from "./SliderArrows/RightArrow";
import MovieCard from "./MovieCard";

const SliderData = (props) => {
  const [switchToggle, setSwitch] = useState(true);
  const [firstDisabled, setFirstDisabled] = useState(true);
  const [secondDisabled, setSecondDisabled] = useState(false);
  const toggled = () => {
    setSwitch((prev) => !prev);
    setFirstDisabled((prev) => !prev);
    setSecondDisabled((prev) => !prev);
  };

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

  return (
    <div className="sliderSection slider-container w-[90%] flex flex-col gap-4 p-8">
      <div className="title flex items-center justify-between">
        <p className="text-2xl font-medium">{props.name}</p>
        {props.toggle && (
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
        )}
      </div>
      <Slider className="w-[100%] px-8 rounded-2xl" {...settings}>
        {firstDisabled
          ? props.dataOne.map((ele) => {
              return (
                <MovieCard
                  ele={ele}
                  endPoint={props.endPoint || "movie"}
                  key={ele.id}
                />
              );
            })
          : props.dataTwo.map((ele) => {
              return (
                <MovieCard
                  ele={ele}
                  endPoint={props.endPoint || "tv"}
                  key={ele.id}
                />
              );
            })}
      </Slider>
    </div>
  );
};

// Define PropTypes
SliderData.propTypes = {
  name: PropTypes.string.isRequired,
  toggle: PropTypes.array,
  dataOne: PropTypes.array,
  dataTwo: PropTypes.array,
  endPoint: PropTypes.string,
  // ... other props
};

export default SliderData;
