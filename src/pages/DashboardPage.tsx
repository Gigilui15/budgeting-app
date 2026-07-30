import { AddTransactionForm } from "../features/transactions/components/AddTransactionForm";
import { BalanceCard } from "../features/transactions/components/BalanceCard";
import { RecentTransactions } from "../features/transactions/components/RecentTransactions";
import { useTransactionsContext } from "../features/transactions/TransactionsContext";

const DashboardPage = () => {
  const { transactions, balance, addTransaction, removeLatestTransaction } =
    useTransactionsContext();

  return (
    <section>
      <h1>My Budget</h1>
      <p>A simple way to manage your wealth.</p>

      <BalanceCard balance={balance} />
      <RecentTransactions transactions={transactions} />

      <button
        onClick={removeLatestTransaction}
        disabled={transactions.length === 0}
      >
        Remove Latest Transaction
      </button>

      <AddTransactionForm onAddTransaction={addTransaction} />
    </section>
  );
};

export default DashboardPage;
