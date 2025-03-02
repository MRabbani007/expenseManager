import CardTransDesc from "../../features/transaction/CardTransDesc";
import { FormEvent, useEffect, useState } from "react";
import { ClipboardPlus, Plus } from "lucide-react";
import { format } from "date-fns";
import FormAddTransaction from "@/features/transaction/FormAddTransaction";
import {
  useAddTransactionMutation,
  useLazyGetTransactionsQuery,
} from "@/features/transaction/transactionApiSlice";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { T_Transaction } from "@/lib/templates";
import FormSelectCard from "@/features/transaction/FormSelectCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getDate } from "@/lib/date";
import CardTransaction from "@/features/transaction/CardTransaction";
import FormEditTransaction from "@/features/transaction/FormEditTransaction";

export default function AddTransactionsPage() {
  const [addTransaction] = useAddTransactionMutation();

  const [getTransactions, { data, isLoading, isSuccess, isError }] =
    useLazyGetTransactionsQuery();

  const [lastUsed, setLastUsed] = useLocalStorage({
    key: "transaction",
    initValue: T_Transaction,
  });

  const [transaction, setTransaction] = useState<Transaction>({
    ...T_Transaction,
    ...lastUsed,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Transaction | null>(null);

  useEffect(() => {
    const temp = transaction?.date ?? getDate(new Date());
    getTransactions({ type: "period", startDate: temp, endDate: temp });
  }, [transaction?.date]);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      setLastUsed(transaction);

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

  let content = null;
  let income = 0;
  let expense = 0;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error Loading Transactions</p>;
  } else if (isSuccess) {
    data.data.map((item) => {
      if (item?.type === "expense") {
        expense += item?.amount ?? 0;
      } else if (item?.type === "income") {
        income += item?.amount ?? 0;
      }
    });

    if (data.data.length === 0) {
      content = <p>No Transactions</p>;
    } else {
      content = data.data.map((item) => {
        return (
          <CardTransaction
            key={item?.id}
            transaction={item}
            setEdit={setEdit}
            setEditItem={setEditItem}
          />
        );
      });
    }
  }

  return (
    <main>
      <header className="flex items-center gap-2">
        <ClipboardPlus size={30} className="mb-auto" />
        <div className="flex-1 mb-auto">
          <h1 className="text-xl font-semibold">Add</h1>
          <p className="text-sm hidden md:block">Add Transactions</p>
        </div>
        <div className="flex flex-col-reverse gap-2">
          <div className="flex items-center gap-2">
            <button
              title="Custom description"
              onClick={() => setShowAddForm(true)}
              className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center my-auto bg-zinc-200 hover:bg-zinc-300 duration-200 rounded-full"
            >
              <Plus size={20} className="mx-auto" />
            </button>
            <FormSelectCard
              transaction={transaction}
              setTransaction={setTransaction}
            />
          </div>
          <div className="flex items-stretch gap-2 rounded-lg relative">
            <p className="flex-1">
              {format(transaction.date ?? "", "EE dd MMM")}
            </p>
            <div
              className={`w-2 shrink-0 bg-${
                transaction.type === "expense"
                  ? "red-600"
                  : transaction.type === "income"
                  ? "green-600"
                  : "stone-100"
              }`}
            ></div>
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
      <div className="flex flex-col gap-2">{content}</div>
      {showAddForm && (
        <FormAddTransaction transaction={transaction} setAdd={setShowAddForm} />
      )}
      {edit && editItem && (
        <FormEditTransaction transaction={editItem} setEdit={setEdit} />
      )}
    </main>
  );
}
