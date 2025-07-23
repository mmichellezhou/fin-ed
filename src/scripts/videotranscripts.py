from youtube_transcript_api import YouTubeTranscriptApi, _errors
import requests
import time

video_ids = ["vTLDYe4mK6I"]
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
    print("Combined transcript length:", len(combined_transcript_text))
    
    chunk_size = 250
    num_chunks = (len(combined_transcript_text) + chunk_size - 1) // chunk_size

    for i in range(num_chunks):
        start = i * chunk_size
        end = start + chunk_size
        short_transcript = combined_transcript_text[start:end]
        print(f"\n--- Chunk {i+1} (chars {start}-{end}) ---")
        print(short_transcript[:200])

        prompt = (
            "Based on the transcript below, create 1 short multiple-choice question about financial literacy.\n\n"
            "Format:\nQuestion: [Your question here]\nA.\nB.\nC.\nD.\nCorrect Answer: B\n\n"
            "Transcript:\n" + short_transcript
        )

        print("Sending request to backend...")
        try:
            response = requests.post(
                "http://127.0.0.1:8000/generate-quiz",
                json={"transcript": prompt},
                timeout=120
            )
            quiz = response.json().get("quiz", "No quiz generated or error occurred.")
            print("Quiz response:\n", quiz)
        except Exception as e:
            print("Error:", e)
except Exception as e:
    print("Error:", e)
