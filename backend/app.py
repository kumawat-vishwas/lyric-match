from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from services.lyric_service import generate_lyric_snippet, check_user_guess

load_dotenv()

import os

app = Flask(__name__)
CORS(app) 

@app.route('/api/lyrics', methods=['GET'])
def get_lyric_snippet():
    try:
        result = generate_lyric_snippet()
        return jsonify(result)
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Something went wrong!',
            'error': str(e) 
        }), 500

@app.route('/api/check', methods=['POST'])
def check_answer():
    try:
        data = request.get_json()
        if not data or 'guess' not in data or 'correctTitle' not in data:
            return jsonify({
                'success': False,
                'message': 'Missing required fields'
            }), 400
        
        result = check_user_guess(data['guess'], data['correctTitle'])
        return jsonify(result)
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Something went wrong!',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT'))
    app.run(host='0.0.0.0', port=port, debug=os.environ.get('FLASK_ENV') == 'development')