"use client";

import { useState } from "react";
import Modal from "./Modal";
import Tabs from "./Tabs";
import Disclosure from "./Disclosure";

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <header>
          <h1 className="text-3xl font-bold">
            Accessible Components Playground
          </h1>

          <p className="mt-2 text-gray-600">
            Modal dialog, tabs, and disclosure built from scratch.
          </p>
        </header>

        {/* Modal */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">
            1. Modal Dialog
          </h2>

          <p className="mt-2 text-gray-600">
            Test keyboard focus, Escape, and focus return.
          </p>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-4 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Open Modal
          </button>

          <Modal
            isOpen={isModalOpen}
            title="Example Modal"
            onClose={() => setIsModalOpen(false)}
          >
            <p>
              This is an accessible modal dialog.
            </p>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mt-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </Modal>
        </section>

        {/* Tabs */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            2. Tabs
          </h2>

          <Tabs
            tabs={[
              {
                id: "overview",
                label: "Overview",
                content: (
                  <p>
                    This is the overview panel.
                  </p>
                ),
              },
              {
                id: "skills",
                label: "Skills",
                content: (
                  <p>
                    This is the skills panel.
                  </p>
                ),
              },
              {
                id: "experience",
                label: "Experience",
                content: (
                  <p>
                    This is the experience panel.
                  </p>
                ),
              },
            ]}
          />
        </section>

        {/* Disclosure */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            3. Disclosure
          </h2>

          <Disclosure title="What is LaunchPad AI?">
            <p>
              LaunchPad AI is an AI-powered career-readiness
              platform designed to help users understand,
              discover, improve, prepare, apply, and track
              their career progress.
            </p>
          </Disclosure>
        </section>
      </div>
    </main>
  );
}