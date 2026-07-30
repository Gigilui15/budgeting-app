export enum Category {
  General = "general expenses",
  Groceries = "groceries",
  Health = "health",
  Investing = "investments",
}

export enum TransactionType {
  Expense = "expense",
  Income = "income",
}

// A TypeScript type describes the exact shape every transaction must follow.
export type Transaction = {
  id: string;
  description: string;
  type: TransactionType;
  category: Category;
  date: Date;
  amount: number;
};

// JSON cannot store Date objects, so this is the shape we receive from local storage.
export type StoredTransaction = Omit<Transaction, "date"> & {
  date: string;
};
