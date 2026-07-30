import { v4 as uuidv4 } from "uuid";

import {
  TransactionType,
  type Category,
  type Transaction,
} from "./transactionTypes";

export function createTransaction(
  description: string,
  amount: number,
  type: TransactionType,
  category: Category,
  date: Date,
): Transaction {
  return {
    id: uuidv4(),
    description,
    type,
    category,
    date,
    amount,
  };
}

// Derived data is calculated from transactions instead of being stored as separate state.
export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === TransactionType.Income
      ? balance + transaction.amount
      : balance - transaction.amount;
  }, 0);
}
