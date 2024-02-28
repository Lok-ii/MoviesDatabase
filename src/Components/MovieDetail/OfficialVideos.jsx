import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setVideos, setModal, setPlayerVideo } from "../../redux/detailsSlice";
import { fetchData } from "../../utils/Api";
import ReactPlayer from "react-player/lazy";
import Play from "../../assets/svg/Play";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OfficialVideos = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { videos, modalIsOpen, playerVideo } = useSelector(
    (state) => state.media
  );
  const baseVideoUrl = "https://www.youtube.com/watch?v=";
  const commonApiParams = {
    language: "en-US",
  };

  useEffect(() => {
    const url = `/movie/${param.id}`;
    const getVideos = async () => {
      try {
        const data = await fetchData(url + "/videos", commonApiParams);
        console.log(data);
        dispatch(setVideos(data));
      } catch (err) {
        console.log(err);
      }
    };

    getVideos();
  }, [param.id]);

  // document.addEventListener("click", (e) => {
  //   if ((!(e.target.classList.contains("modal"))) && (!(e.target.classList.contains("svgHover")))) {
  //   console.log(e.target);
  //     dispatch(setModal("hidden"));
  //   }
  // });
  return (
    videos.length !== 0 && (
      <div className="w-[83%] flex flex-col gap-8">
        <p className="text-2xl font-medium">Official Videos</p>
        {/*  */}

        <div
          className={`w-[70%] h-[80%] fixed flex items-center justify-center modal bg-black`}
        >
          {/* <ReactPlayer url={playerVideo} /> */}
        </div>
        <div className="w-full px-10 h-[12.5rem] flex justify-start gap-4 overflow-x-scroll">
          {videos.map((video) => {
            return (
              <div
                key={video.id}
                id={video.id}
                className="svgHover commonClass flex items-center justify-center rounded-[1rem] cursor-pointer"
                onClick={(e) => {
                  console.log("Clicked on", e.target);
                  dispatch(setPlayerVideo(`${baseVideoUrl + video.key}`));
                  dispatch(setModal("flex"));
                }}
              >
                <div className="relative commonClass w-[20rem] h-[11rem] rounded-[1rem]">
                  {/* <img
                  className="w-full h-full object-contain commonClass rounded-[1rem]"
                  src={
                    "https://img.youtube.com/vi/" + video.key + "/mqdefault.jpg"
                  }
                  alt=""
                /> */}
                  <LazyLoadImage
                    className="w-full h-full object-contain commonClass rounded-[1rem]"
                    src={
                      "https://img.youtube.com/vi/" +
                      video.key +
                      "/mqdefault.jpg"
                    }
                    effect="blur"
                    alt=""
                  />
                  <div className="absolute commonClass top-[25%] left-[40%]">
                    <Play />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default OfficialVideos;
