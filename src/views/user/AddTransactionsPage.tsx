// Imported Components
import CardTransHeaders from "../../features/transaction/CardTransHeaders";
import CardTransDesc from "../../features/transaction/CardTransDesc";
import { FormEvent, useEffect, useState } from "react";
import CardDayTransactions from "@/features/transaction/CardDayTransactions";
import { ClipboardPlus, Plus } from "lucide-react";
import { CURRENCY_OBJ } from "@/lib/data";
import { format } from "date-fns";
import FormAddTransaction from "@/features/transaction/FormAddTransaction";
import { useAddTransactionMutation } from "@/features/transaction/transactionApiSlice";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { T_Transaction } from "@/lib/templates";
import { useLazyGetAccountsQuery } from "@/features/cards/accountSlice";

export default function AddTransactionsPage() {
  const [getAccounts, { data, isSuccess }] = useLazyGetAccountsQuery();

  const userAccounts = isSuccess ? data?.data : [];

  const [addTransaction] = useAddTransactionMutation();

  const [transaction, setTransaction] = useState(T_Transaction);
  const [show, setShow] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      const response = await addTransaction({
        ...transaction,
        id: crypto.randomUUID(),
      });

      if (response?.data) {
        toast.success("Transaction Saved");
      } else if (response?.error) {
        toast.error("Error saving transaction");
      }
    } catch (error) {
      toast.error("Error saving transaction");
    }
  };

  useEffect(() => {
    getAccounts(null);
  }, []);

  return (
    <main>
      <header className="flex items-stretch gap-2">
        <ClipboardPlus size={30} />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Add</h1>
          <p className="text-sm">Add Transactions</p>
        </div>
        <button
          title="Custom description"
          onClick={() => setShowAddForm(true)}
          className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center my-auto bg-zinc-200 hover:bg-zinc-300 duration-200 rounded-full"
        >
          <Plus size={20} className="mx-auto" />
        </button>
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
            {userAccounts?.map((item) => {
              const color =
                item.type === "card"
                  ? item?.color === "green"
                    ? "from-green-700 to-green-950"
                    : item?.color === "red"
                    ? "from-red-700 to-red-950"
                    : item?.color === "blue"
                    ? "from-blue-700 to-sky-950"
                    : "from-stone-700 to-zinc-950"
                  : "";

              return (
                <button
                  key={item?.id}
                  className={" bg-gradient-to-br " + color}
                >
                  {item.name}
                </button>
              );
            })}
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
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2"
      >
        <Input
          type="number"
          value={transaction?.amount}
          onChange={(e) =>
            setTransaction((curr) => ({ ...curr, amount: +e.target.value }))
          }
        />
        <Button type="submit">Add</Button>
      </form>
      <CardDayTransactions transaction={transaction} />
      {showAddForm && <FormAddTransaction setAdd={setShowAddForm} />}
    </main>
  );
}
