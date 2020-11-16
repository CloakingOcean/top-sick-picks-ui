import React from "react";
import "./DeleteButton.scss";

import { Button } from "reactstrap";

const API_URL = process.env.API_URL;

function DeleteButton({ songProp, updateDelete }) {
  const [song, setSong] = React.useState();

  function handleOnClick(event) {
    event.preventDefault();

    const confirmResult = confirm(
      "Are you sure you want to delete this song?",
      false
    );

    if (!confirmResult) {
      return;
    }

    fetch(`${API_URL}/api/songs/${song._id}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        setSong({
          test: "test",
        });

        updateDelete(song._id);
      });
  }

  React.useEffect(() => {
    setSong(songProp);
  }, []);

  return (
    <Button class="delete" color="danger" onClick={handleOnClick}>
      Delete
    </Button>
  );
}

export default DeleteButton;
