import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import DemoPage from "./pages/DemoPage";
import DocsPage from "./pages/DocsPage";
import AboutPage from "./pages/AboutPage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/docs/*" element={<DocsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
