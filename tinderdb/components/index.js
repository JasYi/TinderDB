"use client";

// dashboard/src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

if (!clerkFrontendApi) {
  throw new Error("Missing REACT_APP_CLERK_FRONTEND_API environment variable");
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ClerkProvider
      frontendApi={clerkFrontendApi}
      navigate={(to) => window.history.pushState(null, "", to)}
      afterSignOutUrl="https://known-longhorn-40.accounts.dev/sign-in/">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
