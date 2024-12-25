import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import { MyBookmarksProvider } from "./contexts/MyBookmarks";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <MyBookmarksProvider>
      <App />
    </MyBookmarksProvider>
  </AuthProvider>
);
