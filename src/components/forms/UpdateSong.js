import React from "react";
import { Redirect } from "react-router-dom";

function UpdateSong({ match: { params } }) {
  const [name, setName] = React.useState("");
  const [artists, setArtists] = React.useState(""); // List of values?
  /*
  [
    artistFieldValue1,
    artistFieldValue2,
    artistFieldValue3,
    artistFieldValue4,
    artistFieldValue5,
  ]

  */

  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

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

    const form = event.target.closest("form");

    const bodyObj = {};

    form.querySelectorAll("input").forEach((input) => {
      console.log(input);

      if (!input.hasAttribute("data-form-group")) {
        console.log("VALUE!~!!!!!!!!!");
        console.log(input.value);
        bodyObj[input.name] = input.value;
        return;
      }

      // Is apart of a form group
      if (input.name in bodyObj) {
        //Has been inputed before
        const formGroup = bodyObj[input.name];
        formGroup.push(input.value);
        bodyObj[input.name] = formGroup;
      } else {
        const newFormGroup = [input.value];
        bodyObj[input.name] = newFormGroup;
      }
    });

    fetch(`http://localhost:3005/api/songs/${params.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });
    console.log("Submitted");
    console.log(bodyObj);

    setRedirect(true);
  }

  function addArtistInput() {
    console.log("Artists:");
    for (let prop of artists) {
      console.log(`prop: ${prop}`);
    }

    const tempArray = artists.slice(0);
    tempArray[tempArray.length] = "";

    console.log("TempArray:");
    for (let prop of tempArray) {
      console.log(`prop: ${prop}`);
    }

    setArtists(tempArray);
    console.log("Hit add Artist Input");
  }

  function deleteArtistInput() {
    if (artists.length === 1) {
      return;
    }

    const tempArray = artists.slice(0);
    tempArray.pop();
    setArtists(tempArray);
  }

  function onArtistsInputChange(event, index) {
    setItemOfArtistsArray(index, event.target.value);
    console.log(`Changed an artist input: ${event.target.value}!`);
  }

  function setItemOfArtistsArray(index, value) {
    const tempArray = artists.slice(0);
    tempArray[index] = value;
    setArtists(tempArray);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="nameInput">Name</label>
        <input
          id="nameInput"
          value={name}
          name="name"
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
                  name="artists"
                  type="text"
                  onChange={(event) => {
                    onArtistsInputChange(event, index);
                  }}
                  data-form-group="artists"
                />
              );
            })}
        </label>

        <button type="button" onClick={addArtistInput}>
          Add
        </button>

        <button type="button" onClick={deleteArtistInput}>
          Delete
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
          name="youtube-link"
          type="text"
          onChange={(e) => {
            onInputChange(e, setYoutubeLink);
          }}
        />

        <label htmlFor="ratingInput">Rating</label>
        <input
          id="ratingInput"
          name="rating"
          value={rating}
          type="text"
          onChange={(e) => {
            onInputChange(e, setRating);
          }}
        />

        <label htmlFor="reviewInput">Review</label>
        <input
          id="reviewInput"
          name="review"
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
      {redirect && <Redirect to="/" />}
    </>
  );
}

export default UpdateSong;
