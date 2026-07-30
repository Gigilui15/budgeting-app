import { v4 as uuidv4 } from "uuid";

import { Category, TransactionType, type Transaction } from "../types/transaction";

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
    date: date,
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

export function createStarterTransactions(): Transaction[] {
  return [
    createTransaction("Milk, Eggs, and Cheese", 10, TransactionType.Expense, Category.Groceries, new Date()),
    createTransaction("Medicine", 50, TransactionType.Expense, Category.Health, new Date()),
    createTransaction("Deposit", 120, TransactionType.Income, Category.Investing, new Date()),
  ];
}
