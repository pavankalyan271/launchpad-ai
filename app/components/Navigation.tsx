import Link from "next/link";

const navigationItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/career", label: "Career" },
  { href: "/job-analyzer", label: "Job Analyzer" },
  { href: "/skill-gaps", label: "Skill Gaps" },
  { href: "/learning", label: "Learning" },
  { href: "/resume", label: "Resume" },
  { href: "/interviews", label: "Interviews" },
  { href: "/applications", label: "Applications" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex min-h-16 max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          LaunchPad AI
        </Link>

        <div className="flex max-w-full flex-wrap gap-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/profile"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
          >
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}