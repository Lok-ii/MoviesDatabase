import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  useEffect(() => {
    const callApi = async () => {
      const fetchedData = await axios.get(
        "https://api.themoviedb.org/3/movie/11",
        {
          headers: {
            Authorization: `Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkNGZjOTE5MmE5NTNkY2ZhYTMzYzA5OWZkNjc4ZCIsInN1YiI6IjY1NDIwM2ZiMTM2NTQ1MDBmYzhhOTRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZNpTZeaOEiY1jA_zFxOn9HMqQMmCWbmBHrv4khpxnJw`,
            accept: "application/json",
          },
        }
      );
      console.log(fetchedData);
    };

    callApi();
  }, []);

  return <></>;
}

export default App;
