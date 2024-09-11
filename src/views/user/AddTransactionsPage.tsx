// Imported Components
import CardTransHeaders from "../../features/transaction/CardTransHeaders";
import CardTransAmount from "../../features/transaction/CardTransAmount";
import CardTransDesc from "../../features/transaction/CardTransDesc";
import { useState } from "react";
import CardDayTransactions from "@/features/transaction/CardDayTransactions";
import { getDate } from "@/lib/date";
import { ClipboardPlus } from "lucide-react";
import { CURRENCY_OBJ } from "@/lib/data";
import { format } from "date-fns";

const initialState: Transaction = {
  id: "",
  amount: 0,
  category: "",
  currency: "KZT",
  description: "",
  paymethod: "cash",
  type: "expense",
  date: getDate(new Date()),
};

const AddTransactionsPage = () => {
  const [transaction, setTransaction] = useState(initialState);
  const [show, setShow] = useState(false);

  return (
    <main>
      <header className="flex items-stretch gap-2">
        <ClipboardPlus size={30} />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Add</h1>
          <p className="text-sm">Add Transactions</p>
        </div>
        <div
          className="flex items-stretch gap-2 rounded-lg relative"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <img
            src={CURRENCY_OBJ[transaction?.currency ?? "KZT"]}
            alt={transaction?.currency ?? "Currency"}
            className="w-12 h-12"
          />
          <div>
            <p>{format(transaction.date ?? "", "EE dd MMM")}</p>
            <p>
              <span>{transaction.paymethod}</span>
            </p>
          </div>
          <div
            className={`w-2 shrink-0 bg-${
              transaction.type === "expense"
                ? "red-600"
                : transaction.type === "income"
                ? "green-600"
                : "stone-100"
            }`}
          ></div>
          <div
            className={
              (show ? "" : "-translate-y-4 opacity-0 invisible") +
              " absolute top-full right-0 bg-stone-100 p-4 rounded-lg duration-200"
            }
          >
            <CardTransHeaders
              transaction={transaction}
              setTransaction={setTransaction}
            />
          </div>
        </div>
      </header>
      <CardTransDesc
        transaction={transaction}
        setTransaction={setTransaction}
      />
      <CardTransAmount
        transaction={transaction}
        setTransaction={setTransaction}
      />
      <CardDayTransactions transaction={transaction} />
    </main>
  );
};

export default AddTransactionsPage;
