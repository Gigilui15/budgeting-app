import { AddTransactionForm } from "../components/AddTransactionForm";
import { BalanceCard } from "../components/BalanceCard";
import { RecentTransactions } from "../components/RecentTransactions";
import { useUserData } from "../../auth/UserDataContext";

const TransactionsPage = () => {
  const {
    balance,
    transactions,
    selectedAccount,
    addTransaction,
    removeLatestTransaction,
  } =
    useUserData();

  return (
    <div>
      <BalanceCard balance={balance} />
      <RecentTransactions transactions={transactions} />

      <button
        onClick={removeLatestTransaction}
        disabled={transactions.length === 0}
      >
        Remove Latest Transaction
      </button>

      <AddTransactionForm
        accountId={selectedAccount.id}
        onAddTransaction={addTransaction}
      />
    </div>
  );
};

export default TransactionsPage;
