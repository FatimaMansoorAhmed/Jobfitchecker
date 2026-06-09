from langgraph.graph import StateGraph, END
from typing import TypedDict, Any
from agents.parser import parse_resume
from agents.job_analyzer import analyze_job
from agents.gap_finder import find_gaps
from agents.scorer import score_resume
from agents.coach import coach_resume


class AgentState(TypedDict):
    resume_text: str
    job_url: str
    job_text: str          # ← this
    parsed_resume: Any
    parsed_job: Any
    gap_analysis: Any
    score: Any
    coaching: Any


def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("parser", parse_resume)
    graph.add_node("job_analyzer", analyze_job)
    graph.add_node("gap_finder", find_gaps)
    graph.add_node("scorer", score_resume)
    graph.add_node("coach", coach_resume)

    graph.set_entry_point("parser")
    graph.add_edge("parser", "job_analyzer")
    graph.add_edge("job_analyzer", "gap_finder")
    graph.add_edge("gap_finder", "scorer")
    graph.add_edge("scorer", "coach")
    graph.add_edge("coach", END)

    return graph.compile()


fitcheck_graph = build_graph()