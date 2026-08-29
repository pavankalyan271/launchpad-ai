import Link from "next/link";

export default function Navigation() {
  return (
    <header className="site-header">
      <nav className="navigation" aria-label="Main navigation">
        <Link href="/" className="brand">
          LaunchPad AI
        </Link>

        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/health">Health Check</Link>
        </div>
      </nav>
    </header>
  );
}