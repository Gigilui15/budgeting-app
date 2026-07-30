import { useParams } from "react-router-dom";
import { type Transaction } from "../types/transaction";
import { useTransactionsContext } from "./TransactionsContext";

const TransactionDetails = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { transactions } = useTransactionsContext();

  const transaction = transactions.find(
    (t: Transaction) => t.id === transactionId,
  );

  return <div>Transaction: {transaction?.id}</div>;
};

export default TransactionDetails;
