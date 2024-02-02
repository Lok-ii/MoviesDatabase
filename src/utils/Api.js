import axios from "axios";

export const fetchData = async (url, params) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3" + url, {
      params,
      headers: {
        Authorization: `Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODdkNGZjOTE5MmE5NTNkY2ZhYTMzYzA5OWZkNjc4ZCIsInN1YiI6IjY1NDIwM2ZiMTM2NTQ1MDBmYzhhOTRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZNpTZeaOEiY1jA_zFxOn9HMqQMmCWbmBHrv4khpxnJw`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};
