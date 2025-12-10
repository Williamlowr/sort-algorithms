import React from "react";
import ReactDOM from "react-dom/client";
import SortVisualizer from "./components/SortVisualizer";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="bg-slate-800/90 min-h-screen flex items-start justify-center">
      <SortVisualizer />
    </div>
  </React.StrictMode>
);
