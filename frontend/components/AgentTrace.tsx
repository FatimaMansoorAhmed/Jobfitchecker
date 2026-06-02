"use client";
import { CheckCircle, Loader } from "lucide-react";

interface Props {
  steps: string[];
  loading: boolean;
}

export default function AgentTrace({ steps, loading }: Props) {
  return (<div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
        Agent running
      </h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckCircle size={16} className="text-indigo-600 shrink-0" />
            <span className="text-sm text-gray-700">{step}</span>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-3">
            <Loader size={16} className="text-gray-400 animate-spin shrink-0" />
            <span className="text-sm text-gray-400">Waiting for response...</span>
          </div>
        )}
      </div>
    </div>
  );
}