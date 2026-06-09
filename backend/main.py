import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from utils.pdf_parser import extract_text_from_pdf
from graph import fitcheck_graph

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "JobFitCheck backend running ✅"}

@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_url: str = Form(...),
    job_text: str = Form("")      # ← add this
):
    file_bytes = await resume.read()
    resume_text = extract_text_from_pdf(file_bytes)

    initial_state = {
        "resume_text": resume_text,
        "job_url": job_url,
        "job_text": job_text,     # ← add this
        "parsed_resume": {},
        "parsed_job": {},
        "gap_analysis": {},
        "score": {},
        "coaching": {}
    }

    result = fitcheck_graph.invoke(initial_state)

    return {
        "job_title": result["parsed_job"]["job_title"],
        "score": result["score"],
        "gap_analysis": result["gap_analysis"],
        "coaching": result["coaching"],
        "parsed_resume": result["parsed_resume"]
    }