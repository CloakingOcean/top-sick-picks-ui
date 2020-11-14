import React from "react";

import DeleteButton from "./DeleteButton";

import { Link } from "react-router-dom";

function Index() {
  const [songs, setSongs] = React.useState();

  const [maxColumnLengths, setMaxColumnLengths] = React.useState({});

  const GROUPED_FIELDS = ["artists"];

  /* 
    Contains the maxmium length of grouped categories.
    This allows us to correctly layout the table.
    {
      artists: 0
      supporters: 4
    }
  */

  React.useEffect(async function () {
    const url = "http://localhost:3005/api/songs/";
    const response = await fetch(url);
    const data = await response.json();
    if (songs === undefined) {
      setSongs(data);

      GROUPED_FIELDS.forEach((field) => {
        let maxFieldLength = 0;

        data.forEach((song) => {
          if (song.artists.length > maxFieldLength) {
            maxFieldLength = song.artists.length;
            console.log("INCREMENTED");
            console.log(`maxFieldLength: ${maxFieldLength}`);
          }
        });

        const maxColumnLengthsCopy = Object.entries(maxColumnLengths);
        maxColumnLengthsCopy[field] = maxFieldLength;
        setMaxColumnLengths(maxColumnLengthsCopy);
      });
    }
  });

  function updateDelete(id) {
    let updatedSongs = songs.filter((song) => {
      return song._id !== id;
    });

    setSongs(updatedSongs);
  }

  return (
    <>
      <div>Hello</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th colSpan={songs && maxColumnLengths && maxColumnLengths.artists}>
              Artists
            </th>
            <th>Youtube Link</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        {songs !== undefined &&
          songs.map((song) => {
            return (
              <tbody key={song._id}>
                <tr>
                  <td>{song.name}</td>
                  {song.artists &&
                    maxColumnLengths &&
                    song.artists.map((artist, index) => {
                      console.log("MaxCOlumnLengths:");
                      console.log(maxColumnLengths);
                      const returnJSX = [<td key={artist}>{artist}</td>];

                      {
                        /* console.log(`Length: ${song.artists.length}`);
                      console.log("MATH: " + (song.artists.length - 1));
                      console.log(`artist: ${artist}, index: ${index}`); */
                      }

                      if (index === song.artists.length - 1) {
                        console.log("Last iteration...");
                        console.log(
                          `MATHS: ${maxColumnLengths["artists"] - index}`
                        );
                        for (
                          let i = 0;
                          i < maxColumnLengths["artists"] - (index + 1);
                          i++
                        ) {
                          returnJSX.push(
                            <td key={`${artist}-SPACING-${index}-${i}`}></td>
                          );
                        }
                      }

                      return returnJSX;
                    })}
                  <td>{song["youtube-link"]}</td>
                  <td>{song.rating}</td>
                  <td>{song.review}</td>
                  <td>
                    <Link to={`/api/songs/updateSong/${encodeURI(song._id)}`}>
                      <button>Update</button>
                    </Link>
                  </td>
                  <td>
                    <DeleteButton songProp={song} updateDelete={updateDelete} />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>

      <Link to="/api/songs/createSong">
        <button>Create Song</button>
      </Link>
    </>
  );
}

export default Index;
