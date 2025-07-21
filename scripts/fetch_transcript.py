from youtube_transcript_api import YouTubeTranscriptApi

video_id = "https://youtu.be/0iRbD5rM5qc?feature=shared"
try:
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
except AttributeError:
    transcript = YouTubeTranscriptApi().get_transcript(video_id)

for entry in transcript:
    print(entry['text'])