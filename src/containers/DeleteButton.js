import React from "react";
import "./DeleteButton.scss";

import { Button } from "reactstrap";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function DeleteButton({ songProp, updateDelete }) {
  const [song, setSong] = React.useState();

  function handleOnClick(event) {
    event.preventDefault();

    const confirmResult = window.confirm(
      "Are you sure you want to delete this song?",
      false
    );

    if (!confirmResult) {
      return;
    }

    fetch(`${REACT_APP_API_URL}/api/songs/${song._id}`, {
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
    <Button color="danger" onClick={handleOnClick}>
      Delete
    </Button>
  );
}

export default DeleteButton;
