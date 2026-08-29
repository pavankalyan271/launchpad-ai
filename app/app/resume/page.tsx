export default function ResumePage() {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Improve
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Analyse your CV for structure, skills, keywords, relevance, and
          alignment with your target role.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Resume Analysis</h2>
            <p className="mt-3 text-slate-600">
              Upload or paste your CV to identify areas that can be improved.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Resume Tailoring</h2>
            <p className="mt-3 text-slate-600">
              Compare your CV with a job description and improve relevant
              wording without inventing qualifications or experience.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed bg-white p-8 text-center">
          <p className="font-semibold">Resume upload and AI analysis</p>
          <p className="mt-2 text-sm text-slate-500">
            Functionality will be implemented in a later phase.
          </p>
        </div>
      </div>
    </section>
  );
}