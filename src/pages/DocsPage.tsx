// src/pages/DocsPage.tsx
import React from "react";
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const sections = [
  { name: "Introduction", content: <p>Welcome to MART documentation…</p> },
  { name: "Topologies", content: <p>Details on mesh, ring, torus…</p> },
  { name: "Mapping", content: <p>How mapping techniques work…</p> },
  { name: "Routing", content: <p>Routing algorithm explanations…</p> },
  { name: "Examples", content: <p>Some example workflows…</p> },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const DocsPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100 p-8">
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-extrabold tracking-wide">
        MART Documentation
      </h1>
      <p className="mt-2 text-lg text-gray-300">
        Everything you need to get started with Mapping & Routing Tool
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-sm text-green-400 hover:text-green-200"
      >
        ← Back to Home
      </Link>
    </header>

    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-800 p-1">
        {sections.map((section) => (
          <Tab as={Fragment} key={section.name}>
            {({ selected }) => (
              <button
                className={classNames(
                  "w-full py-2.5 text-sm font-medium leading-5 rounded-lg",
                  selected
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                )}
              >
                {section.name}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-6">
        {sections.map((section) => (
          <Tab.Panel
            key={section.name}
            className="rounded-xl bg-gray-800 p-6 ring-1 ring-gray-700"
          >
            {section.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  </div>
);

export default DocsPage;
