type BalanceCardProps = {
  balance: number;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function BalanceCard({ balance }: BalanceCardProps) {
  return <h1>Current Balance: {currencyFormatter.format(balance)}</h1>;
}
