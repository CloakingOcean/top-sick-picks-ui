import React from "react";

import DeleteButton from "./DeleteButton";

function Index() {
  const [songs, setSongs] = React.useState();
  let MAX_ARTIST_LENGTH;

  React.useEffect(async function () {
    const url = "http://localhost:3005/api/songs/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (songs === undefined) {
      setSongs(data);

      MAX_ARTIST_LENGTH = 0;

      data.forEach((song) => {
        let currentMax = 0;
        song.artists.forEach((artist) => {
          currentMax++;
        });

        if (currentMax > MAX_ARTIST_LENGTH) {
          MAX_ARTIST_LENGTH = currentMax;
        }
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
            <th colSpan={songs && MAX_ARTIST_LENGTH}>Artists</th>
            <th>Youtube Link</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        {songs !== undefined &&
          songs.map((song) => {
            return (
              <tbody key={song._id}>
                <tr>
                  <td>{song.name}</td>
                  {song.artists &&
                    song.artists.map((artist) => {
                      return <td key={artist}>{artist}</td>;
                    })}
                  <td>{song["youtube-link"]}</td>
                  <td>{song.rating}</td>
                  <td>{song.review}</td>
                  <td>
                    <a href={`/api/songs/editSong/${encodeURI(song._id)}`}>
                      <button>Edit</button>
                    </a>
                  </td>
                  <td>
                    <a href={`/api/songs/updateSong/${encodeURI(song._id)}`}>
                      <button>Update</button>
                    </a>
                  </td>
                  <td>
                    <DeleteButton songProp={song} updateDelete={updateDelete} />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>

      <button>Create Song</button>
    </>
  );
}

export default Index;
