import type { Account, Profile } from "../features/profile/profileTypes";
import type { Transaction } from "../features/transactions/transactionTypes";
import { createDummyData, type AppData } from "./dummyData";

const APP_DATA_KEY = "budget-base-data";

type StoredTransaction = Omit<Transaction, "date"> & {
  date: string;
};

type StoredAppData = Omit<AppData, "transactions"> & {
  transactions: StoredTransaction[];
};

export function loadAppData(): AppData {
  const savedData = localStorage.getItem(APP_DATA_KEY);

  if (!savedData) {
    const dummyData = createDummyData();
    saveAppData(dummyData);
    return dummyData;
  }

  try {
    const storedData = JSON.parse(savedData) as StoredAppData;

    return {
      ...storedData,
      transactions: storedData.transactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date),
      })),
    };
  } catch {
    const dummyData = createDummyData();
    saveAppData(dummyData);
    return dummyData;
  }
}

export function saveAppData(data: AppData): void {
  localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
}

export function findProfileByEmail(
  data: AppData,
  email: string,
): Profile | undefined {
  return data.profiles.find(profile => profile.email === email);
}

export function getAccountsForProfile(
  data: AppData,
  profileId: string,
): Account[] {
  return data.accounts.filter(
    account => account.profileId === profileId,
  );
}

export function getTransactionsForAccounts(
  data: AppData,
  accounts: Account[],
): Transaction[] {
  const accountIds = new Set(
    accounts.map(account => account.id),
  );

  return data.transactions.filter(transaction =>
    accountIds.has(transaction.accountId),
  );
}