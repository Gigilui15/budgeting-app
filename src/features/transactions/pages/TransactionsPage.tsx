import { AddTransactionForm } from "../components/AddTransactionForm";
import { BalanceCard } from "../components/BalanceCard";
import { RecentTransactions } from "../components/RecentTransactions";
import { useTransactionsContext } from "../TransactionsContext";

const TransactionsPage = () => {
  const { balance, transactions, addTransaction, removeLatestTransaction } =
    useTransactionsContext();

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

      <AddTransactionForm onAddTransaction={addTransaction} />
    </div>
  );
};

export default TransactionsPage;
