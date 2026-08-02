import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

import { useUserData } from "../../auth/UserDataContext";
import { AddTransactionForm } from "../components/AddTransactionForm";
import { BalanceCard } from "../components/BalanceCard";
import { RecentTransactions } from "../components/RecentTransactions";

const TransactionsPage = () => {
  const {
    balance,
    transactions,
    selectedAccount,
    addTransaction,
    removeTransaction,
  } = useUserData();

  const [displayForm, setDisplayForm] = useState(false);

  return (
    <section className="transactions-page">
      <div className="transactions-page__header">
        <BalanceCard balance={balance} />

        <button
          type="button"
          className="add-button"
          onClick={() => setDisplayForm(true)}
          disabled={displayForm}
        >
          <MdAdd aria-hidden="true" />
          <span>Add transaction</span>
        </button>
      </div>

      {displayForm ? (
        <div className="transaction-form-panel">
          <button
            type="button"
            className="delete-button"
            aria-label="Close transaction form"
            title="Close transaction form"
            onClick={() => setDisplayForm(false)}
          >
            <MdClose aria-hidden="true" />
          </button>

          <AddTransactionForm
            accountId={selectedAccount.id}
            onAddTransaction={addTransaction}
          />
        </div>
      ) : null}

      <RecentTransactions
        transactions={transactions}
        onDeleteTransaction={removeTransaction}
      />
    </section>
  );
};

export default TransactionsPage;
