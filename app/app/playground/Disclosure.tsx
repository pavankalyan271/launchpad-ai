"use client";

import { useId, useState } from "react";

type DisclosureProps = {
  title: string;
  children: React.ReactNode;
};

export default function Disclosure({
  title,
  children,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  const contentId = `${id}-content`;

  return (
    <div className="rounded-lg border border-gray-300">
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((current) => !current)}
          className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span>{title}</span>

          <span aria-hidden="true">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </h2>

      {isOpen && (
        <div
          id={contentId}
          className="border-t border-gray-300 p-4"
        >
          {children}
        </div>
      )}
    </div>
  );
}