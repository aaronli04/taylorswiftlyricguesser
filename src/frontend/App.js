import React from 'react';
import './App.css';
import axios from 'axios';
import { resolve } from 'path';
import { useState, useEffect } from 'react';
import { json } from 'd3';

const albumName = 'Fearless (Taylor\'s Version)';

// Accesses REST API to pull random Taylor Swift lyric
function getLyric(album) {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5002/lyrics').then((response) => {
      resolve(response.data);
      console.log(response.data);
    });
});
}

function App() {
  
  // Store lyrics and song in the frontend
  var [songName, setSongName] = useState();
  var [lyrics, setLyrics] = useState();
  // Get lyrics from backend
  useEffect(() => {
      async function fetchLyrics() {
        const response = await fetch('http://localhost:5002/lyrics');
        const songAndLyric = await response.json();
        setSongName(songAndLyric[0])
        setLyrics(songAndLyric[1]);
        return songAndLyric;
      }
    fetchLyrics();
  }, []);

  console.log(typeof storeLyrics)


  return (
      <div className='App'>
        <div className='Title'>
          Swiftinator
        </div>
        {"Song Name "} {songName}
        {"\nLyrics "} {lyrics}
      </div>
  );
}

export default App;
