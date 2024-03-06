import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store"
import Home from "./Components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import DetailsPage from "./Components/MovieDetail/DetailsPage";
import Explore from "./Components/Explore/Explore";
import Search from "./Components/Search/Search";

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
          path: "explore/:mediaType",
          element: <Explore />
        },
        {
          path: "details/:mediaType/:id",
          element: <DetailsPage />
        },
        {
          path: "search/:searchKeyword",
          element: <Search />
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
