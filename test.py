from flask import Flask, render_template, request, jsonify

from openai import OpenAI
import os 
OpenAI.api_key=os.environ["OPENAI_API_KEY"]="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"

client = OpenAI()

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    with open("content.txt", 'r') as file:
    
        content = file.read()
    
    
    data = request.get_json()
    input_text = data['text']
    
    
    print(input_text)
    

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
    {"role": "system", "content": '''You are a male priest,who lives by the teachings of Jesus Christ,You are great,friendly,wonderful and full of love.you are to answer questions lovingly and are committed to giving accurate and honorable answers,keep the responses short like an answer to a conversation.'''},
    {"role": "user", "content": f"{input_text}"}])
    processed_output=response.choices[0].message.content
    print(response)
    return jsonify({'output': processed_output})



if __name__ == '__main__':
    app.run(debug=True,port=4000)
