import { useEffect, useState } from "react";

import type { Transaction } from "./transactionTypes";
import {
  loadTransactions,
  saveTransactions,
} from "./transactionStorage";
import { calculateBalance } from "./transactionUtils";

export function useTransactions() {
  // The function is passed to useState so loading runs only for the initial state.
  const [transactions, setTransactions] =
    useState<Transaction[]>(loadTransactions);

  // Effects synchronize React state with systems outside React, such as local storage.
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  function addTransaction(transaction: Transaction) {
    // Create a new array rather than mutating the existing state array.
    setTransactions((currentTransactions) => [
      ...currentTransactions,
      transaction,
    ]);
  }

  function removeLatestTransaction() {
    setTransactions((currentTransactions) => currentTransactions.slice(0, -1));
  }

  return {
    transactions,
    balance: calculateBalance(transactions),
    addTransaction,
    removeLatestTransaction,
  };
}
