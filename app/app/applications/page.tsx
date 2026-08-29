const stages = [
  "Applied",
  "Assessment",
  "Interview",
  "Offer",
  "Rejected",
];

export default function ApplicationsPage() {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Apply & Track
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Job Application Tracker
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Keep your applications organised and learn from your application
          outcomes.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage) => (
            <div
              key={stage}
              className="min-h-40 rounded-2xl border bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold">{stage}</h2>

              <p className="mt-4 text-sm text-slate-500">
                Applications will appear here.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Application details</h2>

          <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <p>Company</p>
            <p>Job role</p>
            <p>Application date</p>
            <p>Interview date</p>
            <p>Location</p>
            <p>Job link</p>
          </div>
        </div>
      </div>
    </section>
  );
}