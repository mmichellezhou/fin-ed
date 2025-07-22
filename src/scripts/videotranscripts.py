from youtube_transcript_api import YouTubeTranscriptApi
import requests

video_id = "0iRbD5rM5qc"
api = YouTubeTranscriptApi()
transcript = api.fetch(video_id)
transcript_text = " ".join([entry.text for entry in transcript])

prompt = (
    "Based on the following transcript, generate 5 multiple-choice questions centered on financial literacy. "
    "Each question should have 4 options and indicate the correct answer. "
    "Transcript:\n" + transcript_text
)

response = requests.post(
    "http://127.0.0.1:8000/generate-quiz",
    json={"transcript": prompt}
)

quiz = response.json().get("quiz", "No quiz generated or error occurred.")
print(quiz)

# from youtube_transcript_api import YouTubeTranscriptApi

# video_id = "0iRbD5rM5qc"

# api = YouTubeTranscriptApi()
# transcript = api.fetch(video_id)

# for entry in transcript:
#     print(f"{entry.start:.2f}s: {entry.text}")
