import { createContext, useContext } from "react";

import type { useTransactions } from "./useTransactions";

export type TransactionsContextValue = ReturnType<typeof useTransactions>;

export const TransactionsContext =
  createContext<TransactionsContextValue | null>(null);

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactionsContext must be used inside TransactionsProvider",
    );
  }

  return context;
}
