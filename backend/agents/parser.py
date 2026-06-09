import json
import os
from langchain_groq import ChatGroq
from pathlib import Path  # Add this import
from dotenv import load_dotenv
# Get the path to the root directory containing the .env file
base_dir = Path(__file__).resolve().parent.parent.parent
env_path = base_dir / ".env"

# Explicitly load the .env file from the root directory
load_dotenv(dotenv_path=env_path)
# Initialize the Groq LLM
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.1, # Low temperature for accurate parsing
    groq_api_key=os.getenv("GROQ_API_KEY")
)


def parse_resume(state: dict) -> dict:
    resume_text = state["resume_text"]

    prompt = f"""
You are a resume parser. Extract structured information from this resume.

Return ONLY a JSON object with exactly these keys:
- skills: list of technical skills
- experience_years: estimated total years of experience (integer)
- job_titles: list of job titles held
- education: highest education level as a string
- keywords: list of important keywords a recruiter would search for

Resume:
{resume_text}

Return only valid JSON. No explanation, no markdown, no backticks.
"""

    response = llm.invoke(prompt)
    
    try:
        parsed = json.loads(response.content)
    except json.JSONDecodeError:
        parsed = {
            "skills": [],
            "experience_years": 0,
            "job_titles": [],
            "education": "unknown",
            "keywords": []
        }

    state["parsed_resume"] = parsed
    return state