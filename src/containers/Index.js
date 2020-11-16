import React from "react";

import DeleteButton from "./DeleteButton";

import { Link } from "react-router-dom";

import { Button } from "reactstrap";

import {
  setStateObjectProperty,
  deleteItemFromStateArrayByMongdoId,
} from "../components/util/StateUtil";

import "./Index.scss";

function Index() {
  const [songs, setSongs] = React.useState();

  const [maxColumnLengths, setMaxColumnLengths] = React.useState({});
  const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  /* 
    Contains the maxmium length of grouped categories.
    This allows us to correctly layout the table.
    {
      artists: 0
      supporters: 4
    }
  */

  React.useEffect(async function () {
    const url = `${REACT_APP_API_URL}/api/songs/`;

    const response = await fetch(url);
    const data = await response.json();
    if (songs === undefined) {
      setSongs(data);

      Object.keys(data[0])
        .filter((field) => Array.isArray(data[0][field]))
        .forEach((field) => {
          let maxFieldLength = 0;

          data.forEach((song) => {
            if (song.artists.length > maxFieldLength) {
              maxFieldLength = song.artists.length;
            }
          });

          setStateObjectProperty(
            maxColumnLengths,
            setMaxColumnLengths,
            field,
            maxFieldLength
          );
        });
    }
  });

  function updateDelete(id) {
    deleteItemFromStateArrayByMongdoId(songs, setSongs, id);
  }

  return (
    <main>
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
        <tbody>
          {songs !== undefined &&
            songs.map((song) => {
              return (
                <tr key={song._id}>
                  <td>{song.name}</td>
                  {song.artists &&
                    maxColumnLengths &&
                    song.artists.map((artist, index) => {
                      const returnJSX = [<td key={artist}>{artist}</td>];
                      if (index === song.artists.length - 1) {
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
                  <td>
                    <a href={song["youtube-link"]} target="_blank">
                      {song["youtube-link"]}
                    </a>
                  </td>
                  <td>{song.rating}</td>
                  <td>{song.review}</td>
                  <td>
                    <Link to={`/api/songs/updateSong/${encodeURI(song._id)}`}>
                      <Button color="primary">Update</Button>
                    </Link>
                  </td>
                  <td>
                    <DeleteButton songProp={song} updateDelete={updateDelete} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Link to="/api/songs/createSong">
        <Button color="success">Create Song</Button>
      </Link>
    </main>
  );
}

export default Index;
