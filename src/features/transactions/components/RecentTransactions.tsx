import { useState } from "react";

import {
  TransactionType,
  type Transaction,
} from "../transactionTypes";

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  // Boolean state is enough because this component only needs two states: shown or hidden.
  const [isHidden, setIsHidden] = useState(false);

  return (
    <section>
      <h2>Recent Transactions</h2>
      <button onClick={() => setIsHidden((currentValue) => !currentValue)}>
        {isHidden ? "Show Transactions" : "Hide Transactions"}
      </button>

      {/* Conditional rendering removes the list from the page instead of only hiding it with CSS. */}
      {!isHidden && (
        <ul>
          {transactions.length === 0 ? (
            <li>No transactions yet.</li>
          ) : (
            transactions.map((transaction) => (
              <li key={transaction.id}>
                {transaction.id}: 
                {transaction.date.toDateString() + ": "} 
                {transaction.description} - {transaction.category} {transaction.type === TransactionType.Income ? "+" : "-"}
                ${transaction.amount.toFixed(2)}
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
}
