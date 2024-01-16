import "./App.css";
import Sightings from "./Components/Sightings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SightingDetails from "./Components/SightingsDetails";

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
      path: "/sightings",
      element: (
        <div>
          <h2>Click again to load</h2>
          <p>Placeholder for second page</p>
          <Sightings />
        </div>
      ),
    },
    {
      path: "/sightings/:id",
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
