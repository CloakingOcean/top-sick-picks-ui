import React from "react";

import { Redirect } from "react-router-dom";
import InputField from "./InputField";

import { Form, Button } from "reactstrap";

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
  const [backHome, setBackHome] = React.useState(false);

  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  function onSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("resource-form");

    const bodyObj = {};

    let validCount = 0;

    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.value !== null && input.value !== "" && input) {
        validCount++;
      }

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

    const patch = validCount !== inputs.size;

    let url;

    if (!create) {
      url = `${REACT_APP_API_URL}/api/songs/${params.id}`;
    } else {
      url = `${REACT_APP_API_URL}/api/songs/`;
    }

    if (!create) {
      if (patch) {
        console.log("SENDING WITH PATCH!");
      } else {
        console.log("SENDING WITH PUT!");
      }
    } else {
      console.log("SENDING WITH CREATE!");
    }

    fetch(url, {
      method: create ? "POST" : patch ? "PATCH" : "PUT",
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
      <Form id="resource-form" onSubmit={onSubmit}>
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

        <div className="button-container">
          <Button color="success" type="button" onClick={addArtistInput}>
            Add
          </Button>
          <Button color="danger" type="button" onClick={deleteArtistInput}>
            Delete
          </Button>
        </div>

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

        <Button
          color="primary"
          type="submit"
          className="submit-button"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Form>
      <a href="/">
        <Button
          onClick={() => {
            setBackHome(true);
          }}
        >
          Back to Home Page
        </Button>
      </a>
      {backHome && <Redirect to="/" push />}
      {redirect && <Redirect to="/" push />}
    </>
  );
}

export default ResourceForm;
