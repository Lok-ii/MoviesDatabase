import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSimilar } from "../../redux/detailsSlice";
import { fetchData } from "../../utils/Api";
import SliderData from "../SliderData";

const Similar = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { similar } = useSelector((state) => state.media);
  const commonApiParams = {
    language: "en-US",
  };

  useEffect(() => {
    const url = `/movie/${param.id}`;
    const getSimilar = async () => {
      try {
        const data = await fetchData(url + "/similar", commonApiParams);
        console.log(data);
        dispatch(setSimilar(data));
      } catch (err) {
        console.log(err);
      }
    };

    getSimilar();
  }, [param.id]);
  return similar.length !== 0 && <SliderData name="Similar" dataOne={similar} />;
};

export default Similar;
