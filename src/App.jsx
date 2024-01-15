import logo from "/logo.png";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [sightings, setSightings] = useState();

  const handleGetSightings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sightings");
      setSightings(response.data[0]);
      console.log(sightings);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, [sightings]);

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>

      <button onClick={handleGetSightings}>Get Sightings</button>
    </>
  );
}

export default App;
