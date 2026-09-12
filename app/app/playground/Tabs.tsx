"use client";

import { useRef, useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const moveFocus = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;

    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        moveFocus(index + 1);
        break;

      case "ArrowLeft":
        event.preventDefault();
        moveFocus(index - 1);
        break;

      case "Home":
        event.preventDefault();
        moveFocus(0);
        break;

      case "End":
        event.preventDefault();
        moveFocus(tabs.length - 1);
        break;

      default:
        break;
    }
  };

  if (tabs.length === 0) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Example tabs"
        className="flex border-b border-gray-300"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        if (index !== activeTab) return null;

        return (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            className="p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}