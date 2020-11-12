import React from "react";

function UpdateSong({ match: { params } }) {
  const [name, setName] = React.useState("");
  const [artists, setArtists] = React.useState(""); // List of values?
  /*
  [
    artistField1,
    artistField2,
    artistField3,
    artistField4,
    artistField5,
  ]

  */

  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState("");

  React.useEffect(() => {
    let artistsArray = [];
    artistsArray.push("");
    setArtists(artistsArray);
  }, []);

  function onInputChange(e, setStateFunc) {
    setStateFunc(e.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log("Submitted");
  }

  function addArtistInput(event) {
    console.log("Hit add Artist Input");
  }

  function onArtistsInputChange(event) {
    event.target.value;
  }

  function setItemOfArtistsArray(index, value) {
    const tempArray = artists.slice(0);
    tempArray[index] = value;
    setArtists(tempArray);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nameInput">Name</label>
      <input
        id="nameInput"
        value={name}
        type="text"
        onChange={(e) => {
          onInputChange(e, setName);
        }}
      />

      <label>
        Artists
        {artists &&
          artists.forEach((artist) => {
            console.log("artist: " + artist);
          })}
        {artists &&
          artists.map((artist, index) => {
            return (
              <input
                key={index}
                value={artist}
                type="text"
                onChange={(event) => {
                  setItemOfArtistsArray(index, event.target.value);
                  console.log(
                    `Changed an artist input: ${event.target.value}!`
                  );
                }}
              />
            );
          })}
      </label>

      <button type="button" onClick={addArtistInput}>
        Add
      </button>

      {/* <input
        id="artistsInput"
        value={artists}
        type="text"
        onChange={(e) => {
          onInputChange(e, setArtists);
        }}
      /> */}

      <label htmlFor="youtubeLinkInput">Youtube Link</label>
      <input
        id="youtubeLinkInput"
        value={youtubeLink}
        type="text"
        onChange={(e) => {
          onInputChange(e, setYoutubeLink);
        }}
      />

      <label htmlFor="ratingInput">Rating</label>
      <input
        id="ratingInput"
        value={rating}
        type="text"
        onChange={(e) => {
          onInputChange(e, setRating);
        }}
      />

      <label htmlFor="reviewInput">Review</label>
      <input
        id="reviewInput"
        value={review}
        type="textarea"
        onChange={(e) => {
          onInputChange(e, setReview);
        }}
      />

      <button type="submit" onClick={onSubmit}>
        Submit
      </button>
    </form>
  );
}

export default UpdateSong;
