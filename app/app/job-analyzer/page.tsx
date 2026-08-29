export default function JobAnalyzerPage() {
  const analysisItems = [
    "Required skills",
    "Preferred skills",
    "Experience requirements",
    "Education requirements",
    "Keywords",
    "Responsibilities",
    "Technologies",
    "Soft skills",
  ];

  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Analyse
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Job Description Analyzer
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Paste a job description to understand its requirements and compare
          the role against your candidate profile.
        </p>

        <div className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
          <label
            htmlFor="job-description"
            className="block text-sm font-semibold"
          >
            Job Description
          </label>

          <textarea
            id="job-description"
            rows={10}
            placeholder="Paste a job description here..."
            className="mt-3 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="button"
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Analyse Job
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {analysisItems.map((item) => (
            <div key={item} className="rounded-xl border bg-white p-5">
              <h2 className="font-semibold">{item}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Analysis will appear here.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}