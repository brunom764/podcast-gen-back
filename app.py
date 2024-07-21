from flask import Flask, request, jsonify
from GoogleNews import GoogleNews
import pandas as pd
from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
import re
from openai import OpenAI
from google.cloud import texttospeech
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')
google_credentials_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = google_credentials_path

def get_google_news(categoria):
    googlenews = GoogleNews(lang='pt')
    googlenews.search(categoria)
    result = googlenews.result()

    df = pd.DataFrame(result)

    def convert_to_ymd(date_str):
        date_str = str(date_str).strip()
        if any(char.isdigit() for char in date_str):
            if 'ago' in date_str:
                days = int(date_str.split()[0])
                return (datetime.now() - timedelta(days=days)).strftime('%Y-%m-%d')
            try:
                date_obj = datetime.strptime(date_str, '%b %d, %Y')
                return date_obj.strftime('%Y-%m-%d')
            except ValueError:
                pass
            try:
                date_obj = datetime.strptime(date_str, '%b %d')
                current_year = datetime.now().year
                return date_obj.replace(year=current_year).strftime('%Y-%m-%d')
            except ValueError:
                pass
        return None

    df['date'] = df['date'].apply(convert_to_ymd)
    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    df_sorted = df.sort_values(by='date', ascending=False)

    return df_sorted

def clean_url(url):
    cleaned_url = re.sub(r'&ved=.*?&', '&', url)
    cleaned_url = re.sub(r'&usg=.*', '', cleaned_url)
    cleaned_url = re.sub(r'&ved=.*', '', cleaned_url)
    if cleaned_url.endswith('&'):
        cleaned_url = cleaned_url[:-1]
    return cleaned_url

def get_article(url_link):
    url = clean_url(url_link)
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        article_text = ' '.join([p.get_text() for p in soup.find_all('p')])
        return article_text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

def fetch_article_content(link_list, num_articles=5):
    articles = []
    for index, row in link_list.head(num_articles).iterrows():
        url = row['link']
        article_content = get_article(url)
        articles.append(article_content)
    return articles

def generate_prompt(prompt, title, text):
    if text is None or len(text) < 100 or len(title) < 10:
        return prompt
    if len(prompt) > 88:
        prompt += ', '
    return f'{prompt}Título: {title}, Texto: {text}'

def interact_with_AI(prompt, engine="text-davinci-003", max_tokens=150):
    client = OpenAI(api_key=os.getenv(openai_api_key))
    response = client.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=0
    )
    return response.choices[0].message['content']

def synthesize_text_to_speech(text):
    client = texttospeech.TextToSpeechClient()
    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="pt-BR",
        name="pt-BR-Wavenet-B",
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_filename = f"output_{timestamp}.mp3"
    with open(output_filename, "wb") as out:
        out.write(response.audio_content)
    return output_filename

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    categoria = data.get('categoria')

    if not categoria:
        return jsonify({"error": "Categoria não fornecida"}), 400

    df_sorted = get_google_news(categoria)
    most_recent_news = fetch_article_content(df_sorted, num_articles=5)

    article_output = []
    for item in range(5):
        article_output.append({'title': df_sorted['title'].iloc[item], 'text': most_recent_news[item]})

    prompt = 'Filter pertinent information and generate a summary in paragraph format in Brazilian Portuguese for the following news. Remember to consider all of them in the summary and that each news has the format "Title: " and "Text": '
    for article in article_output:
        prompt = generate_prompt(prompt, **article)

    response_text = interact_with_AI(prompt)
    audio_file = synthesize_text_to_speech(response_text)

    return jsonify({"summary": response_text, "audio_file": audio_file})

if __name__ == '__main__':
    app.run(debug=True)
