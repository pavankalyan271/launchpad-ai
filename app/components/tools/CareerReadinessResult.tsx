type CareerReadinessResultProps = {
  result: {
    targetRole: string;
    overallScore: number;
    breakdown: {
      technicalSkills: number;
      projects: number;
      interviewPreparation: number;
      cvReadiness: number;
    };
    strengths: string[];
    skillGaps: string[];
    nextSteps: string[];
  };
};

function ScoreBar({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-slate-700">
          {label}
        </span>

        <span className="shrink-0 font-semibold text-slate-900">
          {score}%
        </span>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        aria-label={`${label}: ${score}%`}
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${Math.min(100, Math.max(0, score))}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function CareerReadinessResult({
  result,
}: CareerReadinessResultProps) {
  const scoreLabel =
    result.overallScore >= 80
      ? "Strong readiness"
      : result.overallScore >= 60
        ? "Developing readiness"
        : "Needs improvement";

  return (
    <div className="w-full rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">
            Career Readiness Assessment
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            {result.targetRole}
          </h2>
        </div>

        <div
          className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-50"
          aria-label={`Overall readiness score: ${result.overallScore} out of 100`}
        >
          <span className="text-2xl font-bold text-emerald-700">
            {result.overallScore}
          </span>

          <span className="text-xs text-emerald-700">
            / 100
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3">
        <p className="font-semibold text-emerald-800">
          {scoreLabel}
        </p>

        <p className="mt-1 text-sm leading-5 text-emerald-700">
          This score is guidance based on the information
          provided, not a prediction of employment outcomes.
        </p>
      </div>

      {/* Breakdown */}
      <section className="mt-6" aria-labelledby="readiness-breakdown">
        <h3
          id="readiness-breakdown"
          className="text-sm font-semibold text-slate-900"
        >
          Readiness breakdown
        </h3>

        <div className="mt-4 space-y-5">
          <ScoreBar
            label="Technical skills"
            score={result.breakdown.technicalSkills}
          />

          <ScoreBar
            label="Projects"
            score={result.breakdown.projects}
          />

          <ScoreBar
            label="Interview preparation"
            score={result.breakdown.interviewPreparation}
          />

          <ScoreBar
            label="CV readiness"
            score={result.breakdown.cvReadiness}
          />
        </div>
      </section>

      {/* Strengths */}
      <section className="mt-7" aria-labelledby="strengths">
        <h3
          id="strengths"
          className="text-sm font-semibold text-slate-900"
        >
          Strengths
        </h3>

        <div className="mt-3 space-y-2">
          {result.strengths.length > 0 ? (
            result.strengths.map((strength) => (
              <div
                key={strength}
                className="rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-800"
              >
                <span aria-hidden="true">✓</span>{" "}
                {strength}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No clear strengths identified yet.
            </p>
          )}
        </div>
      </section>

      {/* Skill gaps */}
      <section className="mt-7" aria-labelledby="skill-gaps">
        <h3
          id="skill-gaps"
          className="text-sm font-semibold text-slate-900"
        >
          Skill gaps
        </h3>

        <div className="mt-3 space-y-2">
          {result.skillGaps.length > 0 ? (
            result.skillGaps.map((gap) => (
              <div
                key={gap}
                className="rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800"
              >
                <span aria-hidden="true">→</span>{" "}
                {gap}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No major gaps identified.
            </p>
          )}
        </div>
      </section>

      {/* Next steps */}
      <section className="mt-7" aria-labelledby="next-steps">
        <h3
          id="next-steps"
          className="text-sm font-semibold text-slate-900"
        >
          Recommended next steps
        </h3>

        <ol className="mt-3 space-y-2">
          {result.nextSteps.map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-lg bg-slate-50 px-3 py-3 text-sm leading-5 text-slate-700"
            >
              <span className="shrink-0 font-semibold text-blue-600">
                {index + 1}.
              </span>

              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}