// Imported Components
import CardTransHeaders from "../../features/transaction/CardTransHeaders";
import CardTransAmount from "../../features/transaction/CardTransAmount";
import CardTransDesc from "../../features/transaction/CardTransDesc";
import { useState } from "react";
import { Transaction } from "@/types/type";
import CardDayTransactions from "@/features/transaction/CardDayTransactions";
import { getDate } from "@/lib/date";
import { ClipboardPlus } from "lucide-react";

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

  return (
    <main className="flex flex-col gap-4 p-4">
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <ClipboardPlus size={30} />
        <h1 className="font-bold text-2xl">Add Transactions</h1>
      </header>
      <CardTransHeaders
        transaction={transaction}
        setTransaction={setTransaction}
      />
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
