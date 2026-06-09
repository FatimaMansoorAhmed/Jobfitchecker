import os
import json
from langchain_groq import ChatGroq
from pathlib import Path
from dotenv import load_dotenv

# Path handling for root .env
base_dir = Path(__file__).resolve().parent.parent.parent
load_dotenv(dotenv_path=base_dir / ".env")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.1,
    groq_api_key=os.getenv("GROQ_API_KEY")
)


def score_resume(state: dict) -> dict:
    parsed_resume = state["parsed_resume"]
    parsed_job = state["parsed_job"]
    gap_analysis = state["gap_analysis"]

    prompt = f"""
You are a hiring manager scoring how well a candidate fits a job.

Resume data:
{json.dumps(parsed_resume, indent=2)}

Job data:
{json.dumps(parsed_job, indent=2)}

Gap analysis:
{json.dumps(gap_analysis, indent=2)}

Score the candidate across 4 categories, each out of 100.
Be honest and strict — a fresh grad with no experience should not score 90.

Return ONLY a JSON object with exactly these keys:
- skills_score: integer 0-100, how many required skills they have
- keywords_score: integer 0-100, how well resume keywords match job keywords
- experience_score: integer 0-100, based on experience gap and seniority fit
- overall_score: integer 0-100, weighted average (skills 40%, keywords 30%, experience 30%)
- grade: one of "A", "B", "C", "D", "F"
- one_liner: one punchy sentence summarizing the score

Return only valid JSON. No explanation, no markdown, no backticks.
"""

    response = llm.invoke(prompt)

    try:
        parsed = json.loads(response.content)
    except json.JSONDecodeError:
        parsed = {
            "skills_score": 0,
            "keywords_score": 0,
            "experience_score": 0,
            "overall_score": 0,
            "grade": "F",
            "one_liner": "Could not score resume"
        }

    state["score"] = parsed
    return state