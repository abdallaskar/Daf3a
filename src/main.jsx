import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import "flowbite";
import ThemeContextProvider from "./contexts/ThemeContextProvider.jsx";

import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import { MentorProvider } from "./contexts/ProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <MentorProvider>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "var(--primary-brand)",
                color: "var(--text-inverse)",
              },
              iconTheme: {
                primary: "var(--surface)",
                secondary: "var(--primary-brand)",
              },
            },
            error: {
              style: {
                background: "#e74c3c",
                color: "var(--text-inverse)",
              },
              iconTheme: {
                primary: "var(--surface)",
                secondary: "#e74c3c",
              },
            },
          }}
        />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MentorProvider>
    </AuthContextProvider>
  </ThemeContextProvider>
);
