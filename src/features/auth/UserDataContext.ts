import { createContext, useContext } from "react";

import type { Account, Profile } from "../profile/profileTypes";
import type { Transaction } from "../transactions/transactionTypes";

type VisibleProfile = Omit<Profile, "password">;

export type UserDataContextValue = {
  profile: VisibleProfile;
  accounts: Account[];
  selectedAccount: Account;
  transactions: Transaction[];
  selectAccount: (accountId: string) => void;
  addTransaction: (transaction: Transaction) => void;
  removeLatestTransaction: () => void;
  balance: number;
};

export const UserDataContext = createContext<UserDataContextValue | null>(null);

export function useUserData() {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used inside UserDataProvider");
  }

  return context;
}
