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

  const GROUPED_FIELDS = ["artists"];

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

    const form = document.getElementById("resource-form");

    const bodyObj = {};

    form.querySelectorAll("input").forEach((input) => {
      if (!input.hasAttribute("data-form-group")) {
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

    fetch(`http://localhost:3005/api/songs/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });

    setRedirect(true);
  }

  function addArtistInput() {
    const tempArray = artists.slice(0);
    tempArray[tempArray.length] = "";

    setArtists(tempArray);
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
  }

  function setItemOfArtistsArray(index, value) {
    const tempArray = artists.slice(0);
    tempArray[index] = value;
    setArtists(tempArray);
  }

  return (
    <>
      <form id="resource-form" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
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
            artists.map((artist, index) => {
              return (
                <input
                  id="artists"
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
          id="youtube-link"
          value={youtubeLink}
          name="youtube-link"
          type="text"
          onChange={(e) => {
            onInputChange(e, setYoutubeLink);
          }}
        />

        <label htmlFor="ratingInput">Rating</label>
        <input
          id="rating"
          name="rating"
          value={rating}
          type="text"
          onChange={(e) => {
            onInputChange(e, setRating);
          }}
        />

        <label htmlFor="reviewInput">Review</label>
        <input
          id="review"
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
      <a href="/">
        <button>Back to Home Page</button>
      </a>
      {redirect && <Redirect to="/" push />}
    </>
  );
}

export default UpdateSong;
