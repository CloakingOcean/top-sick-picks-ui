import React from "react";

const { v4: uuidv4 } = require("uuid");

function ArtistsDynamicInputs({ onArtistsInputChange }) {
  const [uniqueID, setUniqueId] = React.useState(uuidv4()); // Sets initial UniqueID (Remember, doesn't matter if this ID is used in other areas.

  React.useEffect(() => {
    addArtistInputUniqueId(uniqueID);
  }, []);
}

export default ArtistsDynamicInputs;
