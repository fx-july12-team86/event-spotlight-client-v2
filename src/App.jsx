import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./appLayout/AppLayout";

import Home, { loader as eventsLoader } from "./pages/Home/Home";

import EventPage, {
  loader as eventPageLoader,
} from "./pages/EventPage/EventPage";
import Error from "./components/Error/Error";
import Catalog from "./pages/Catalog/Catalog";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import Favorites, {
  loader as favoritesLoader,
} from "./pages/Favorites/Favorites";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      path: "/",
      children: [
        {
          path: "",
          element: <Home />,
          errorElement: <Error />,
          loader: eventsLoader,
        },
        {
          path: "event/:id",
          element: <EventPage />,
          errorElement: <Error />,
          loader: eventPageLoader,
        },
        {
          path: "catalog",
          element: <Catalog />,
          errorElement: <Error />,
          // loader: catalogLoader,
        },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
          errorElement: <Error />,
        },
        {
          path: "favorites",
          element: (
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          ),
          loader: favoritesLoader,
          errorElement: <Error />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ],
  {
    basename: "/event-spotlight-client-v2",
  }
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
