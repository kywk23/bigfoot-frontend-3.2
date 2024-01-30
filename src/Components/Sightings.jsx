import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants.jsx";
import { useParams } from "react-router-dom";

export default function Sightings() {
  // States
  const [sightings, setSightings] = useState([]);
  const { index } = useParams();
  const navigate = useNavigate();
  const handleGetSightingsList = async () => {
    try {
      let response = await axios.get(`${BACKEND_URL}/sightings`);
      setSightings(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteSighting = async (index) => {
    try {
      await axios.delete(`${BACKEND_URL}/sightings/${index}`);
      handleGetSightingsList();
    } catch (error) {
      console.error("Error deleting sighting:", error.message);
    }
  };

  const navigateToEditSighting = (index) => {
    navigate(`${index}/sightingseditform`);
  };

  useEffect(() => {
    console.log(`sightings`, sightings);
  }, [sightings]);

  return (
    <div>
      <Link to="/sightingsform">Add a sighting here</Link>
      <br />
      <br />
      <button onClick={handleGetSightingsList}>Big Foot Sightings - Click here.</button>
      {sightings && sightings.length > 0 ? (
        sightings.map((sighting) => (
          <div key={sighting.id} className="card">
            <Link to={`${sighting.id}`}>
              <h2>
                {sighting.location} - {new Date(sighting.date).toLocaleDateString()}
              </h2>
            </Link>
            <button onClick={() => navigateToEditSighting(sighting.id)}>Edit</button>
            <button onClick={() => deleteSighting(sighting.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
}
