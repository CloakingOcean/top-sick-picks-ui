import React from "react";

import { Redirect } from "react-router-dom";
import InputField from "./InputField";

function ResourceForm({
  name,
  setName,
  artists,
  setArtists,
  youtubeLink,
  setYoutubeLink,
  rating,
  setRating,
  review,
  setReview,
  redirect,
  setRedirect,
  params,
  addArtistInput,
  deleteArtistInput,
  onArtistsInputChange,
  create,
}) {
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

    let url;
    if (!create) {
      url = `http://localhost:3005/api/songs/${params.id}`;
    } else {
      url = `http://localhost:3005/api/songs/`;
    }

    fetch(url, {
      method: create ? "POST" : "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    });

    setRedirect(true);
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

        <button type="button" onClick={addArtistInput}>
          Add
        </button>
        <button type="button" onClick={deleteArtistInput}>
          Delete
        </button>

        <InputField
          name="youtube-link"
          stateValue={youtubeLink}
          setStateFunc={setYoutubeLink}
          inputType="text"
        />

        <InputField
          name="rating"
          stateValue={rating}
          setStateFunc={setRating}
          inputType="text"
        />

        <InputField
          name="review"
          stateValue={review}
          setStateFunc={setReview}
          inputType="text"
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

export default ResourceForm;
