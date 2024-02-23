import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setRecommendations } from "../../redux/detailsSlice";
import { fetchData } from "../../utils/Api";
import SliderData from "../SliderData";

const Recommendations = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { recommendation } = useSelector((state) => state.media);

  const commonApiParams = {
    language: "en-US",
  };

  useEffect(() => {
    const url = `/movie/${param.id}`;
    const getRecommendations = async () => {
      try {
        const data = await fetchData(url + "/recommendations", commonApiParams);
        console.log(data);
        dispatch(setRecommendations(data));
      } catch (err) {
        console.log(err);
      }
    };

    getRecommendations();
  }, [param.id]);
  return <SliderData name="Recommendations" dataOne={recommendation} />;
};

export default Recommendations;
