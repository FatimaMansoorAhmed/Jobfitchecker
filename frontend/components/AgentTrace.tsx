"use client";
import { CheckCircle, Loader } from "lucide-react";

interface Props {
  steps: string[];
  loading: boolean;
}

export default function AgentTrace({ steps, loading }: Props) {
  return (<div className="bg-[#151d30] rounded-2xl p-6 mb-6 border border-[#222f4c]">
      <h2 className="text-sm font-semibold text-[#64748b] mb-4 uppercase tracking-wider">
        Agent running
      </h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle size={16} className="text-[#06b6d4] shrink-0" />
            <span className="text-sm text-[#f8fafc]">{step}</span>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-3">
            <Loader size={16} className="text-[#64748b] animate-spin shrink-0" />
            <span className="text-sm text-[#64748b]">Waiting for response...</span>
          </div>
        )}
      </div>
    </div>
  );
}