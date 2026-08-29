const categories = [
  "HR",
  "Behavioural",
  "Technical",
  "Role-specific",
  "Company-specific",
  "Project-based",
];

export default function InterviewsPage() {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Prepare
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Interview Preparation
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Prepare for different interview formats with role-specific
          questions and AI-assisted feedback.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{category}</h2>
              <p className="mt-3 text-sm text-slate-500">
                Practice questions will be available here.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed bg-white p-6">
          <h2 className="text-xl font-semibold">AI Mock Interview</h2>
          <p className="mt-3 text-slate-600">
            Future versions will support question → answer → evaluation →
            feedback → next question.
          </p>
        </div>
      </div>
    </section>
  );
}