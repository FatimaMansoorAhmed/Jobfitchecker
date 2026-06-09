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
  const [showPaste, setShowPaste] = useState(false);

  const isLinkedIn = jobUrl.includes("linkedin.com");

  const handleUrlChange = (val: string) => {
    setJobUrl(val);
    if (val.length > 10 && !val.includes("linkedin.com")) {
      setShowPaste(true);
    } else {
      setShowPaste(false);
      setJobText("");
    }
  };

  const handleSubmit = () => {
    if (!resume) return alert("Please upload a resume.");
    if (!jobUrl) return alert("Please provide a job posting URL.");
    if (!isLinkedIn && !jobText.trim()) return alert("Please paste the job description for non-LinkedIn links.");
    onAnalyze(resume, jobUrl, jobText);
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

      {/* Job URL */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 uppercase tracking-wide mb-3">
          Job Posting URL
        </label>
        <div className="flex items-center gap-3 bg-black rounded-2xl px-5 py-4 border border-[#2a2a2a] focus-within:border-white/30 transition-all duration-300">
          <Link size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="https://linkedin.com/jobs/... or any job URL"
            value={jobUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-600"
          />
        </div>

        {/* URL hint */}
        {jobUrl.length > 10 && (
          <p className="text-xs mt-2 ml-1">
            {isLinkedIn ? (
              <span className="text-green-500">✓ LinkedIn detected — will analyze automatically</span>
            ) : (
              <span className="text-yellow-500">⚠ Non-LinkedIn URL — paste the job description below</span>
            )}
          </p>
        )}
      </div>

      {/* Paste box — only for non-LinkedIn */}
      {showPaste && (
        <div className="mb-6">
          <label className="block text-sm text-gray-500 uppercase tracking-wide mb-3">
            Job Description <span className="text-yellow-500 normal-case">(paste for non-LinkedIn)</span>
          </label>
          <div className="bg-black rounded-2xl px-5 py-4 border border-[#2a2a2a] focus-within:border-white/30 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#1a1a1a]">
              <FileText size={16} className="text-gray-400" />
              <span className="text-gray-500 text-xs">Copy the full job description and paste it here</span>
            </div>
            <textarea
              rows={6}
              placeholder="Paste job description from Indeed, Rozee.pk, or any other platform..."
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-600 resize-none"
            />
          </div>
        </div>
      )}

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