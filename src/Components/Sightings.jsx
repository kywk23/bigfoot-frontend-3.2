import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../constants.jsx";

export default function Sightings() {
  // States
  const [sightings, setSightings] = useState([]);

  const handleGetSightingsList = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/sightings`);
      setSightings(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(sightings);
  }, [sightings]);

  return (
    <div>
      <button onClick={handleGetSightingsList}>Big Foot Sightings - Click here.</button>
      {sightings && sightings.length > 0 ? (
        sightings.map((sighting, index) => (
          <div key={sighting.id} className="card">
            <Link to={`${index}`}>
              <h2>
                {sighting.YEAR}, {sighting.SEASON}, {sighting.MONTH}
              </h2>
            </Link>
          </div>
        ))
      ) : (
        <p>No sightings available</p>
      )}
    </div>
  );
}
