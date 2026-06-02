"use client";
import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import ScoreCard from "@/components/ScoreCard";
import AgentTrace from "@/components/AgentTrace";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const handleAnalyze = async (resume: File, jobUrl: string) => {
    setLoading(true);
    setResult(null);
    setSteps([]);

    // 1. Create FormData matching your FastAPI parameters exactly
    const formData = new FormData();
    formData.append("resume", resume); // Matches the 'resume' field name expected by your FastAPI route
    formData.append("job_url", jobUrl); // Matches the 'job_url' parameter

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
      alert("Could not connect to the backend scanner. Verify Docker containers are active on port 8000.");
    } finally {
      setLoading(false);
    }
  };return (
  <main className="min-h-screen bg-[#0b0f19] text-[#f8fafc] px-4 py-12">
    <div className="mt-8 max-w-xl mx-auto text-left relative bg-[#151d30] border border-[#222f4c] rounded-xl p-6 shadow-xl">
      {/* Tailwind v4 linear gradient syntax */}
      <div className="absolute left-0 top-0 w-1 h-full bg-linear-to-b from-[#222f4c] to-transparent rounded-l-xl"></div>

      <div className="pl-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-[#64748b] rounded-full animate-pulse"></span>
          <p className="text-xs text-[#64748b] font-semibold tracking-wider uppercase">
            Why JobFitCheck exists
          </p>
        </div>

        <p className="text-[#64748b] mt-3 leading-relaxed text-sm">
          This tool gives you an instant match score so you can improve your resume
          before applying instead of guessing afterward.
        </p>
      </div>
    </div>
  </main>
);}