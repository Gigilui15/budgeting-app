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

export type Transaction = {
  id: string;
  accountId: string, //The transaction account id
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
