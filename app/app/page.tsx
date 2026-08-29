export default function HomePage() {
  return (
    <section className="page">
      <div className="container">
        <p className="eyebrow">LaunchPad AI</p>

        <h1>AI-powered career readiness</h1>

        <p className="lead">
          Build your skills, improve your profile, and prepare for your next
          career opportunity.
        </p>

        <div className="card-grid">
          <div className="card">
            <h2>Profile</h2>
            <p>
              Create and manage your professional profile.
            </p>
          </div>

          <div className="card">
            <h2>Career Readiness</h2>
            <p>
              Prepare for technical roles with guided career development.
            </p>
          </div>

          <div className="card">
            <h2>AI Assistance</h2>
            <p>
              Use AI-powered guidance to improve your career preparation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}