import React, { useState } from 'react';
import './App.css';
import LyricGame from './components/LyricGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lyric Match</h1>
        <p>Guess the song title based on the lyrics!</p>
      </header>
      <main>
        <LyricGame />
      </main>
    </div>
  );
}

export default App;