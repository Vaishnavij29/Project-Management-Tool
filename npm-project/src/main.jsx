import React from "react";
import { createRoot } from "react-dom/client";
import ProjectManagementTool from "./App"; // Your main component
import "./styles.css"; // Optional: Add styles

const root = document.getElementById("root");
createRoot(root).render(<ProjectManagementTool />);
