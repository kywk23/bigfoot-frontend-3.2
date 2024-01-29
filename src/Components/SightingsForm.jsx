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
  const [selectedCategory, setSelectedCategory] = useState([]);

  //Sightings section
  const handleChange = (event) => {
    // const selectedCategoryId = selectedCategory.map(({ value }) => value);
    // console.log(`selectedCategoryId`, selectedCategoryId);
    // setSightings({
    //   ...sightings,
    //   selectedCategoryId,
    // });

    setSightings({ ...sightings, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(`selectedCategory`, selectedCategory);
    console.log(`sightins`, sightings);
  }, [selectedCategory, sightings]);

  const handleSubmit = async (event) => {
    console.log(`sightins`, sightings);
    event.preventDefault();
    const selectedCategoryId = selectedCategory.map(({ id }) => id);
    console.log(`selectedCategory`, selectedCategory);
    console.log(`sightings`, sightings);
    console.log(`selectedCategoryId`, selectedCategoryId);
    let response = await axios.post(`${BACKEND_URL}/sightings`, {
      ...sightings,
      selectedCategoryId,
    });
    console.log(response.data);
    setSightings({
      date: "",
      location: "",
      notes: "",
      selectedCategoryId: [],
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
    const getCategoryData = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/categories`);
        const categoryNames = res.data.map((category) => ({
          id: category.id,
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
