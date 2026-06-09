"use client";
import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import ScoreCard from "@/components/ScoreCard";
import AgentTrace from "@/components/AgentTrace";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

 const handleAnalyze = async (resume: File, jobUrl: string, jobText?: string) => {

    setLoading(true);
    setResult(null);
    setSteps([]);

    // 1. Create FormData matching your FastAPI parameters exactly
    const formData = new FormData();
    formData.append("resume", resume); // Matches the 'resume' field name expected by your FastAPI route
    formData.append("job_url", jobUrl); // Matches the 'job_url' parameter
     if (jobText) formData.append("job_text", jobText);
    // 2. Start the visual progress trace logs in the background
    const traces = [
      "Parsing your resume...",
      "Analyzing job description...",
      "Finding skill gaps...",
      "Scoring your fit...",
      "Generating coaching advice...",
    ];

    const runVisualTraces = async () => {
      for (const step of traces) {
        await new Promise((r) => setTimeout(r, 600));
        setSteps((prev) => [...prev, step]);
      }
    };
    runVisualTraces();

    // 3. Make the live API call to the exact endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${apiUrl}/analyze`, { // Fixed: Changed from /api/analyze to /analyze to match backend layout
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server returned status code ${res.status}`);
      }

      const data = await res.json();
      
      // Complete all trace updates instantly upon a successful return
      setSteps(traces);
      setResult(data);
    } catch (err) {
      console.error("Analysis Request Failed:", err);
      alert(`Analysis failed: ${err instanceof Error ? err.message : "Unknown error"}`);  
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="min-h-screen bg-slate-50 text-gray-900 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">JobFitCheck</h1>
          <p className="text-gray-600 text-lg">
            
            AI agent that scores how well your resume fits any job Using AI Agents
            Upload your resume and compare it against any job posting in under 30 seconds.
          </p>
        </div>

        <UploadForm onAnalyze={handleAnalyze} loading={loading} />

        {(loading || steps.length > 0) && (
          <AgentTrace steps={steps} loading={loading} />
        )}

        {result && <ScoreCard result={result} />}

      </div>
    </main>
  );
}