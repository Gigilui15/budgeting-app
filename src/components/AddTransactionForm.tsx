import { useRef, useEffect, useState, type SubmitEvent } from "react";
import {
  Category,
  TransactionType,
  type Transaction,
} from "../types/transaction";
import { createTransaction } from "../utils/transactions";

type AddTransactionFormProps = {
  // A callback prop lets this child send a completed transaction to its parent.
  onAddTransaction: (transaction: Transaction) => void;
};

export function AddTransactionForm({
  onAddTransaction,
}: AddTransactionFormProps) {
  // Controlled inputs: React state is the source of truth for what each input displays.
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(Category.General);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [draftTransaction, setDraftTransaction] = useState<Transaction | null>(
    null,
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (!draftTransaction) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDraftTransaction(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [draftTransaction]);

  // A ref accesses one DOM element directly; here it returns focus after submitting.
  const descriptionInput = useRef<HTMLInputElement>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericAmount = Number(amount);
    const properDate = new Date(date);

    if (!description.trim()) {
      setError("Enter a description.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    if (!(event.nativeEvent.submitter instanceof HTMLButtonElement)) {
      return;
    }
    const transactionType = event.nativeEvent.submitter
      .value as TransactionType;

    const draft = createTransaction(
      description.trim(),
      numericAmount,
      transactionType,
      category,
      properDate,
    );

    setDraftTransaction(draft);
    //End function
  }

  function handleApprove() {
    if (!draftTransaction) {
      return;
    }

    onAddTransaction(draftTransaction);

    resetForm();
  }

  function resetForm() {
    setDescription("");
    setAmount("");
    setCategory(Category.General);
    setDate(new Date().toISOString().slice(0, 10));
    setError("");
    setDraftTransaction(null);

    descriptionInput.current?.focus();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>

        <div>
          <label htmlFor="description">Description</label>
          <input
            ref={descriptionInput}
            id="description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value as Category)}
          >
            {Object.values(Category).map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        {error && <p role="alert">{error}</p>}
        <div>
          <button type="submit" value={TransactionType.Expense}>
            Log Expense
          </button>

          <button type="submit" value={TransactionType.Income}>
            Log Revenue
          </button>
        </div>
      </form>
      {draftTransaction && (
        <section>
          <h3>Review transaction</h3>
          <p>Description: {draftTransaction.description}</p>
          <p>Category: {draftTransaction.category}</p>
          <p>Date: {draftTransaction.date.toLocaleDateString()}</p>
          <p>Type: {draftTransaction.type}</p>
          <p>Amount: ${draftTransaction.amount.toFixed(2)}</p>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={resetForm}>Cancel</button>
        </section>
      )}
    </>
  );
}
