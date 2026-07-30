import { useState, type ReactNode } from "react";

import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

const AUTH_STORAGE_KEY = "budget-base-authenticated";

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  function login(email: string, password: string) {
    const credentialsAreValid =
      email === "admin@gmail.com" && password === "admin";

    if (!credentialsAreValid) {
      return false;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);

    return true;
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
