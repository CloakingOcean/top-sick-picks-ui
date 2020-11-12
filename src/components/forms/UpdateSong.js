import React from "react";

function UpdateSong({ match: { params } }) {
  const [name, setName] = React.useState("");
  // const [artists, setArtists] = React.useState("");

  /* Artists is a list of uniqueIDs. To determine which input is for which uniqueId, you must check their state.
  
    e.x.:
    [
      UUID-1,
      UUID-2,
      UUID-3,
      UUID-4,
      UUID-5,
      UUID-6,
    ]

  */

  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState("");

  React.useEffect(() => {
    let artists = [];
    artists.push(
      <input
        value={artistsValues[0]}
        type="text"
        key="taco" // TODO: Fix index dependency later
        onChange={onArtistsInputChange}
      />
    );
    setArtists(artists);
  }, []);

  function addArtistInputUniqueId(uniqueID) {
    if (artists.includes(uniqueID)) {
      console.error(
        "UniqueID of an artist input has *already* been added! Please ensure this *does not* happen!"
      );
      return;
    }

    artists.push(uniqueID);
  }

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
        {console.log(artists)}
        {console.log("Type of artists:" + typeof artists)}
        {typeof artists === "object" && artists}
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
