import re

def extract_video_id(url: str) -> str:
    """
    Extracts the YouTube video ID from a standard or shortened YouTube URL.
    Returns the video ID as a string, or None if not found.
    """
    # Standard URL
    match = re.search(r"(?:v=|/embed/|/v/|youtu\.be/|/shorts/)([\w-]{11})", url)
    if match:
        return match.group(1)
    return None

if __name__ == "__main__":
    test_urls = [
        "https://www.youtube.com/watch?v=0iRbD5rM5qc",
        "https://youtu.be/0iRbD5rM5qc",
        "https://www.youtube.com/embed/0iRbD5rM5qc",
        "https://www.youtube.com/shorts/0iRbD5rM5qc",
        "https://www.youtube.com/v/0iRbD5rM5qc",
    ]
    for url in test_urls:
        print(f"URL: {url} -> Video ID: {extract_video_id(url)}") 