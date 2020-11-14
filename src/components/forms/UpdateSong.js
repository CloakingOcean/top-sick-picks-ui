import React from "react";
import { Redirect } from "react-router-dom";
import InputField from "./InputField";

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
    handlePopulation(artistsArray);
  }, []);

  async function handlePopulation(artistsArray) {
    console.log("HELLOOOOOOOOOOO");
    const url = `http://localhost:3005/api/songs/${params.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const form = document.getElementById("resource-form");
        console.dir(form);
        console.dir(data);

        Object.keys(data).forEach((field) => {
          console.log("SETTING ARTISTS");

          console.log(`field ${field}`);

          console.log(data[field]);

          switch (field) {
            case "name":
              setName(data[field]);
              break;
            case "artists":
              console.log("SETTING ARTISTSasdASDFASDFSDAFDSAFSDAFSADFSDAFA!");
              console.log(data[field]);
              console.log(typeof data[field]);
              setArtists(data[field]);
              break;
            case "youtube-link":
              setYoutubeLink(data[field]);
              break;
            case "rating":
              setRating(data[field]);
              break;
            case "review":
              setReview(data[field]);
              break;
          }
        });
      });
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

    fetch(`http://localhost:3005/api/songs/${params.id}`, {
      method: "PUT",
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

  function onInputChange(e, setFunc) {
    setFunc(e.target.value);
  }

  return (
    <>
      <form id="resource-form" onSubmit={onSubmit}>
        <InputField
          name="name"
          stateValue={name}
          setStateFunc={setName}
          inputType="text"
        />
        {artists !== undefined && artists && (
          <InputField
            name="artists"
            stateValue={artists}
            setStateFunc={setArtists}
            inputType="text"
            onChange={(event, index) => {
              onArtistsInputChange(event, index);
            }}
          />
        )}
        {/* <label>
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
        </label> */}
        <button type="button" onClick={addArtistInput}>
          Add
        </button>
        <button type="button" onClick={deleteArtistInput}>
          Delete
        </button>
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
