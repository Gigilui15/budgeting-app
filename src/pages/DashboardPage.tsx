import { BalanceCard } from "../features/transactions/components/BalanceCard";
import { useUserData } from "../features/auth/UserDataContext";

const DashboardPage = () => {
  const { balance } = useUserData();

  return (
    <section>
      <h1>My Budget</h1>
      <p>A simple way to manage your wealth.</p>

      <BalanceCard balance={balance} />
    </section>
  );
};

export default DashboardPage;
