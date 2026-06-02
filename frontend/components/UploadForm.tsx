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
  <div className="bg-[#151d30] rounded-xl p-6 mb-6 border border-[#222f4c] shadow-xl">

    {/* Resume Upload Input */}
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Resume (PDF)</label>
      <label className="flex items-center gap-3 border border-dashed border-[#222f4c] bg-[#0b0f19] rounded-xl p-4 cursor-pointer hover:border-[#64748b] transition-colors group">
        <Upload size={18} className="text-[#64748b] group-hover:text-[#f8fafc] transition-colors" />
        <span className="text-[#64748b] group-hover:text-[#f8fafc] text-sm transition-colors">
          {resume ? resume.name : "Click to upload your resume"}
        </span>
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
        />
      </label>
    </div>

    {/* Job Posting URL Input */}
    <div className="mb-6">
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b] mb-2">Job posting URL</label>
      <div className="flex items-center gap-2 bg-[#0b0f19] rounded-xl px-4 py-3.5 border border-[#222f4c] focus-within:border-[#64748b] transition-colors">
        <Link size={16} className="text-[#64748b] shrink-0" />
        <input
          type="text"
          placeholder="https://rozee.pk/job/..."
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          className="bg-transparent text-[#f8fafc] text-sm w-full outline-none placeholder-[#334155]"
        />
      </div>
    </div>

    {/* High-Contrast Theme Button */}
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="w-full bg-[#f8fafc] hover:bg-white text-[#0b0f19] font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:bg-[#222f4c] disabled:text-[#64748b] disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
    >
      {loading ? (
        "Analyzing..."
      ) : (
        <>
          Analyze <span className="text-sm font-normal">→</span>
        </>
      )}
    </button>

  </div>
);}