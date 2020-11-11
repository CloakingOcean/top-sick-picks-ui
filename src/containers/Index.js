import React from "react";

import DeleteButton from "./DeleteButton";

function Index() {
  const [songs, setSongs] = React.useState();

  React.useEffect(async function () {
    const url = "http://localhost:3005/api/songs/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (songs === undefined) {
      setSongs(data);
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
            <th>Artists</th>
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
                  <td>{song.artists}</td>
                  <td>{song["youtube-link"]}</td>
                  <td>{song.rating}</td>
                  <td>{song.review}</td>
                  <td>
                    <a href={`/api/songs/editSong?id=${encodeURI(song._id)}`}>
                      <button>Edit</button>
                    </a>
                  </td>
                  <td>
                    <a href={`/api/songs/updateSong?id=${encodeURI(song._id)}`}>
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
