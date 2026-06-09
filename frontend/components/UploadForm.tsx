"use client";
import { useState } from "react";
import { Upload, Link, FileText } from "lucide-react";

interface Props {
  onAnalyze: (resume: File, jobUrl: string, jobText?: string) => void;
  loading: boolean;
}

export default function UploadForm({ onAnalyze, loading }: Props) {
  const [resume, setResume] = useState<File | null>(null);
  const [jobUrl, setJobUrl] = useState("");
  const [jobText, setJobText] = useState("");
  const [mode, setMode] = useState<"url" | "paste">("url");

  const handleSubmit = () => {
    if (!resume) return alert("Please upload a resume.");
    if (mode === "url" && !jobUrl.trim()) return alert("Please paste a LinkedIn job URL.");
    if (mode === "paste" && !jobText.trim()) return alert("Please paste the job description.");
    
    // Key fix: only send what's relevant to the selected mode
    if (mode === "url") {
      onAnalyze(resume, jobUrl, "");
    } else {
      onAnalyze(resume, "https://placeholder.com", jobText);
    }
  };

  return (
    <div className="bg-[#111111] rounded-3xl p-8 mb-6 border border-[#2a2a2a] shadow-lg">

      {/* Resume Upload */}
      <div className="mb-6">
        <label className="block text-sm text-gray-500 uppercase tracking-wide mb-3">
          Resume (PDF)
        </label>
        <label className="flex items-center gap-4 border border-dashed border-[#2f2f2f] rounded-2xl p-5 cursor-pointer hover:border-white/30 hover:bg-[#151515] transition-all duration-300">
          <div className="bg-black border border-[#2a2a2a] rounded-xl p-3">
            <Upload size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-200 text-sm font-medium">
              {resume ? resume.name : "Click to upload your resume"}
            </span>
            <span className="text-gray-500 text-xs mt-1">PDF files only</span>
          </div>
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {/* Toggle Tabs */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 uppercase tracking-wide mb-3">
          Job Posting
        </label>
        <div className="flex bg-black rounded-2xl p-1 border border-[#2a2a2a] mb-4">
          <button
            onClick={() => { setMode("url"); setJobText(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              mode === "url"
                ? "bg-white text-black"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <Link size={15} />
            LinkedIn URL
          </button>
          <button
            onClick={() => { setMode("paste"); setJobUrl(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              mode === "paste"
                ? "bg-white text-black"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <FileText size={15} />
            Paste Job Description
          </button>
        </div>

        {/* URL Input */}
        {mode === "url" && (
          <div className="flex items-center gap-3 bg-black rounded-2xl px-5 py-4 border border-[#2a2a2a] focus-within:border-white/30 transition-all duration-300">
            <Link size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="https://linkedin.com/jobs/..."
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-600"
            />
          </div>
        )}

        {/* Paste Textarea */}
        {mode === "paste" && (
          <div className="bg-black rounded-2xl px-5 py-4 border border-[#2a2a2a] focus-within:border-white/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1a1a1a]">
              <FileText size={16} className="text-gray-400" />
              <span className="text-gray-500 text-xs">
                Paste from Indeed, Rozee.pk, or any job board
              </span>
            </div>
            <textarea
              rows={7}
              placeholder="Copy and paste the full job description here..."
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-600 resize-none"
            />
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-white hover:bg-gray-200 disabled:bg-[#222222] disabled:text-gray-500 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-2xl transition-all duration-300 mt-4"
      >
        {loading ? "Analyzing..." : "Analyze Resume →"}
      </button>

    </div>
  );
}