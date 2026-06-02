import os
import json
from langchain_groq import ChatGroq
from pathlib import Path
from dotenv import load_dotenv

# Ensure .env loads properly from root level
base_dir = Path(__file__).resolve().parent.parent.parent
load_dotenv(dotenv_path=base_dir / ".env")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.1,
    groq_api_key=os.getenv("GROQ_API_KEY")
)

def find_gaps(state: dict) -> dict:
    parsed_resume = state["parsed_resume"]
    parsed_job = state["parsed_job"]

    prompt = f"""
You are a career coach comparing a candidate's resume against a job description.

Resume data:
{json.dumps(parsed_resume, indent=2)}

Job data:
{json.dumps(parsed_job, indent=2)}

Return ONLY a JSON object with exactly these keys:
- matching_skills: list of skills the candidate HAS that the job requires
- missing_skills: list of skills the job requires that the candidate LACKS
- missing_keywords: list of keywords from the job that are absent from the resume
- overqualified_areas: list of areas where candidate exceeds requirements
- experience_gap: integer, how many years short the candidate is (0 if meets requirement)
- overall_match: one of "strong", "moderate", "weak"
- verdict: one sentence honest summary of fit

Return only valid JSON. No explanation, no markdown, no backticks.
"""

    response = llm.invoke(prompt)

    try:
        parsed = json.loads(response.content)
    except json.JSONDecodeError:
        parsed = {
            "matching_skills": [],
            "missing_skills": [],
            "missing_keywords": [],
            "overqualified_areas": [],
            "experience_gap": 0,
            "overall_match": "moderate",
            "verdict": "Could not analyze gap"
        }

    state["gap_analysis"] = parsed
    return state
