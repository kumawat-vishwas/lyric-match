import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LyricGame.css';

const API_BASE_URL = 'http://localhost:5000/api';

const LyricGame = () => {
  const [lyricSnippet, setLyricSnippet] = useState('');
  const [correctTitle, setCorrectTitle] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [gameResult, setGameResult] = useState(null);
  const [error, setError] = useState('');

  const fetchLyricSnippet = async () => {
    try {
      setError('');
      setGameResult(null);
      setUserGuess('');
      
      const response = await axios.get(`${API_BASE_URL}/lyrics`);
      
      if (response.data.success) {
        setLyricSnippet(response.data.data.lyricSnippet);
        setCorrectTitle(response.data.data.correctTitle);
      } else {
        setError('Failed to fetch lyric snippet');
      }
    } catch (err) {
      setError('Error connecting to the server. Please try again.');
      console.error('Error fetching lyric snippet:', err);
    } 
  };

  const checkAnswer = async () => {
    if (!userGuess.trim()) {
      setError('Please enter your guess first');
      return;
    }

    try {
      setError('');
      
      const response = await axios.post(`${API_BASE_URL}/check`, {
        guess: userGuess,
        correctTitle: correctTitle
      });
      
      if (response.data.success) {
        const result = response.data.data;
        setGameResult(result);

      } else {
        setError('Failed to check answer');
      }
    } catch (err) {
      setError('Error connecting to the server. Please try again.');
      console.error('Error checking answer:', err);
    } 
  };

  useEffect(() => {
    fetchLyricSnippet();
  }, []);


  return (
    <div className="lyric-game">
      <div className="lyric-container">
        {!lyricSnippet ? (
          <div className="loading">Loading lyrics...</div>
        ) : (
          <>
            {lyricSnippet ? (
              <div className="lyric-snippet">
                <h3>Here's the lyrics</h3>
                <div className="lyrics">
                  <blockquote>{lyricSnippet}</blockquote>
                </div>
              </div>
            ) : (
              <div className="no-lyrics">
                Press the "Generate Lyrics" button to start the game
              </div>
            )}
          </>
        )}
      </div>

      <div className="guess-container">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Enter song title"
          disabled={!lyricSnippet || gameResult}
          className="guess-input"
        />
        <button 
          onClick={checkAnswer} 
          disabled={!lyricSnippet || !userGuess || gameResult}
          className="check-button"
        >
          Check Answer
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {gameResult && (
        <div className={`result ${gameResult.isCorrect ? 'correct' : 'incorrect'}`}>
          {gameResult.isCorrect ? (
            <div className="correct-answer">
              <h3>Correct! </h3>
              <p>Well done, you got it right!</p>
            </div>
          ) : (
            <div className="incorrect-answer">
              <h3>Incorrect Guess</h3>
              <p>The correct song title is: <strong>{gameResult.correctTitle}</strong></p>
            </div>
          )}
          <button onClick={fetchLyricSnippet} className="next-button">
            Next Song
          </button>
        </div>
      )}

      {!gameResult && (
        <div className="new-lyrics-container">
          <button 
            onClick={fetchLyricSnippet} 
            className="generate-button"
          >
            {lyricSnippet ? 'Get New Lyrics' : 'Generate Lyrics'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LyricGame;
