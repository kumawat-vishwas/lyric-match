# Lyric Match - AI-Powered Song Guessing Game

A web application where users can play a game of guessing the title of a song based on AI-generated lyric snippets.

## Features

- AI-generated lyric snippets from a database of popular songs
- User-friendly interface for guessing song titles
- Real-time feedback on user guesses

## Tech Stack

- **Frontend**: React (created with Vite)
- **Backend**: Flask
- **LLM Integration**: Google Gemini API
- **HTTP Client**: Axios

## Project Structure

```
lyric-match/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LyricGame.jsx     # Main game component
│   │   │   └── LyricGame.css     # Styling for game component
│   │   ├── App.jsx               # Main application component
│   │   ├── App.css               # Main application styling
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── package.json
│   └── README.md
├── backend/
│   ├── data/               
│   │   └── songs.py         # Songs Title List
│   ├── services/            
│   │   ├──llm_service.py    # Function which generates lyrics
│   │   └──lyric_service.py  # Basic functions like initiate generate lyrics, check user guess,etc.
│   ├── app.py               # Flask app setup, APIs,etc
│   └── requirements.txt     # Packages required to run the application
```


## Setup Instructions

### Prerequisites
- Node.js 
- npm or yarn
- Python (for backend)
- Flask (for backend)
- Google Gemini API key

### Frontend Setup

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Create a `.env` file with your Gemini API key:
   ```
   PORT=5000
   GEMINI_API_KEY=your_api_key_here
   FLASK_ENV=development
   ```
6. Start the Flask server:
   ```
   python app.py
   ```
7. The backend API will be available at `http://localhost:5000`

## How to Play

1. Click the "Generate Lyrics" button to get a lyric snippet
2. Read the lyrics and try to guess the song title
3. Enter your guess in the input field
4. Click "Check Answer" to see if you're correct
5. Click "Next Song" or "Get New Lyrics" to generate lyric snippet for next song

## API Endpoints

- `GET /api/lyrics`: Fetches a random lyric snippet and the correct song title
- `POST /api/check`: Checks if the user's guess matches the correct song title

## Development

To build for production:
```
npm run build
```
