import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.jsx";
import axios from "axios";

const SightingDetails = () => {
  const { index } = useParams();
  const [sighting, setSightings] = useState([]);

  useEffect(() => {
    console.log(`index is`, index);
  }, []);

  // // const sightingIndex = parseInt(index, 10);
  // const sighting = sightings[Number(index)];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/sightings/${index}`);
        setSightings(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, [index]);

  return (
    <div>
      <h1>Sighting Details:</h1>
      {sighting ? (
        <div>
          <p>
            <strong>Date: </strong> {sighting.date}
          </p>
          <p>
            <strong>Location: </strong> {sighting.location}
          </p>
          <p>
            <strong>Notes: </strong> {sighting.notes}
          </p>
          <br />
        </div>
      ) : (
        <p>Sighting not found</p>
      )}
    </div>
  );
};

export default SightingDetails;
