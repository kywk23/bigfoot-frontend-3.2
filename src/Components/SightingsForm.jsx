import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../constants.jsx";
import { Link } from "react-router-dom";

export default function SightingsForm() {
  const [sightings, setSightings] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const handleChange = (event) => {
    setSightings({ ...sightings, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(sightings);

    let response = await axios.post(`${BACKEND_URL}/sightings`, sightings);
    setSightings({
      date: "",
      location: "",
      notes: "",
    });
  };

  return (
    <div>
      <h1>Sightings Form</h1>{" "}
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={sightings.date} onChange={handleChange} />
        </label>
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
      <br />
      <Link to="/">Back to see list of sightings!</Link>
    </div>
  );
}
