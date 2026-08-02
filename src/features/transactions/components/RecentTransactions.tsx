import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { TransactionType, type Transaction } from "../transactionTypes";

type RecentTransactionsProps = {
  transactions: Transaction[];
  onDeleteTransaction: (transactionId: string) => void;
};

export function RecentTransactions({
  transactions,
  onDeleteTransaction,
}: RecentTransactionsProps) {
  const navigate = useNavigate();

  return (
    <div className="transaction-table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="transaction-table__empty">
                No transactions yet.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => {
              const isIncome = transaction.type === TransactionType.Income;

              return (
                <tr
                  key={transaction.id}
                  className="transaction-table__row"
                  tabIndex={0}
                  role="link"
                  aria-label={`View ${transaction.description} transaction details`}
                  onClick={() =>
                    navigate(`/transactions/${transaction.id}`, {
                      state: { from: "/transactions" },
                    })
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      navigate(`/transactions/${transaction.id}`, {
                        state: { from: "/transactions" },
                      });
                    }
                  }}
                >
                  <td>{transaction.date.toLocaleDateString()}</td>
                  <td className="transaction-table__description">
                    {transaction.description}
                  </td>
                  <td>
                    <span
                      className={
                        isIncome
                          ? "transaction-type transaction-type--income"
                          : "transaction-type transaction-type--expense"
                      }
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td
                    className={
                      isIncome
                        ? "transaction-amount transaction-amount--income"
                        : "transaction-amount transaction-amount--expense"
                    }
                  >
                    {isIncome ? "+" : "-"}
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="transaction-delete-button"
                      aria-label={`Delete ${transaction.description}`}
                      title={`Delete ${transaction.description}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteTransaction(transaction.id);
                      }}
                      onKeyDown={(event) => event.stopPropagation()}
                    >
                      <MdDelete aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
