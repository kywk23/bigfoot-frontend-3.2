import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants.jsx";
import { Link, useParams } from "react-router-dom";

export default function SightingsEditForm() {
  const [sightings, setSightings] = useState({
    location: "",
    notes: "",
  });
  const { index } = useParams();

  const handleChange = (event) => {
    setSightings({ ...sightings, [event.target.name]: event.target.value });
    console.log(sightings);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    console.log(sightings);
    try {
      const response = await axios.put(`${BACKEND_URL}/sightings/${index}`, sightings);
      console.log(response.data);
    } catch (error) {
      console.log(`error editing msg:`, error);
    }
  };

  return (
    <div>
      <h1>SightingsEditForm</h1>
      <form onSubmit={handleEdit}>
        <label>
          Location:
          <input type="text" name="location" value={sightings.location} onChange={handleChange} />
        </label>
        <label>
          Notes:
          <input type="text" name="notes" value={sightings.notes} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
