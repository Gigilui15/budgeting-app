import {
  Category,
  TransactionType,
  type Transaction,
} from "./transactionTypes";
import { createTransaction } from "./transactionUtils";

export function createStarterTransactions(): Transaction[] {
  return [
    createTransaction(
      "Milk, Eggs, and Cheese",
      10,
      TransactionType.Expense,
      Category.Groceries,
      new Date(),
    ),
    createTransaction(
      "Medicine",
      50,
      TransactionType.Expense,
      Category.Health,
      new Date(),
    ),
    createTransaction(
      "Deposit",
      120,
      TransactionType.Income,
      Category.Investing,
      new Date(),
    ),
  ];
}
