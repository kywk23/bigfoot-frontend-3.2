import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.jsx";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function SightingsForm() {
  const [sightings, setSightings] = useState({
    date: "",
    location: "",
    notes: "",
  });
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Sightings section
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

  //Categories section
  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };
  useEffect(() => {
    console.log(`cat options:`, categoriesOptions);
    console.log(`selected cat:`, selectedCategory);
  }, [categoriesOptions, selectedCategory]);

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/categories`);
        console.log(res.data);
        const categoryNames = res.data.map((category) => ({
          label: category.name,
          value: category.name,
        }));
        console.log(`categoryNames:`, categoryNames);
        setCategoriesOptions(categoryNames);
      } catch (error) {
        console.error("error:", error);
      }
    };
    getCategoryData();
  }, []);

  return (
    <div>
      <h1>Sightings Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <Select
            isMulti
            styles={selectFieldStyles}
            options={categoriesOptions}
            value={selectedCategory}
            onChange={(selectedCategories) => {
              setSelectedCategory(selectedCategories);
            }}
          />
        </label>
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
