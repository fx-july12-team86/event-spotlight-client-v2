import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./appLayout/AppLayout";
import Home, { loader as eventsLoader } from "./pages/Home/Home";
import EventPage, {
  loader as eventPageLoader,
} from "./pages/EventPage/EventPage";
import Error from "./components/Error/Error";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
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
