import { useState, type ReactNode } from "react";

import { AuthContext } from "./AuthContext";
import { loadAppData } from "../../data/appDataRepository";

type AuthProviderProps = {
  children: ReactNode;
};

// Prototype only: this stores the current profile ID so login survives a refresh.
// TODO: With a backend, use an unpredictable session token in a Secure, HttpOnly
// cookie. The server, rather than the browser, should map it to a profile ID.
const CURRENT_PROFILE_STORAGE_KEY = "budget-base-current-profile-id";

export function AuthProvider({ children }: AuthProviderProps) {
  const [profileId, setProfileId] = useState<string | null>(() => {
    const savedProfileId = localStorage.getItem(CURRENT_PROFILE_STORAGE_KEY);

    if (!savedProfileId) {
      return null;
    }

    const profileStillExists = loadAppData().profiles.some(
      (profile) => profile.id === savedProfileId,
    );

    if (!profileStillExists) {
      localStorage.removeItem(CURRENT_PROFILE_STORAGE_KEY);
      return null;
    }

    return savedProfileId;
  });

  function login(email: string, password: string): boolean {
    const appData = loadAppData();

    const profile = appData.profiles.find(
      candidate =>
        candidate.email === email &&
        candidate.password === password,
    );

    if (!profile) {
      return false;
    }

    // This identifies the current dummy profile; it is not a secure session token.
    localStorage.setItem(CURRENT_PROFILE_STORAGE_KEY, profile.id);
    setProfileId(profile.id);

    return true;
  }

  function logout(): void {
    localStorage.removeItem(CURRENT_PROFILE_STORAGE_KEY);
    setProfileId(null);
  }

  return (
    <AuthContext.Provider
      value={{
        profileId,
        isAuthenticated: profileId !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
