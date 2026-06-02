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
    <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">Resume (PDF)</label>
        <label className="flex items-center gap-3 border-2 border-dashed border-gray-700 rounded-xl p-4 cursor-pointer hover:border-purple-500 transition-colors">
          <Upload size={20} className="text-purple-400" />
          <span className="text-gray-300 text-sm">
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
        <label className="block text-sm text-gray-400 mb-2">Job posting URL</label>
        <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-4 py-3 border border-gray-700 focus-within:border-purple-500 transition-colors">
          <Link size={16} className="text-purple-400 shrink-0" />
          <input
            type="text"
            placeholder="https://rozee.pk/job/..."
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="bg-transparent text-white text-sm w-full outline-none placeholder-gray-600"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? "Analyzing..." : "Analyze "}
      </button>

    </div>
  );
}