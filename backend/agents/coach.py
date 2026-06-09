import os
import json
from langchain_groq import ChatGroq
from pathlib import Path
from dotenv import load_dotenv

# Path handling for root .env
base_dir = Path(__file__).resolve().parent.parent.parent
load_dotenv(dotenv_path=base_dir / ".env")

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.3, # Slightly higher temperature for creative rewriting suggestions
    groq_api_key=os.getenv("GROQ_API_KEY")
)

def coach_resume(state: dict) -> dict:
    parsed_resume = state["parsed_resume"]
    parsed_job = state["parsed_job"]
    gap_analysis = state["gap_analysis"]
    score = state["score"]

    prompt = f"""
You are an expert career coach helping a candidate improve their resume for a specific job.

Resume data:
{json.dumps(parsed_resume, indent=2)}

Job data:
{json.dumps(parsed_job, indent=2)}

Gap analysis:
{json.dumps(gap_analysis, indent=2)}

Score:
{json.dumps(score, indent=2)}

Return ONLY a JSON object with exactly these keys:
- quick_wins: list of 3 things the candidate can add or change immediately to improve their score
- rewritten_summary: a rewritten professional summary tailored to this specific job (2-3 sentences)
- keywords_to_add: list of exact keywords from the job they should naturally insert into their resume
- skills_to_highlight: list of skills they already have that they should push to the top of their resume for this role
- honest_advice: one paragraph of straight honest advice — should they apply, what are their real chances, what should they do first

Return only valid JSON. No explanation, no markdown, no backticks.
"""

    response = llm.invoke(prompt)

    try:
        parsed = json.loads(response.content)
    except json.JSONDecodeError:
        parsed = {
            "quick_wins": [],
            "rewritten_summary": "",
            "keywords_to_add": [],
            "skills_to_highlight": [],
            "honest_advice": "Could not generate advice"
        }

    state["coaching"] = parsed
    return state
