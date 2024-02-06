import React from "react";
import { useSelector } from "react-redux";

const Movies = () => {
  const genre = useSelector(state => state.home.genre)
  return <div>
    <div>
      <h1>Explore Movies</h1>
      <div>
        <select name="movieGenre" id="movieGenre">
          
          {
            genre.map(item => {
              return <option value="">{item.name}</option>
            })
          }
        </select>
      </div>
    </div>
  </div>;
};

export default Movies;
