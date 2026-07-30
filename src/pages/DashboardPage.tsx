import { BalanceCard } from "../features/transactions/components/BalanceCard";
import { useTransactionsContext } from "../features/transactions/TransactionsContext";

const DashboardPage = () => {
  const { balance } = useTransactionsContext();

  return (
    <section>
      <h1>My Budget</h1>
      <p>A simple way to manage your wealth.</p>

      <BalanceCard balance={balance} />
    </section>
  );
};

export default DashboardPage;
