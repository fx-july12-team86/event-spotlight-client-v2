import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./app/AppLayout";
import Home from "./pages/Home/Home";
import EventPage from "./pages/EventPage/EventPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
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
