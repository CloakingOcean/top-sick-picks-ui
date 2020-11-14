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
      console.log("ADDING POPULATION BECAUSE IT Is UPDATE, NOT CREATE");
      handlePopulation(artistsArray);
    } else {
      console.log("NOT ADDING POPULATION BECAUSE IT IS CREATE, NOT UDPATE");
    }
  }, []);

  async function handlePopulation(artistsArray) {
    let url;
    if (!create) {
      url = `http://localhost:3005/api/songs/${params.id}`;
    } else {
      url = `http://localhost:3005/api/songs/`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const form = document.getElementById("resource-form");
        console.dir(form);
        console.dir(data);

        console.log("Getting ready");
        console.log(Object.keys(data).length);

        Object.keys(data)
          .filter((field) => {
            return field !== "_id";
          })
          .forEach((field) => {
            console.log(`field: ${field} value: ${data[field]}`);

            let computedName = field;

            if (field.includes("-")) {
              computedName = kebabToCamelCase(field);
            }

            const firstCapLetter = computedName.charAt(0).toUpperCase();
            const rest = computedName.slice(1);

            computedName = `set${firstCapLetter}${rest}`;

            console.log(computedName);

            setMethods[computedName](data[field]);
          });
      });
  }

  function kebabToCamelCase(string) {
    return string.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
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
      create={create}
    />
  );
}

export default UpdateSong;
