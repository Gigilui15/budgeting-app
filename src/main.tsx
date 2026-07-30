import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import "./index.css";
import { TransactionsProvider } from "./features/transactions/TransactionsProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { AuthProvider } from "./features/auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <title>Budget Base</title>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TransactionsProvider>
            <App />
          </TransactionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
