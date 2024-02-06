import { useState, useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store"
import Home from "./Components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Movies from "./Components/Movies";
import TvShows from "./Components/TvShows";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element : <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "movies",
          element: <Movies />
        },
        {
          path: "tvshows",
          element: <TvShows />
        }
        
      ]
    }
  ])

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
