from youtube_transcript_api import YouTubeTranscriptApi, _errors
import requests

video_ids = ["uDz023pfmhY", "Cox8rLXYAGQ"]
api = YouTubeTranscriptApi()

try:
    print("Fetching transcripts...")
    transcript_texts = []
    for video_id in video_ids:
        try:
            transcript = api.fetch(video_id)
            print(f"Transcript for {video_id}:", transcript)
            transcript_texts.append(" ".join([entry.text for entry in transcript]))
        except _errors.VideoUnavailable:
            print(f"Transcript not available for video: {video_id}")
            continue

    combined_transcript_text = " ".join(transcript_texts)
    print("Combined transcript:", combined_transcript_text[:200])  # Print first 200 chars
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
    print("Prompt:", prompt[:200])  # Print first 200 chars

    print("Sending request to backend...")
    response = requests.post(
        "http://127.0.0.1:8000/generate-quiz",
        json={"transcript": prompt}
    )
    print("Raw response:", response.text)
    quiz = response.json().get("quiz", "No quiz generated or error occurred.")
    print(quiz)

except Exception as e:
    print("Error:", e)
