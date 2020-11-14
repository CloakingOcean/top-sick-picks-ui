import React from "react";
import ResourceForm from "./ResourceForm";

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
    const url = `http://localhost:3005/api/songs/${params.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const form = document.getElementById("resource-form");
        console.dir(form);
        console.dir(data);

        Object.keys(data).forEach((field) => {
          switch (field) {
            case "name":
              setName(data[field]);
              break;
            case "artists":
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
    />
  );
}

export default UpdateSong;
