import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./app/AppLayout";
import Home, { loader as generalEventsLoader } from "./pages/Home/Home";
import EventPage from "./pages/EventPage/EventPage";
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
          loader: generalEventsLoader,
        },
        {
          path: "event/:id",
          element: <EventPage />,
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
