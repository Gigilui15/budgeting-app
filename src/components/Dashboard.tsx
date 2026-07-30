import { AddTransactionForm } from "../components/AddTransactionForm";
import { BalanceCard } from "../components/BalanceCard";
import { RecentTransactions } from "../components/RecentTransactions";
import { useTransactions } from "../hooks/useTransactions";

const Dashboard = () => {
  const { transactions, balance, addTransaction, removeLatestTransaction } =
    useTransactions();

  return (
        <main>
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
        </main>
  )
}

export default Dashboard