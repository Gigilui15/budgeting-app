import { useEffect, useState, type ReactNode } from "react";
import type { Transaction } from "../transactions/transactionTypes";
import { loadAppData, saveAppData } from "../../data/appDataRepository";
import type { AppData } from "../../data/dummyData";
import { calculateBalance } from "../transactions/transactionUtils";
import { useAuth } from "./AuthContext";
import { UserDataContext } from "./UserDataContext";

export function UserDataProvider({ children }: { children: ReactNode }) {
  const { profileId } = useAuth();
  const [appData, setAppData] = useState<AppData>(loadAppData);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  if (!profileId) {
    throw new Error("UserDataProvider requires an authenticated profile.");
  }

  const profile = appData.profiles.find(
    (candidate) => candidate.id === profileId,
  );

  const accounts = appData.accounts.filter(
    (account) => account.profileId === profileId,
  );

  if (!profile) {
    throw new Error("The authenticated profile no longer exists.");
  }

  if (accounts.length === 0) {
    throw new Error("The authenticated profile has no accounts.");
  }

  const selectedAccount =
    accounts.find((account) => account.id === selectedAccountId) ?? accounts[0];

  const transactions = appData.transactions.filter(
    (transaction) => transaction.accountId === selectedAccount.id,
  );

  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  function selectAccount(accountId: string) {
    const ownsAccount = accounts.some((account) => account.id === accountId);

    if (!ownsAccount) {
      throw new Error("You cannot select another profile's account.");
    }

    setSelectedAccountId(accountId);
  }

  function addTransaction(transaction: Transaction) {
    const ownsAccount = accounts.some(
      (account) => account.id === transaction.accountId,
    );

    if (!ownsAccount) {
      throw new Error(
        "You cannot add a transaction to another profile's account.",
      );
    }

    setAppData((currentData) => ({
      ...currentData,
      transactions: [...currentData.transactions, transaction],
    }));
  }

  function removeLatestTransaction() {
    setAppData((currentData) => {
      // Re-check ownership against the latest state at deletion time instead of
      // trusting only the transaction list that was rendered previously.
      const ownedAccountIds = new Set(
        currentData.accounts
          .filter((account) => account.profileId === profileId)
          .map((account) => account.id),
      );

      let latestOwnedTransaction: Transaction | undefined;

      for (let index = currentData.transactions.length - 1; index >= 0; index--) {
        const candidate = currentData.transactions[index];

        if (
          candidate.accountId === selectedAccount.id &&
          ownedAccountIds.has(candidate.accountId)
        ) {
          latestOwnedTransaction = candidate;
          break;
        }
      }

      // Having nothing eligible to delete is a harmless no-op. The transaction
      // page also disables its button when this account has no transactions.
      if (!latestOwnedTransaction) {
        return currentData;
      }

      return {
        ...currentData,
        transactions: currentData.transactions.filter(
          (transaction) => transaction.id !== latestOwnedTransaction.id,
        ),
      };
    });
  }

  const visibleProfile = {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    tier: profile.tier,
  };

  const value = {
    profile: visibleProfile,
    accounts,
    selectedAccount,
    transactions,
    selectAccount,
    addTransaction,
    removeLatestTransaction,
    balance: selectedAccount.balance + calculateBalance(transactions),
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
