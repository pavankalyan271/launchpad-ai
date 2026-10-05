"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const CareerScene = dynamic(
  () => import("../../components/CareerScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full items-center justify-center rounded-3xl bg-slate-950 px-6 text-center text-sm text-slate-300">
        Loading your 3D career journey…
      </div>
    ),
  },
);

type CareerStage = {
  id: string;
  label: string;
  description: string;
  color: string;
};

const stages: CareerStage[] = [
  {
    id: "role",
    label: "Target Role",
    description: "Define the role you want to build toward.",
    color: "#2563eb",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Identify the technical and professional skills required.",
    color: "#7c3aed",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Build practical projects that demonstrate your abilities.",
    color: "#0891b2",
  },
  {
    id: "cv",
    label: "CV",
    description: "Present your experience and skills clearly to recruiters.",
    color: "#059669",
  },
  {
    id: "interview",
    label: "Interview",
    description: "Prepare for technical and behavioural interviews.",
    color: "#d97706",
  },
  {
    id: "ready",
    label: "Job Ready",
    description: "Bring everything together and start applying confidently.",
    color: "#dc2626",
  },
];

export default function CareerJourneyPage() {
  const [activeStage, setActiveStage] = useState("role");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();

    mediaQuery.addEventListener("change", updateMotionPreference);

    const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;

    setLowPower(hardwareConcurrency <= 2);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference,
      );
    };
  }, []);

  const active = stages.find((stage) => stage.id === activeStage);

  const shouldUseStaticFallback = reducedMotion || lowPower;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            LaunchPad AI · FE-11
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Your 3D Career Journey
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Explore the journey from choosing your target role to becoming
            job ready. Select a stage to see it highlighted in the 3D
            experience.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            {shouldUseStaticFallback ? (
              <div className="rounded-3xl bg-slate-950 p-6 text-white">
                <p className="text-sm font-semibold text-blue-300">
                  Career Journey
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {active?.label}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {active?.description}
                </p>

                <p className="mt-6 text-xs text-slate-400">
                  3D motion is reduced on this device, but the complete
                  career journey remains available below.
                </p>
              </div>
            ) : (
              <CareerScene
                activeStage={activeStage}
                stages={stages}
                reducedMotion={reducedMotion}
              />
            )}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Current stage
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {active?.label}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {active?.description}
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">
              Career Journey
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Choose a stage to change the 3D career core.
            </p>

            <div className="mt-5 space-y-2">
              {stages.map((stage, index) => {
                const isActive = stage.id === activeStage;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(stage.id)}
                    className={[
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left",
                      "transition-[transform,background-color,border-color]",
                      "duration-200 ease-out",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-blue-400 focus-visible:ring-offset-2",
                      "hover:-translate-y-0.5",
                      isActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      {index + 1}
                    </span>

                    <span>
                      <span className="block text-sm font-semibold text-slate-900">
                        {stage.label}
                      </span>

                      <span className="mt-0.5 block text-xs text-slate-500">
                        {stage.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
          <h2 className="text-base font-semibold">
            FE-11 Performance Notes
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            The scene uses lightweight procedural geometry instead of a
            large external 3D model. The canvas is lazy-loaded, device
            pixel ratio is capped, and reduced-motion or low-power devices
            receive a static experience instead of unnecessary animation.
          </p>
        </section>
      </div>
    </main>
  );
}