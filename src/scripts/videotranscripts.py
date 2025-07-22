from youtube_transcript_api import YouTubeTranscriptApi
import requests

video_ids = ["WRcgRimBac8"]
api = YouTubeTranscriptApi()

# Fetch and combine transcripts from both videos
transcript_texts = []
for video_id in video_ids:
    transcript = api.fetch(video_id)
    transcript_texts.append(" ".join([entry.text for entry in transcript]))

combined_transcript_text = " ".join(transcript_texts)
prompt = (
    "You are an AI quiz generator. Based on the transcript below, create 7 short multiple-choice questions about financial literacy.\n\n"
    "For each question:\n"
    "Example format, fill out the question and answer choices for 7 question:\n"
    "Question 1: [Your question here]\n"
    "A.\n"
    "B. n"
    "C. \n"
    "D. \n"
    "Correct Answer: B\n\n"
    "Transcript:\n" + combined_transcript_text
)


response = requests.post(
    "http://127.0.0.1:8000/generate-quiz",
    json={"transcript": prompt}
)

quiz = response.json().get("quiz", "No quiz generated or error occurred.")
print(quiz)
