const skills = [
  ["HTML", "Strong", "text-green-600"],
  ["CSS", "Strong", "text-green-600"],
  ["JavaScript", "Strong", "text-green-600"],
  ["React", "Developing", "text-amber-600"],
  ["TypeScript", "Needs improvement", "text-red-600"],
  ["Testing", "Needs improvement", "text-red-600"],
  ["REST APIs", "Developing", "text-amber-600"],
];

export default function SkillGapsPage() {
  return (
    <section className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Improve
        </p>

        <h1 className="mt-3 text-4xl font-bold">Skill Gap Analysis</h1>

        <p className="mt-4 text-lg text-slate-600">
          Understand which skills you already have and which skills need
          further development for your target role.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="grid grid-cols-2 border-b bg-slate-50 p-4 font-semibold">
            <span>Skill</span>
            <span>Status</span>
          </div>

          {skills.map(([skill, status, color]) => (
            <div
              key={skill}
              className="grid grid-cols-2 border-b p-4 last:border-0"
            >
              <span>{skill}</span>
              <span className={`font-medium ${color}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}