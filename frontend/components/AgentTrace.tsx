"use client";
import { CheckCircle, Loader } from "lucide-react";

interface Props {
  steps: string[];
  loading: boolean;
}

export default function AgentTrace({ steps, loading }: Props) {
 return (
  <div className="bg-[#151d30] rounded-xl p-6 mb-6 border border-[#222f4c] shadow-xl">
    <h2 className="text-xs font-semibold text-[#64748b] mb-4 uppercase tracking-wider">
      Agent running
    </h2>
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-3">
          {/* Replaced purple with a clean off-white check to match the premium text theme */}
          <CheckCircle size={16} className="text-[#f8fafc] shrink-0" />
          <span className="text-sm text-[#f8fafc] opacity-90">{step}</span>
        </div>
      ))}
      {loading && (
        <div className="flex items-center gap-3">
          {/* The loader utilizes the muted slate color with a slow spin */}
          <Loader size={16} className="text-[#64748b] animate-spin shrink-0" />
          <span className="text-sm text-[#64748b] italic">Waiting for response...</span>
        </div>
      )}
    </div>
  </div>
);}