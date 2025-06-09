import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./appLayout/AppLayout";

import Home from "./pages/Home/Home";

import EventPage, {
  loader as eventPageLoader,
} from "./pages/EventPage/EventPage";
import Error from "./components/Error/Error";
import Catalog from "./pages/Catalog/Catalog";
import PrivateRoute from "./providers/PrivateRoute/PrivateRoute";
import Profile, { loader as profileLoader } from "./pages/Profile/Profile";
import Favorites, {
  loader as favoritesLoader,
} from "./pages/Favorites/Favorites";

import MyEvents, { loader as myEventsLoader } from "./pages/MyEvents/MyEvents";
import CreateEvent from "./pages/CreateEvent/CreateEvent";

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
        },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
          errorElement: <Error />,
          loader: profileLoader,
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
          path: "my-events",
          element: (
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          ),
          loader: myEventsLoader,
          errorElement: <Error />,
        },
        {
          path: "create-event",
          element: (
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          ),
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
