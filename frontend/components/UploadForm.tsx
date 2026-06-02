"use client";
import { useState } from "react";
import { Upload, Link } from "lucide-react";

interface Props {
  onAnalyze: (resume: File, jobUrl: string) => void;
  loading: boolean;
}

export default function UploadForm({ onAnalyze, loading }: Props) {
  const [resume, setResume] = useState<File | null>(null);
  const [jobUrl, setJobUrl] = useState("");

  const handleSubmit = () => {
    if (!resume || !jobUrl) return alert("Please upload a resume and paste a job URL.");
    onAnalyze(resume, jobUrl);
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

          <span className="text-gray-500 text-xs mt-1">
            PDF files only
          </span>
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
    <div className="mb-8">

      <label className="block text-sm text-gray-500 uppercase tracking-wide mb-3">
        Job Posting URL
      </label>

      <div className="flex items-center gap-3 bg-black rounded-2xl px-5 py-4 border border-[#2a2a2a] focus-within:border-white/30 transition-all duration-300">

        <Link
          size={18}
          className="text-gray-400 shrink-0"
        />

        <input
          type="text"
          placeholder="https://rozee.pk/job/..."
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-600"
        />

      </div>

    </div>

    {/* Submit Button */}
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full bg-white hover:bg-gray-200 disabled:bg-[#222222] disabled:text-gray-500 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-2xl transition-all duration-300"
    >
      {loading ? "Analyzing..." : "Analyze Resume →"}
    </button>

  </div>
);}