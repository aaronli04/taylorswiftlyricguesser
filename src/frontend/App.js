import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Tayye from './Tayye.jpg';

const albumName = 'Fearless (Taylor\'s Version)';

function App() {
  
  // Store lyrics and song name in the frontend
  var [songName, setSongName] = useState();
  var [lyrics, setLyrics] = useState();

  // Change album number based on what album the user selects
  var [albumNumber, setAlbumNumber] = useState(6);

  // Get lyrics and songname from backend, set variables
  useEffect(() => {
      async function fetchLyrics() {
        const response = await fetch(`http://localhost:5002/lyrics/${albumNumber}`);
        const songAndLyric = await response.json();
        setSongName(songAndLyric[0]);
        setLyrics(songAndLyric[1]);
        return songAndLyric;
      }
    fetchLyrics();
  }, []);

  return (
      <div className='App'>
        <div className='Title'>
          SWIFTOMETER
        </div>
        <div className='Description'>Exposing the Fake Swifties (Kanye Stans)</div>
        <img src={Tayye}></img>
        <h2>
          {"Song Name: "} {songName}
        </h2>
        <h3>
          {"Lyrics: "} {lyrics}
        </h3>
      </div>
  );
}

export default App;
