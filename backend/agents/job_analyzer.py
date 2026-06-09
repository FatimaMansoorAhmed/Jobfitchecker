import os
import json
import requests
from bs4 import BeautifulSoup
from langchain_groq import ChatGroq
from pathlib import Path
from dotenv import load_dotenv

# Path handling to ensure .env loads correctly
base_dir = Path(__file__).resolve().parent.parent.parent
load_dotenv(dotenv_path=base_dir / ".env")

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.1,
    groq_api_key=os.getenv("GROQ_API_KEY")
)

def scrape_job(url: str) -> str:
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        for tag in soup(["script", "style", "nav", "footer", "header"]):
            tag.decompose()

        text = soup.get_text(separator="\n")
        lines = [l.strip() for l in text.splitlines() if l.strip()]
        return "\n".join(lines[:300])
    except Exception as e:
        return f"Failed to scrape: {str(e)}"

def analyze_job(state: dict) -> dict:
    # Use pasted text if provided, otherwise scrape the URL
    job_text = state.get("job_text", "").strip()
    
    if not job_text:
        job_text = scrape_job(state["job_url"])

    prompt = f"""
You are a job description analyzer. Extract structured information from this job posting.

Return ONLY a JSON object with exactly these keys:
- job_title: the role title as a string
- required_skills: list of technical skills explicitly required
- nice_to_have_skills: list of skills mentioned as a bonus
- experience_required: years of experience required (integer, 0 if not mentioned)
- keywords: list of important keywords used in the job post
- seniority: one of "junior", "mid", "senior"
- summary: one sentence describing what this role does

Job posting:
{job_text}

Return only valid JSON. No explanation, no markdown, no backticks.
"""

    response = llm.invoke(prompt)

    try:
        parsed = json.loads(response.content)
    except json.JSONDecodeError:
        parsed = {
            "job_title": "Unknown",
            "required_skills": [],
            "nice_to_have_skills": [],
            "experience_required": 0,
            "keywords": [],
            "seniority": "junior",
            "summary": "Could not parse job description"
        }

    state["parsed_job"] = parsed
    return state