import React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const LandingPage: React.FC = () => {
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInitialized(true);
    });
  }, []);

  const options: ISourceOptions = React.useMemo(
    () => ({
      background: { color: { value: "#0f172a" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          resize: { enable: true },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 120, duration: 0.4 },
        },
      },
      particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: { enable: true, minimumValue: 0.3 } },
        size: { value: { min: 1, max: 4 } },
        links: {
          enable: true,
          distance: 120,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: MoveDirection.none,
          outModes: { default: OutMode.bounce },
          random: false,
          straight: false,
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="relative h-full w-full bg-gray-900">
      {initialized && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0"
          options={options}
        />
      )}

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-center bg-gray-800 py-4 shadow-lg">
        <ul className="flex items-center space-x-8 text-white">
          <li>
            <a href="/about" className="hover:text-indigo-400 transition">
              About
            </a>
          </li>
          <li>
            <a href="/docs" className="hover:text-indigo-400 transition">
              Docs
            </a>
          </li>
          <li className="text-2xl font-bold text-indigo-500">MART</li>
          <li>
            <a href="/demo" className="hover:text-indigo-400 transition">
              Demo
            </a>
          </li>
          <li>
            <a href="/" className="hover:text-indigo-400 transition">
              Home
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white">
          MART: Mapping &amp; Routing Tool
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-200">
          Explore advanced interconnection network visualizations and algorithms
        </p>
        <a
          href="/demo"
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-xl font-semibold text-white transition-transform hover:scale-105"
        >
          Try the Demo ↗
        </a>
      </section>

      {/* Features Section */}
      <section className="relative z-10 bg-gray-800 py-16 text-center text-white">
        <h2 className="mb-8 text-4xl font-bold">Features</h2>
        <div className="grid grid-cols-1 gap-8 px-8 md:grid-cols-3">
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold">
              Interactive Visualizations
            </h3>
            <p>
              Explore and interact with various topologies like mesh, torus, and
              butterfly.
            </p>
          </div>
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold">Advanced Algorithms</h3>
            <p>
              Leverage state-of-the-art mapping and routing algorithms for
              optimal performance.
            </p>
          </div>
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold">
              User-Friendly Interface
            </h3>
            <p>Enjoy a seamless and intuitive experience with our modern UI.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 bg-gray-900 py-16 text-center text-white">
        <h2 className="mb-8 text-4xl font-bold">Get Started Today</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Dive into MART and explore the endless possibilities of
          interconnection networks.
        </p>
        <a
          href="/demo"
          className="rounded-lg bg-gradient-to-r from-green-500 to-teal-600 px-6 py-3 text-xl font-semibold text-white transition-transform hover:scale-105"
        >
          Try the Demo ↗
        </a>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-800 py-4 text-center text-gray-400">
        <p>&copy; 2025 MART. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
