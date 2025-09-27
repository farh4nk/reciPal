# recipes/services.py
import os
import tempfile
from urllib.parse import urlparse
from typing import Dict

from django.conf import settings
import requests
import json
from yt_dlp import YoutubeDL
import json
from google import genai
import random
from dotenv import load_dotenv


urllll = "https://www.instagram.com/p/C74R_N8ptE-/?hl=en"
file_type = "mp3" 
file_path = "data/CookingAudio.mp3" #default path to save audio file


def transcribe_and_extract_recipe(url):
    """
    Sends a cooking audio or video file to Gemini Pro Vision and returns structured recipe JSON:
    - name: short recipe name
    - ingredients: list of tuples [amount, ingredient]
    - caption: short caption summarizing the recipe

    Args:
        file_path (str): Path to the audio (MP3/WAV) or video file.

    Returns:
        dict: JSON object with keys 'name', 'ingredients', and 'caption'.
    """
    load_dotenv()
    print(os.getenv("GEMINI"))
    client = genai.Client(api_key=os.getenv("GEMINI"))
    ydl_opts = { #Just mp3
        'format': 'bestaudio/best',  # get best audio stream
        'outtmpl': f'data/cooking',  # output filename set to Data Folder, default name to delete later
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',  # extract audio
            'preferredcodec': 'mp3',     # convert to mp3
            'preferredquality': '192',   # optional: audio quality
        }],
        "ffmpeg_location": "C:\\ffmpeg\\bin",
    }
    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        
    # Detect media type from extension
    media_type = "audio"

    instructions = (
        f"Listen to the {media_type} and extract a recipe. "
        "If an ingredient amount is not specified, estimate a reasonable value based on context "
        "(for example, how much butter is usually added for 3lb butter chicken). "
        "Return the result strictly as a JSON object with the following keys:\n"
        "- name: short recipe name\n"
        "- ingredients: list of tuples [amount, ingredient]\n"
        "- caption: short caption summarizing the recipe"
        "- steps: list all the steps mentioned in the recipe"
    )

    # Upload the file
    uploaded_file = client.files.upload(file=f'data/cooking.mp3')

    # Generate structured recipe JSON
    resp = client.models.generate_content(
        model="gemini-2.5-flash",  # or "gemini-2.5-pro"
        contents=[
            uploaded_file,
            instructions
        ],
        config={
            "temperature": 0,
            "response_mime_type": "application/json"  # Ensures we get JSON output
        }
    )

    try:
        # Convert the returned text into a Python dict
        recipe_json = json.loads(resp.text)
        os.remove(f'data/cooking.mp3')
    except json.JSONDecodeError:
        raise ValueError(f"Failed to parse response as JSON: {resp.text}")

    return recipe_json
