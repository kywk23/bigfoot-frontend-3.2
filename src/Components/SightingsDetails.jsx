import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.jsx";
import axios from "axios";

const SightingDetails = () => {
  const { index } = useParams();
  const [sighting, setSightings] = useState([]);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    console.log(`index is`, index);
  }, []);

  // // const sightingIndex = parseInt(index, 10);
  // const sighting = sightings[Number(index)];

  useEffect(() => {
    //TO RENDER SIGHTING DETAILS
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

  useEffect(() => {
    //TO RENDER COMMENTS
    const getCommentData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/sightings/${index}/comments`);
        setCommentList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCommentData();
  }, [index]);

  useEffect(() => {
    console.log(commentList);
  }, [commentList]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/sightings/${index}/comments`, {
        content: comment,
      });
      console.log(response.data);
      setComment("");
    } catch (error) {
      console.log(`error editing msg:`, error);
    }
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

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
      <h2>Comments: </h2>
      <ul>
        {commentList.map((comment) => (
          <li key={comment.id}> {comment.content} </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Comment something la:
          <br />
          <input type="text" name="comment" value={comment} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SightingDetails;
