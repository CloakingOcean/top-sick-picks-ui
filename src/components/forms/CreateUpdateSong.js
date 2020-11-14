import React from "react";
import ResourceForm from "./ResourceForm";

function UpdateSong({ match: { params }, create }) {
  const [name, setName] = React.useState("");
  const [artists, setArtists] = React.useState(""); // Array of text values
  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [review, setReview] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const setMethods = {
    setName: setName,
    setArtists: setArtists,
    setYoutubeLink: setYoutubeLink,
    setRating: setRating,
    setReview: setReview,
    setRedirect: setRedirect,
  };

  React.useEffect(() => {
    let artistsArray = [];
    artistsArray.push("");
    setArtists(artistsArray);

    if (!create) {
      handlePopulation(artistsArray);
    }
  }, []);

  async function handlePopulation(artistsArray) {
    const url = `http://localhost:3005/api/songs/${params.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const form = document.getElementById("resource-form");
        console.dir(form);
        console.dir(data);

        Object.keys(data)
          .filter((field) => {
            field !== "_id";
          })
          .forEach((field) => {
            const firstCapLetter = field.charAt(0).toUpperCase();
            const rest = field.slice(1);
            console.log(`set${firstCapLetter}${rest}`);
            setMethods[`set${firstCapLetter}${rest}`](data[field]);
          });
      });
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
    <ResourceForm
      name={name}
      setName={setName}
      artists={artists}
      setArtists={setArtists}
      youtubeLink={youtubeLink}
      setYoutubeLink={setYoutubeLink}
      rating={rating}
      setRating={setRating}
      review={review}
      setReview={setReview}
      redirect={redirect}
      setRedirect={setRedirect}
      params={params}
      deleteArtistInput={deleteArtistInput}
      addArtistInput={addArtistInput}
      onArtistsInputChange={onArtistsInputChange}
      create=create
    />
  );
}

export default UpdateSong;
