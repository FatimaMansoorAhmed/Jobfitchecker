import json
from utils.pdf_parser import extract_text_from_pdf
from agents.parser import parse_resume
from agents.job_analyzer import analyze_job
from agents.gap_finder import find_gaps
from agents.scorer import score_resume
from agents.coach import coach_resume

with open("FatimaResume_.pdf", "rb") as f:
    file_bytes = f.read()

text = extract_text_from_pdf(file_bytes)
state = {"resume_text": text}

state = parse_resume(state)
print("✅ Node 1 — Resume parsed")

state["job_url"] = "https://www.linkedin.com/jobs/view/4414202883"
state = analyze_job(state)
print("✅ Node 2 — Job analyzed")

state = find_gaps(state)
print("✅ Node 3 — Gaps found")

state = score_resume(state)
print("✅ Node 4 — Score generated")

state = coach_resume(state)
print("✅ Node 5 — Coaching done")

print("\n======= FINAL REPORT =======")
print(f"\nJob: {state['parsed_job']['job_title']}")
print(f"Overall Score: {state['score']['overall_score']}/100 — Grade {state['score']['grade']}")
print(f"Verdict: {state['score']['one_liner']}")
print(f"\nMatching skills: {state['gap_analysis']['matching_skills']}")
print(f"Missing skills: {state['gap_analysis']['missing_skills']}")
print(f"\nQuick wins:")
for win in state['coaching']['quick_wins']:
    print(f"  → {win}")
print(f"\nRewritten summary:")
print(f"  {state['coaching']['rewritten_summary']}")
print(f"\nHonest advice:")
print(f"  {state['coaching']['honest_advice']}")