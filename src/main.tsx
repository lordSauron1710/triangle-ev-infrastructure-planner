import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./app/AppRouter";
import "./app/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
