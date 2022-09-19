import React from 'react';
import './App.css';
import axios from 'axios';

// Accesses REST API to pull random Taylor Swift lyric
function getLyric(album) {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5002/lyrics').then((response) => {
      resolve(response.data);
    });
});
}


function App() {
  var lyric = getLyric('Fearless (Taylor\'s Version)')
  console.log(lyric)

  return (
      <div className='App'>
        <div className='Title'>
          Swiftinator
        </div>
      </div>
  );
}

export default App;
