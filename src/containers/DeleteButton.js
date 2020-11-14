import React from "react";

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

    fetch(`http://localhost:3005/api/songs/${song._id}`, {
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

  return <button onClick={handleOnClick}>Delete</button>;
}

export default DeleteButton;
