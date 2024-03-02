import {useEffect} from "react";
import MovieDetails from "./MovieDetails";
import Recommendations from "./Recommendations";
import Similar from "./Similar";
import TopCast from "./TopCast";
import OfficialVideos from "./OfficialVideos";

const DetailsPage = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className="text-white flex items-center flex-col gap-8">
      <MovieDetails />
      <TopCast />
      <OfficialVideos />
      <Similar />
      <Recommendations />
    </div>
  );
};

export default DetailsPage;
