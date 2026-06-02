"use client";
import { CheckCircle, Loader } from "lucide-react";

interface Props {
  steps: string[];
  loading: boolean;
}

export default function AgentTrace({ steps, loading }: Props) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
      <h2 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
        Agent running
      </h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle size={16} className="text-purple-400 shrink-0" />
            <span className="text-sm text-gray-300">{step}</span>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-3">
            <Loader size={16} className="text-gray-500 animate-spin shrink-0" />
            <span className="text-sm text-gray-500">Waiting for response...</span>
          </div>
        )}
      </div>
    </div>
  );
}