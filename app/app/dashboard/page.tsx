const readinessAreas = [
  { label: "Technical Skills", value: 82 },
  { label: "Projects", value: 70 },
  { label: "CV", value: 85 },
  { label: "Interview", value: 65 },
  { label: "Experience", value: 72 },
  { label: "Portfolio", value: 80 },
];

const actions = [
  "Improve TypeScript skills",
  "Tailor your CV for suitable roles",
  "Complete an interview practice session",
];

export default function DashboardPage() {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Your career journey
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Career Dashboard
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Understand your strengths, identify your gaps, and see what to do
          next.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-1">
            <p className="text-sm font-medium text-slate-500">
              Job Readiness
            </p>

            <p className="mt-3 text-6xl font-bold text-blue-600">78%</p>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Your readiness score is explanatory and designed to show areas
              for improvement, not predict employment.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold">Readiness Breakdown</h2>

            <div className="mt-6 space-y-5">
              {readinessAreas.map((area) => (
                <div key={area.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{area.label}</span>
                    <span className="font-semibold">{area.value}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${area.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Today's 3 Priorities</h2>

          <ol className="mt-5 space-y-3">
            {actions.map((action, index) => (
              <li key={action} className="flex gap-3 text-slate-700">
                <span className="font-bold text-blue-600">{index + 1}.</span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}