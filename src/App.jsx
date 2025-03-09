import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./app/AppLayout";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
