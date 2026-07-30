import { useParams } from "react-router-dom";
import type { Transaction } from "../transactionTypes";
import { useTransactionsContext } from "../TransactionsContext";

const TransactionDetailsPage = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { transactions } = useTransactionsContext();

  const transaction = transactions.find(
    (t: Transaction) => t.id === transactionId,
  );

  return <div>Transaction: {transaction?.id}</div>;
};

export default TransactionDetailsPage;
