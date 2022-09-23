import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Tayye from './Tayye.jpg';
import Select from 'react-select';
const albumName = 'Fearless (Taylor\'s Version)';

function App() {
  
  // Store lyrics and song name in the frontend
  var [songName, setSongName] = useState();
  var [lyrics, setLyrics] = useState();

  // Change album number based on what album the user selects
  var [albumNumber, setAlbumNumber] = useState(2);
  var [songGuess, setSongGuess] = useState('')
  var [songGuessFinal, setSongGuessFinal] = useState('')
  var [userCorrect, setUserCorrect] = useState(true)
  var [numberCorrect, setNumberCorrect] = useState(0)

  var albumNumberList = [0]
  var songNameList = ['']

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
  }, albumNumberList);

  useEffect(() => {
    async function fetchLyrics() {
      const response = await fetch(`http://localhost:5002/lyrics/${albumNumber}`);
      const songAndLyric = await response.json();
      setSongName(songAndLyric[0]);
      setLyrics(songAndLyric[1]);
      return songAndLyric;
    }
  fetchLyrics();
}, songNameList);

  useEffect(() => {
    if (songGuessFinal !== undefined && songName !== undefined && songGuessFinal !== '' && songName !== '') {
      console.log('hello')
      console.log(songGuessFinal)
      console.log(songName)
      if (songGuessFinal.trim() === songName.trim()) {
        setUserCorrect(true);
        setNumberCorrect(numberCorrect + 1);
        console.log(userCorrect)
        console.log(numberCorrect)
      }
      else {
        setUserCorrect(false)
      }
    }
    else {
      console.log('error')
    }
  }, songNameList)

  // Album list for select drop down
  const albumsList = [
    {value: 1, label: 'You All Over Me (feat. Maren Morris) (Taylor\'s Version) (From The Vault)'},
    {value: 2, label: '1989'},
    {value: 3, label: 'Lover'},
    {value: 4, label: '...Ready For It?'},
    {value: 5, label: 'reputation'},
    {value: 6, label: 'Red (Taylor\'s Version)'},
    {value: 7, label: 'Mr. Perfectly Fine (Taylor\u2019s Version) (From The Vault)'},
    {value: 8, label: 'folklore'},
    {value: 9, label: 'Fearless (Taylor\'s Version)'},
    {value: 10, label: 'The Archer'}
  ]

  const handleAlbumNumber = e => {
    console.log(typeof e.value)
    if (typeof e.value == 'number') {
      setAlbumNumber(e.value);
      albumNumberList[0]=e.value;
    }
  }

  const handleSongGuess = e => {
    setSongGuess(e.target.value)
  }

  const handleSongSubmit = e => {
    e.preventDefault();
    setSongGuessFinal(songGuess);
    songNameList[0] = songGuessFinal;
  }

  return (
      <div className='App'>
        <div className='Title'>
          SWIFTOMETER
        </div>
        <div className='Description'>Exposing the Kanye Stans</div>
        <img alt='Tayye' src={Tayye}></img>
        <div className='Selector'>
          <Select options={albumsList} onChange={handleAlbumNumber} placeholder='Select album'/>
        </div>
        <input onChange={handleSongGuess} placeholder='Enter Song Name Here' type='text' required></input>
        <form onSubmit={handleSongSubmit}>
          <button>Submit</button>
        </form>
        {songGuessFinal}
        {'' + numberCorrect}
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
