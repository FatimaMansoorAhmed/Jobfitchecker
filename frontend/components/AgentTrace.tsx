"use client";
import { CheckCircle, Loader } from "lucide-react";

interface Props {
  steps: string[];
  loading: boolean;
}

export default function AgentTrace({ steps, loading }: Props) {
  return (
  <div className="bg-[#111111] rounded-3xl p-6 mb-6 border border-[#2a2a2a] shadow-lg">
    
    <h2 className="text-sm font-semibold text-gray-500 mb-5 uppercase tracking-[0.2em]">
      Agent Running
    </h2>

    <div className="space-y-4">

      {steps.map((step, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-black border border-[#1f1f1f] rounded-xl px-4 py-3"
        >
          <CheckCircle
            size={16}
            className="text-green-400 shrink-0"
          />

          <span className="text-sm text-gray-300">
            {step}
          </span>
        </div>
      ))}

      {loading && (
        <div className="flex items-center gap-3 bg-black border border-[#1f1f1f] rounded-xl px-4 py-3">
          
          <Loader
            size={16}
            className="text-yellow-400 animate-spin shrink-0"
          />

          <span className="text-sm text-gray-400">
            Waiting for response...
          </span>

        </div>
      )}

    </div>
  </div>
);}