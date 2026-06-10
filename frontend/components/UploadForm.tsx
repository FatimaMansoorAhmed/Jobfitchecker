"use client";
import { useState } from "react";
import { Upload, Briefcase } from "lucide-react";

interface Props {
  onAnalyze: (resume: File, jobUrl: string, jobText?: string) => void;
  loading: boolean;
}

export default function UploadForm({ onAnalyze, loading }: Props) {
  const [resume, setResume] = useState<File | null>(null);
  const [jobInput, setJobInput] = useState("");

  const handleSubmit = () => {
    if (!resume) return alert("Please upload a resume.");
    
    const trimmedInput = jobInput.trim();
    if (!trimmedInput) return alert("Please provide a LinkedIn URL or paste a job description.");

    // Check agar input URL hai (starts with http:// or https://)
    const isUrl = /^https?:\/\//i.test(trimmedInput);

    if (isUrl) {
      // Agar URL hai tou jobUrl field me bhejdo
      onAnalyze(resume, trimmedInput, "");
    } else {
      // Agar text (JD) hai tou placeholder URL aur jobText me actual text bhejdo
      onAnalyze(resume, "https://placeholder.com", trimmedInput);
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

      {/* Single Unified Input Field */}
      <div className="mb-4">
        <label className="block text-sm text-gray-500 uppercase tracking-wide mb-3">
          Job Link or Description
        </label>
        <div className="flex gap-3 bg-black rounded-2xl px-5 py-4 border border-[#2a2a2a] focus-within:border-white/30 transition-all duration-300">
          <Briefcase size={18} className="text-gray-400 shrink-0 mt-1" />
          <textarea
            placeholder="Paste LinkedIn job URL OR paste the full job description text here..."
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            rows={4}
            className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-600 resize-y min-h-[60px]"
          />
        </div>
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