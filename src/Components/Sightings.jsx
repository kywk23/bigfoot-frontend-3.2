import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants.jsx";

export default function Sightings() {
  // States
  const [sightings, setSightings] = useState([]);
  const navigate = useNavigate();
  const [selectedSightingIndex, setSelectedSightingIndex] = useState(null);

  const handleGetSightingsList = async () => {
    try {
      navigate("/sightings");
      const response = await axios.get(`${BACKEND_URL}/sightings`);
      setSightings(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(sightings);
  }, [sightings]);

  const handleSightingClick = (index) => {
    setSelectedSightingIndex(index);
  };

  return (
    <div>
      <button onClick={handleGetSightingsList}>Click here to see list of bigfoot</button>
      {sightings && sightings.length > 0
        ? sightings.map((sighting, index) => (
            <div key={index} onClick={() => handleSightingClick(index)}>
              <Link to={`/sightings/${sighting.id}`}>
                <div className="card">
                  <h2>
                    {sighting.YEAR}, {sighting.SEASON}, {sighting.MONTH}
                  </h2>
                </div>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
}
