import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useTransactions } from "../hooks/useTransactions";

type TransactionsContextValue = ReturnType<typeof useTransactions>;

const TransactionsContext =
  createContext<TransactionsContextValue | null>(null);

type TransactionsProviderProps = {
  children: ReactNode;
};

export function TransactionsProvider({
  children,
}: TransactionsProviderProps) {
  const transactionsState = useTransactions();

  return (
    <TransactionsContext.Provider value={transactionsState}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactionsContext must be used inside TransactionsProvider",
    );
  }

  return context;
}