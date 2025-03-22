import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./app/AppLayout";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
