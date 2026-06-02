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

  return (<div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Resume (PDF)</label>
        <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-indigo-600 transition-colors bg-gray-50">
          <Upload size={20} className="text-indigo-600" />
          <span className="text-gray-700 text-sm">
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
        <label className="block text-sm text-gray-600 mb-2">Job posting URL</label>
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-300 focus-within:border-indigo-600 transition-colors">
          <Link size={16} className="text-indigo-600 shrink-0" />
          <input
            type="text"
            placeholder="https://rozee.pk/job/..."
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="bg-transparent text-gray-900 text-sm w-full outline-none placeholder-gray-400"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {loading ? "Analyzing..." : "Analyze "}
      </button>

    </div>
  );
}