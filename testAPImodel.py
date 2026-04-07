import os
from dotenv import load_dotenv  # Add this
from google import genai

# This reads the .env file and makes variables available via os.getenv
load_dotenv() 

# Get the key from the environment
api_key = os.getenv("GOOGLE_API_KEY")

# Fix the Client call by using the keyword argument 'api_key='
client = genai.Client(api_key=api_key)

for model in client.models.list():
    print(model.name)


