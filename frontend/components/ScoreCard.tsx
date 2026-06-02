"use client";

interface Props {
  result: any;
}

const gradeColor: Record<string, string> = {
  A: "text-green-400",
  B: "text-teal-400",
  C: "text-yellow-400",
  D: "text-orange-400",
  F: "text-red-400",
};

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}/100</span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-purple-500 rounded-full transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default function ScoreCard({ result }: Props) {
  const { score, gap_analysis, coaching, job_title } = result;
return (
  <div className="space-y-4">

    {/* Score overview */}
    <div className="bg-[#151d30] rounded-xl p-6 border border-[#222f4c] shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[#64748b] text-xs uppercase tracking-wider mb-1">Analyzing fit for</p>
          <h2 className="text-[#f8fafc] font-bold text-xl">{job_title}</h2>
          <p className="text-[#64748b] text-sm mt-1">{score.one_liner}</p>
        </div>
        <div className="text-right">
          {/* Grade color fallback matches the high contrast white text element */}
          <div className={`text-5xl font-bold ${gradeColor[score.grade] || "text-[#f8fafc]"}`}>
            {score.grade}
          </div>
          <div className="text-[#64748b] text-xs mt-1">{score.overall_score}/100</div>
        </div>
      </div>

      {/* Note: Ensure inside your <ScoreBar /> component that the filled tracking bar 
          uses high contrast elements like text-[#f8fafc] or bg-white to mirror the image button accent! */}
      <ScoreBar label="Skills match" value={score.skills_score} />
      <ScoreBar label="Keywords match" value={score.keywords_score} />
      <ScoreBar label="Experience fit" value={score.experience_score} />
    </div>

    {/* Gaps */}
    <div className="bg-[#151d30] rounded-xl p-6 border border-[#222f4c] shadow-xl">
      <h3 className="font-semibold text-[#f8fafc] text-sm mb-4">Skill gaps</h3>

      {gap_analysis.matching_skills?.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[#64748b] font-semibold tracking-wider uppercase mb-2">You have ✓</p>
          <div className="flex flex-wrap gap-2">
            {gap_analysis.matching_skills.map((s: string) => (
              <span key={s} className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {gap_analysis.missing_skills?.length > 0 && (
        <div>
          <p className="text-xs text-[#64748b] font-semibold tracking-wider uppercase mb-2">Missing ✗</p>
          <div className="flex flex-wrap gap-2">
            {gap_analysis.missing_skills.map((s: string) => (
              <span key={s} className="bg-rose-500/10 text-rose-400 text-xs px-3 py-1 rounded-full border border-rose-500/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Coaching */}
    <div className="bg-[#151d30] rounded-xl p-6 border border-[#222f4c] shadow-xl">
      <h3 className="font-semibold text-[#f8fafc] text-sm mb-4">Coach advice</h3>

      <div className="mb-4">
        <p className="text-xs text-[#64748b] font-semibold tracking-wider uppercase mb-2">Quick wins</p>
        <ul className="space-y-2">
          {coaching.quick_wins?.map((win: string, i: number) => (
            <li key={i} className="text-sm text-[#f8fafc] opacity-90 flex gap-2">
              <span className="text-[#64748b] shrink-0">→</span>
              {win}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <p className="text-xs text-[#64748b] font-semibold tracking-wider uppercase mb-2">Rewritten summary</p>
        <p className="text-sm text-[#f8fafc] bg-[#0b0f19] border border-[#222f4c] rounded-xl p-4 leading-relaxed opacity-90">
          {coaching.rewritten_summary}
        </p>
      </div>

      <div>
        <p className="text-xs text-[#64748b] font-semibold tracking-wider uppercase mb-2">Honest advice</p>
        <p className="text-sm text-[#64748b] leading-relaxed">{coaching.honest_advice}</p>
      </div>
    </div>

  </div>
);}