import type { ReactNode } from "react";
import { useTransactions } from "./useTransactions";
import { TransactionsContext } from "./TransactionsContext";

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
