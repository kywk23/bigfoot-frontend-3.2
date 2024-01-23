import "./App.css";
import Sightings from "./Components/Sightings";
import SightingDetails from "./Components/SightingsDetails";

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import SightingsForm from "./Components/SightingsForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1> SEE BIGFOOT </h1>
          <Sightings />
        </div>
      ),
    },

    {
      path: "/:index",
      element: <SightingDetails />,
    },
    {
      path: "/sightingsform",
      element: <SightingsForm />,
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
