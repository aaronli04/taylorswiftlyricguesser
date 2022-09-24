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
  var [albumNumber, setAlbumNumber] = useState();

  // Variables to check if user guess was correct
  var [songGuess, setSongGuess] = useState('')
  var [songGuessFinal, setSongGuessFinal] = useState('')
  var [userCorrect, setUserCorrect] = useState(true)
  var [totalGuess, setTotalGuess] = useState(0)
  var [numberCorrect, setNumberCorrect] = useState(0)
  var [message, setMessage] = useState()
  var [playing, setPlaying] = useState(true);

  // Get lyrics and songname every time album is changed
  useEffect(() => {
      async function fetchLyrics() {
        const response = await fetch(`http://localhost:5002/lyrics/${albumNumber}`);
        const songAndLyric = await response.json();
        setSongName(songAndLyric[0]);
        setLyrics(songAndLyric[1]);
        return songAndLyric;
      }
      if (playing === true) {
        fetchLyrics();
      }
  }, [albumNumber, songGuessFinal]);


  // Every time submit is clicked, check if user guess is same as actual song name
  // If so, increment number of guesses correct by 1
  useEffect(() => {
    if (playing === true) {
      if (songGuessFinal !== undefined && songName !== undefined && songGuessFinal !== '' && songName !== '') {
        setTotalGuess(totalGuess + 1);
        if (songGuessFinal.trim() === songName.trim()) {
          setUserCorrect(true);
          setNumberCorrect(numberCorrect + 1);
        }
        else {
          setUserCorrect(false)
        }
      }
    }
  }, [songGuessFinal])

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

  // Hate machine designed to roast the user
  function setUserMessage() {
    // If they get 100%
    if (numberCorrect === totalGuess) {
      setMessage('Either you\'re cheating or you really need to get a job.')
    }
    // If they get above or equal to 67% but not 100%
    else if (numberCorrect >= totalGuess * (2/3) && numberCorrect !== totalGuess) {
      setMessage('Try harder next time bud.')
    }
    // If they get less than 67% correct but more than or equal to 60%
    else if (numberCorrect < totalGuess * (2/3) && numberCorrect >= totalGuess * (3/5)) {
      setMessage(`You're not even at a C, just say you hate Taylor Swift already.`)
    }
    // If they get below 60% but more than or equal to 50%
    else if (numberCorrect < totalGuess * (3/5) && numberCorrect >= totalGuess * (1/2)) {
      setMessage('Were you even trying? You\'re an embarassment.')
    }
    // If they get below 50% correct 
    else {
      setMessage('Stop stannning Kanye and go find yourself a personality.')
    }
  }

  const handleAlbumNumber = e => {
    console.log(typeof e.value)
    if (typeof e.value == 'number') {
      setAlbumNumber(e.value);
    }
  }

  const handleSongGuess = e => {
    setSongGuess(e.target.value)
  }

  const handleSongSubmit = e => {
    e.preventDefault();
    setSongGuessFinal(songGuess);
    setSongGuess('')
  }

  const handleGameOver = e => {
    setUserMessage();
    setLyrics()
    setPlaying(false);
  }

  const handleGameStart = e => {
    setNumberCorrect(0);
    setMessage('');
    setPlaying(true);
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
        <form onSubmit={handleSongSubmit}>
          <input value={songGuess} onChange={handleSongGuess} onFocus={(e) => e.target.placeholder = ""} 
          onBlur={(e) => e.target.placeholder = "Enter Song Name Here"} placeholder='Enter Song Name Here'
          type='text' required></input>
          <button>Submit</button>
        </form>
        <button onClick={handleGameOver}>End Game</button>
        <button onClick={handleGameStart}>Play Again</button>
        {'' + numberCorrect}
        <h2>
          {message}
        </h2>
        <h3>
          {lyrics}
        </h3>
      </div>
  );
}

export default App;
