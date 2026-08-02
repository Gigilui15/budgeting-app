import { useParams } from "react-router-dom";
import type { Transaction } from "../transactionTypes";
import { useUserData } from "../../auth/UserDataContext";

const TransactionDetailsPage = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { transactions } = useUserData();

  const transaction = transactions.find(
    (t: Transaction) => t.id === transactionId,
  );

  return <div>Transaction: {transaction?.id}</div>;
};

export default TransactionDetailsPage;
