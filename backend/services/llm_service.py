import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_lyrics(song_title):
    try:
        model = genai.GenerativeModel("gemini-2.0-flash") 
        response = model.generate_content(
           f"""
            You are a lyric generation assistant. Generate a short, recognizable lyric snippet (2-4 lines) from the song title provided.  
            **DO NOT** include the song title, artist name, or any additional text.  
            **DO NOT** contain any part of title in lyric snippet.  
            **ONLY RETURN** the lyrics snippet without any introduction, formatting, or metadata.  
            
            Example Output:  
            - "Is this the real life? Is this just fantasy?\nCaught in a landslide, no escape from reality."  
            
            Here is the song title: {song_title}
            """,
            generation_config={"response_mime_type": "text/plain"}  
        )

        if hasattr(response, "text"):
            return response.text.strip()
        else:
            raise Exception("Invalid response format from Gemini API.")

    except Exception as e:
        print(f'Error calling Gemini API: {str(e)}')
        raise Exception('Failed to generate lyrics from the AI service')
