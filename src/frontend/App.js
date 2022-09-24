import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Tayye from './Tayye.jpg';
import Select from 'react-select';

function App() {
  
  // Store lyrics and actual song name
  var [songName, setSongName] = useState();
  var [lyrics, setLyrics] = useState('Pick an album bozo. Don\'t select 1989 -- the API is glitching.');

  // Change album number based on what album the user selects
  var [albumNumber, setAlbumNumber] = useState();

  // Hooks to check if user guess was correct, track data for final statistics
  var [songGuess, setSongGuess] = useState('')
  var [songGuessFinal, setSongGuessFinal] = useState('')
  var [totalGuess, setTotalGuess] = useState(0)
  var [numberCorrect, setNumberCorrect] = useState(0)

  // Set up hook to customize message for user when game ends
  var [message, setMessage] = useState()

  // Allows user to play again
  var [playing, setPlaying] = useState(true);

  // Get lyrics and song name every time the album is changed or the user submits a guess
  useEffect(() => {
      async function fetchLyrics() {
        console.log(albumNumber)
        try {
          const response = await fetch(`http://localhost:5002/lyrics/${albumNumber}`);
          const songAndLyric = await response.json();
          setSongName(songAndLyric[0]);
          setLyrics(songAndLyric[1]);
          return songAndLyric;
        } catch (error) {
          console.log(error)
        }
      }
      if (playing === true) {
          fetchLyrics();
      }
  }, [albumNumber, songGuessFinal]);


  // Every time submit is clicked, check if the user guess is the same as the actual song name
  // If so, increment number of guesses correct by 1. Total number of guesses is always incremented upon submission
  useEffect(() => {
    if (playing === true) {
      if (songGuessFinal !== undefined && songName !== undefined && songGuessFinal !== '' && songName !== '') {
        setTotalGuess(totalGuess + 1);
        if (songGuessFinal.trim().toLowerCase() === songName.trim().toLowerCase()) {
          setNumberCorrect(numberCorrect + 1);
        }
      }
    }
  }, [songGuessFinal])

  // Album list for the select drop down
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

  // Hate machine designed to roast the user, displays statistics
  function setUserMessage() {
    // If they get 100%
    if (numberCorrect === totalGuess) {
      setMessage(`You got ${numberCorrect} out of ${totalGuess} songs correct. Either you're cheating or you really need to get a job.`)
    }
    // If they get above or equal to 67% but not 100%
    else if (numberCorrect >= totalGuess * (2/3) && numberCorrect !== totalGuess) {
      setMessage(`You only got ${numberCorrect} out of ${totalGuess} songs correct. Try harder next time bud.`)
    }
    // If they get less than 67% correct but more than or equal to 60%
    else if (numberCorrect < totalGuess * (2/3) && numberCorrect >= totalGuess * (3/5)) {
      setMessage(`Even saying your score is painful. You got ${numberCorrect} out of ${totalGuess} songs correct. You're not even at a C, just say you hate Taylor Swift already.`)
    }
    // If they get below 60% but more than or equal to 50%
    else if (numberCorrect < totalGuess * (3/5) && numberCorrect >= totalGuess * (1/2)) {
      setMessage(`With just ${numberCorrect} out of ${totalGuess} songs correct, I have to ask: were you even trying? You're an embarassment.`)
    }
    // If they get below 50% correct 
    else {
      setMessage(`I guess you were proving how poor your memory could be by getting ${numberCorrect} out of ${totalGuess} songs correct. Stop stannning Kanye and go find yourself a personality.`)
    }
  }

  // Handler to record and incorporate new album selections
  const handleAlbumNumber = e => {
    if (typeof e.value == 'number') {
      console.log(e.value)
      setAlbumNumber(e.value.toString());
    }
  }

  // Stores what the user is typing for handleSongSubmit
  const handleSongGuess = e => {
    setSongGuess(e.target.value)
  }

  // Records user guess
  const handleSongSubmit = e => {
    e.preventDefault();
    setSongGuessFinal(songGuess);
    setSongGuess('')
  }

  // When the user ends the game, prints statistics and message
  const handleGameOver = e => {
    setUserMessage();
    setLyrics('IMPORTANT MESSAGE BELOW')
    setPlaying(false);
  }

  // Allows user to play again, give API warning message
  const handleGameStart = e => {
    setNumberCorrect(0);
    setLyrics('Pick an album bozo. Don\'t select 1989 -- the API is glitching.')
    setMessage();
    setPlaying(true);
    setTotalGuess(0)
  }

  return (
      <div className='App'>
        <div className='Title'>
          SWIFTOMETER
        </div>
        <div className='Description'>Exposing Kanye Stans since 2022</div>
        <img alt='Tayye' src={Tayye}></img>
        <div className='Selector'>
          <Select options={albumsList} onChange={handleAlbumNumber} placeholder='Select album'/>
        </div>
        <div className='Lyric'>
          {'Lyric: ' + lyrics}
        </div>
        <form onSubmit={handleSongSubmit}>
          <input className='Field' value={songGuess} onChange={handleSongGuess} onFocus={(e) => e.target.placeholder = ""} 
          onBlur={(e) => e.target.placeholder = "Enter Song Name Here"} placeholder='Enter Song Name Here'
          type='text' required></input>
          <button className='Submit'>SUBMIT</button>
        </form>
        <div className='Description'>
          {'Correct Guesses: ' + numberCorrect}
        </div>
        <button className='Button' onClick={handleGameOver}>End Game</button>
        <button className='Button' onClick={handleGameStart}>Play Again</button>
        <div className='Description'>
          {message}
        </div>
      </div>
  );
}

export default App;
