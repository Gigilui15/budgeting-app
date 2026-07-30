import {
  Category,
  type StoredTransaction,
  type Transaction,
} from "./transactionTypes";
import { createStarterTransactions } from "./starterTransactions";

const TRANSACTIONS = "transactions";

export function loadTransactions(): Transaction[] {
  const savedTransactions = localStorage.getItem(TRANSACTIONS);

  // No storage entry means this is a first visit, so seed the app with examples.
  if (!savedTransactions) {
    return createStarterTransactions();
  }

  try {
    const storedTransactions = JSON.parse(
      savedTransactions,
    ) as StoredTransaction[];

    return storedTransactions.map((transaction) => ({
      ...transaction,
      // Transactions saved before categories existed receive a safe default.
      category: transaction.category ?? Category.General,
      date: new Date(transaction.date),
    }));
  } catch {
    // Invalid saved data should not prevent the budget app from starting.
    return createStarterTransactions();
  }
}

export function saveTransactions(transactions: Transaction[]) {
  localStorage.setItem(TRANSACTIONS, JSON.stringify(transactions));
}
