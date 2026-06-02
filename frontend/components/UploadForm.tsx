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

  return (<div className="bg-[#151d30] rounded-2xl p-6 mb-6 border border-[#222f4c]">

      <div className="mb-4">
        <label className="block text-sm text-[#64748b] mb-2">Resume (PDF)</label>
        <label className="flex items-center gap-3 border-2 border-dashed border-[#222f4c] rounded-xl p-4 cursor-pointer hover:border-[#06b6d4] transition-colors">
          <Upload size={20} className="text-[#06b6d4]" />
          <span className="text-[#64748b] text-sm">
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

      <div className="mb-6">
        <label className="block text-sm text-[#64748b] mb-2">Job posting URL</label>
        <div className="flex items-center gap-2 bg-[#0b0f19] rounded-xl px-4 py-3 border border-[#222f4c] focus-within:border-[#06b6d4] transition-colors">
          <Link size={16} className="text-[#06b6d4] shrink-0" />
          <input
            type="text"
            placeholder="https://rozee.pk/job/..."
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="bg-transparent text-[#f8fafc] text-sm w-full outline-none placeholder-[#64748b]"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#06b6d4] hover:bg-[#22d3ee] disabled:bg-[#222f4c] disabled:text-[#64748b] disabled:cursor-not-allowed text-[#0f172a] font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-[#06b6d4]/10"
      >
        {loading ? "Analyzing..." : "Analyze "}
      </button>

    </div>
  );
}