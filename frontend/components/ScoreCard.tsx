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
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Analyzing fit for</p>
            <h2 className="text-white font-bold text-xl">{job_title}</h2>
            <p className="text-gray-500 text-sm mt-1">{score.one_liner}</p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold ${gradeColor[score.grade] || "text-white"}`}>
              {score.grade}
            </div>
            <div className="text-gray-400 text-sm">{score.overall_score}/100</div>
          </div>
        </div>

        <ScoreBar label="Skills match" value={score.skills_score} />
        <ScoreBar label="Keywords match" value={score.keywords_score} />
        <ScoreBar label="Experience fit" value={score.experience_score} />
      </div>

      {/* Gaps */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="font-semibold text-white mb-4">Skill gaps</h3>

        {gap_analysis.matching_skills?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 uppercase mb-2">You have ✓</p>
            <div className="flex flex-wrap gap-2">
              {gap_analysis.matching_skills.map((s: string) => (
                <span key={s} className="bg-green-900/40 text-green-400 text-xs px-3 py-1 rounded-full border border-green-800">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {gap_analysis.missing_skills?.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 uppercase mb-2">Missing ✗</p>
            <div className="flex flex-wrap gap-2">
              {gap_analysis.missing_skills.map((s: string) => (
                <span key={s} className="bg-red-900/40 text-red-400 text-xs px-3 py-1 rounded-full border border-red-800">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Coaching */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <h3 className="font-semibold text-white mb-4">Coach advice</h3>

        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase mb-2">Quick wins</p>
          <ul className="space-y-2">
            {coaching.quick_wins?.map((win: string, i: number) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-purple-400 shrink-0">→</span>
                {win}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase mb-2">Rewritten summary</p>
          <p className="text-sm text-gray-300 bg-gray-800 rounded-xl p-4 leading-relaxed">
            {coaching.rewritten_summary}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase mb-2">Honest advice</p>
          <p className="text-sm text-gray-400 leading-relaxed">{coaching.honest_advice}</p>
        </div>
      </div>

    </div>
  );
}