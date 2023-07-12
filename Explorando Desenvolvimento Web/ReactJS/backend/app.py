from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
from  youtube_transcript_api.formatters  import  JSONFormatter
from transformers import pipeline
from transformers import AutoModel
from keybert import KeyBERT
import json

app = Flask(__name__, static_folder="../frontend/build", static_url_path='')

#nossa rota
@app.route('/summary')

def topicsMain():
    url = request.args.get('url', '')
    video_id = url.split('=')[1]
    topics = get_topics(get_transcript(video_id))
    summary = topics
    summary = json.dumps(summary)
    
    return summary, 200

def get_transcript(video_id):
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=['pt', 'en'])
    transcript = ' '.join([d['text'] for d in transcript_list])

    return transcript

def get_topics(transcript):
    doc = transcript
    kw = KeyBERT()
    summary = kw.extract_keywords(doc, keyphrase_ngram_range=(4, 4))
    
    return summary


@app.route('/summ')

def summaryMain():
    url = request.args.get('url', '')
    video_id = url.split('=')[1]
    summ = get_summary(get_transcript(video_id))
    summary = summ
    summary = json.dumps(summary)
    
    return summary, 200

def get_transcript(video_id):
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=['pt', 'en'])
    transcript = ' '.join([d['text'] for d in transcript_list])

    return transcript

def get_summary(transcript):
    summariser = pipeline('summarization', model="./bart-small")
    summary = ''
    for i in range(0, (len(transcript)//1000)+1):   
        summary_text = summariser(transcript[i*1000:(i+1)*1000])[0]['summary_text'] #Under an Hour - Projects with Aryen
        summary = summary + summary_text + ' '
    return summary