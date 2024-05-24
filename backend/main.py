import nltk
from nltk import word_tokenize
from flask import request, jsonify, Flask, render_template
from flask_cors import CORS
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import re


app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def userInput():
    data = request.get_json()
    text = data.get('text', '')
    
    if len(text) > 300:
        return jsonify({'label': 'Error: Input exceeds limit of 300 characters', 'input': text}), 400
    
    if not re.search(r'[a-zA-Z]', text):
        return jsonify({'label': 'Error: Input must contain at least one letter', 'input': text}), 400
        
    
    nltk.download('vader_lexicon')
    nltk.download('punkt')
    
    tokens = word_tokenize(text)
    
    num_tokens = len(tokens)
    tokenized_text = ' '.join(tokens)
    
    sid = SentimentIntensityAnalyzer()
    score = ((sid.polarity_scores(str(tokenized_text))))['compound']
    
    if(score > 0):
        label = 'The text was analyzed to have positive sentiments 😃'
    elif(score == 0):
        label = 'The text was analyzed to have neutral sentiments 😶'
    else:
        label = 'The text was analyzed to have negative sentiments ☹️'
    return jsonify({'label': f'{label} \n \n'
                    f'Additional Information: \n'
                    f'Number of Tokens: {num_tokens} \n'                    
                    f'Polarity Score: {score}'
                    })

if __name__ == "__main__":
    #app.run(port='8088', threaded=False, debug=True)
    app.run(debug=True)