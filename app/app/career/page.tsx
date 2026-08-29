export default function CareerPage() {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Discover
        </p>

        <h1 className="mt-3 text-4xl font-bold">Career Path Finder</h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Discover entry-level roles that match your education, skills,
          experience, projects, interests, and career preferences.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            "Education & Experience",
            "Skills & Projects",
            "Interests & Preferences",
            "Suitable Career Paths",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{item}</h2>
              <p className="mt-3 text-slate-600">
                This section will be developed as part of the career discovery
                workflow.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-dashed bg-white p-6">
          <h2 className="text-xl font-semibold">Example recommendation</h2>
          <p className="mt-3 text-slate-600">
            Frontend Developer — 76% match
          </p>
        </div>
      </div>
    </section>
  );
}