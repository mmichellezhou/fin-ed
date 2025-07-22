# uses fast api to generate quiz questions from a transcript
# uses localai to generate the quiz questions
# uses pydantic to define the request and response
# uses requests to make the api call to localai
# uses fastapi to run the api

import requests
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class TranscriptRequest(BaseModel):
    transcript: str

def generate_quiz_with_localai(transcript):
    url = "http://localhost:8080/v1/chat/completions"
    headers = {"Content-Type": "application/json"}
    data = {
    "model": "llama-pro-8b-instruct.Q4_K_M.gguf",
        "messages": [
            {
                "role": "user",
                "content": (
                    "Based on the following lesson transcript, generate 5 multiple-choice quiz questions. "
                    "Each question should have 4 options and indicate the correct answer.\nTranscript:\n" + transcript
                )
            }
        ],
        "max_tokens": 1000
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

@app.post("/generate-quiz")
def generate_quiz(req: TranscriptRequest):
    try:
        quiz = generate_quiz_with_localai(req.transcript)
        return {"quiz": quiz}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 