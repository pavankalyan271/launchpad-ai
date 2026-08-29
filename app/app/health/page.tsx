async function getHealthData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Health check request failed.");
  }

  return response.json();
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <section className="page">
      <div className="container">
        <p className="eyebrow">System</p>
        <h1>Health Check</h1>

        <div className="card">
          <p>
            <strong>Status:</strong> Connected
          </p>

          <p>
            <strong>Fetched data:</strong>
          </p>

          <pre className="health-data">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
}