import "./App.css";
import Sightings from "./Components/Sightings";
import SightingDetails from "./Components/SightingDetails"; /

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1> SEE BIGFOOT </h1>
          <p>Placeholder for main page</p>
          <Sightings />
        </div>
      ),
    },

    {
      path: "/:id",
      element: <SightingDetails />,
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
