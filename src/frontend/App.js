import React from 'react';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const albumName = 'Fearless (Taylor\'s Version)';

function App() {
  
  // Store lyrics and song in the frontend
  var [songName, setSongName] = useState();
  var [lyrics, setLyrics] = useState();

  // Get lyrics from backend
  useEffect(() => {
      async function fetchLyrics() {
        const response = await fetch('http://localhost:5002/lyrics/8');
        const songAndLyric = await response.json();
        setSongName(songAndLyric[0])
        setLyrics(songAndLyric[1]);
        return songAndLyric;
      }
    fetchLyrics();
  }, []);

  return (
      <div className='App'>
        <div className='Title'>
          Swiftinator
        </div>
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
