import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants.jsx";

export default function SightingDetails({ selectedSightingIndex }) {
  const [sighting, setSighting] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/sightings/${selectedSightingIndex}`);
        setSighting(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [selectedSightingIndex]);

  console.log(`sighting:`, sighting);

  return (
    <div>
      <h1>Sighting Details</h1>
      {sighting ? (
        <div className="card">
          <h2>
            {sighting.YEAR}, {sighting.SEASON}, {sighting.MONTH}
          </h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
