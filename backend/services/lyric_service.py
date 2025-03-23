import random
import re
from services.llm_service import generate_lyrics
from data.songs import songs

def generate_lyric_snippet():
    try:
        selected_song = random.choice(songs)
        
        lyric_snippet = generate_lyrics(selected_song)
        
        return {
            'success': True,
            'data': {
                'lyricSnippet': lyric_snippet,
                'correctTitle': selected_song,
            }
        }
    except Exception as e:
        print(f'Error generating lyric snippet: {str(e)}')
        raise Exception('Failed to generate lyric snippet')

def check_user_guess(guess, correct_title):
    try:
        normalized_guess = normalize_string(guess)
        normalized_correct = normalize_string(correct_title)
        
        is_correct = normalized_correct in normalized_guess or normalized_guess in normalized_correct
        
        return {
            'success': True,
            'data': {
                'isCorrect': is_correct,
                'correctTitle': correct_title,
            }
        }
    except Exception as e:
        print(f'Error checking guess: {str(e)}')
        raise Exception('Failed to check answer')

def normalize_string(string):
    normalized = string.lower()
    normalized = re.sub(r'[^\w\s]', '', normalized)
    normalized = re.sub(r'\s+', ' ', normalized)
    normalized = normalized.strip()
    return normalized