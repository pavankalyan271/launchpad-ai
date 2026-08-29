const roadmap = [
  ["Week 1", "JavaScript fundamentals", "Complete"],
  ["Week 2", "React", "In progress"],
  ["Week 3", "TypeScript", "Next"],
  ["Week 4", "Testing", "Upcoming"],
  ["Week 5", "Build portfolio project", "Upcoming"],
];

export default function LearningPage() {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Improve
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Personalised Learning Roadmap
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Turn your skill gaps into a practical learning plan that adapts as
          you progress.
        </p>

        <div className="mt-10 space-y-4">
          {roadmap.map(([week, topic, status]) => (
            <div
              key={week}
              className="flex flex-col gap-3 rounded-2xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-blue-600">{week}</p>
                <h2 className="mt-1 text-xl font-semibold">{topic}</h2>
              </div>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}