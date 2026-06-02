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
  <div className="space-y-6">

    {/* Score Overview */}
    <div className="bg-[#111111] rounded-3xl p-6 border border-[#2a2a2a] shadow-lg">

      <div className="flex items-start justify-between mb-6">

        <div>
          <p className="text-gray-500 text-sm mb-1 uppercase tracking-wide">
            Analyzing fit for
          </p>

          <h2 className="text-white font-bold text-2xl">
            {job_title}
          </h2>

          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            {score.one_liner}
          </p>
        </div>

        <div className="text-right">
          <div
            className={`text-6xl font-bold ${
              gradeColor[score.grade] || "text-white"
            }`}
          >
            {score.grade}
          </div>

          <div className="text-gray-500 text-sm mt-1">
            {score.overall_score}/100
          </div>
        </div>

      </div>

      <div className="space-y-4">
        <ScoreBar label="Skills match" value={score.skills_score} />
        <ScoreBar label="Keywords match" value={score.keywords_score} />
        <ScoreBar label="Experience fit" value={score.experience_score} />
      </div>

    </div>

    {/* Skill Gaps */}
    <div className="bg-[#111111] rounded-3xl p-6 border border-[#2a2a2a] shadow-lg">

      <h3 className="font-semibold text-white text-lg mb-5">
        Skill Gaps
      </h3>

      {gap_analysis.matching_skills?.length > 0 && (
        <div className="mb-5">

          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
            You Have ✓
          </p>

          <div className="flex flex-wrap gap-3">
            {gap_analysis.matching_skills.map((s: string) => (
              <span
                key={s}
                className="bg-green-500/10 text-green-400 text-xs px-4 py-2 rounded-full border border-green-500/20"
              >
                {s}
              </span>
            ))}
          </div>

        </div>
      )}

      {gap_analysis.missing_skills?.length > 0 && (
        <div>

          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
            Missing ✗
          </p>

          <div className="flex flex-wrap gap-3">
            {gap_analysis.missing_skills.map((s: string) => (
              <span
                key={s}
                className="bg-red-500/10 text-red-400 text-xs px-4 py-2 rounded-full border border-red-500/20"
              >
                {s}
              </span>
            ))}
          </div>

        </div>
      )}

    </div>

    {/* Coaching */}
    <div className="bg-[#111111] rounded-3xl p-6 border border-[#2a2a2a] shadow-lg">

      <h3 className="font-semibold text-white text-lg mb-5">
        Coach Advice
      </h3>

      {/* Quick Wins */}
      <div className="mb-6">

        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          Quick Wins
        </p>

        <ul className="space-y-3">
          {coaching.quick_wins?.map((win: string, i: number) => (
            <li
              key={i}
              className="text-sm text-gray-300 flex gap-3 items-start"
            >
              <span className="text-yellow-400 shrink-0 mt-[2px]">
                →
              </span>

              <span>{win}</span>
            </li>
          ))}
        </ul>

      </div>

      {/* Rewritten Summary */}
      <div className="mb-6">

        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          Rewritten Summary
        </p>

        <div className="bg-black border border-[#1f1f1f] rounded-2xl p-5">
          <p className="text-sm text-gray-300 leading-relaxed">
            {coaching.rewritten_summary}
          </p>
        </div>

      </div>

      {/* Honest Advice */}
      <div>

        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
          Honest Advice
        </p>

        <div className="bg-black border border-[#1f1f1f] rounded-2xl p-5">
          <p className="text-sm text-gray-400 leading-relaxed">
            {coaching.honest_advice}
          </p>
        </div>

      </div>

    </div>

  </div>
);}