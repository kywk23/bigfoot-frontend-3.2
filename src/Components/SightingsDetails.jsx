import { useParams } from "react-router-dom";

const SightingDetails = ({ sightings }) => {
  const { index } = useParams(); // Using "index" in the URL
  const sightingIndex = parseInt(index, 10);
  const sighting = sightings[sightingIndex];

  return (
    <div>
      <h1>Sighting Details:</h1>
      {sighting ? (
        <div>
          <h2>
            {sighting.YEAR}, {sighting.SEASON}, {sighting.MONTH}
          </h2>
          <p>{sighting.DATE}</p>
          <p>{sighting.LOCATION_DETAILS}</p>
          <p>{sighting.OBSERVED}</p>
        </div>
      ) : (
        <p>Sighting not found</p>
      )}
    </div>
  );
};

export default SightingDetails;
