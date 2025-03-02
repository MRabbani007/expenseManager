import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ClipboardPlus, Ellipsis } from "lucide-react";
import {
  useAddTransactionMutation,
  useLazyGetTransactionsQuery,
} from "@/features/transaction/transactionApiSlice";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { T_Transaction } from "@/lib/templates";
import FormSelectCard from "@/features/transaction/FormSelectCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getDate } from "@/lib/date";
import CardTransaction from "@/features/transaction/CardTransaction";
import FormEditTransaction from "@/features/transaction/FormEditTransaction";
import { useAppSelector } from "@/app/hooks";
import {
  selectSelectedDescriptions,
  selectUserDescriptions,
} from "@/features/globals/globalsSlice";
import ToolTip from "@/components/ToolTip";
import FormSelectDescriptions from "@/features/transaction/FormSelectDescriptions";
import InputField from "@/components/InputField";

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

  const descriptions = useAppSelector(selectUserDescriptions);
  const selectedDescriptions = useAppSelector(selectSelectedDescriptions);

  const [customId, setCustomId] = useState("");

  const [activeDesc, setActiveDesc] = useState<Description[]>([]);
  const [editDescriptions, setEditDescriptions] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Transaction | null>(null);

  useEffect(() => {
    setLastUsed(transaction);
  }, [transaction]);

  useEffect(() => {
    const temp = transaction?.date ?? getDate(new Date());
    getTransactions({ type: "period", startDate: temp, endDate: temp });
  }, [transaction?.date]);

  useEffect(() => {
    const handleActiveDesc = () => {
      setActiveDesc(() => {
        if (!descriptions) return [];

        if (!selectedDescriptions || selectedDescriptions.length === 0) {
          return descriptions?.filter((item) => item?.isSelected === true);
        }

        return descriptions.filter((item) =>
          selectedDescriptions?.find((selDesc) => selDesc.id === item.id)
            ? true
            : false
        );
      });

      const temp = descriptions?.find((item) => item.value === "custom");
      if (temp) {
        setCustomId(temp?._id);
      }
    };

    handleActiveDesc();
  }, [descriptions, selectedDescriptions]);

  const handleDesc = (desc: Description) => {
    setTransaction((curr) => ({
      ...curr,
      category: desc.category,
      description: desc.value,
      descId: desc?._id,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTransaction((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

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

  const isCustomDesc = transaction?.descId === customId;

  return (
    <main>
      <header className="flex items-center gap-2">
        <ClipboardPlus size={30} className="mb-auto" />
        <div className="flex-1 mb-auto">
          <h1 className="text-xl font-semibold">Add</h1>
          <p className="text-sm hidden md:block">Add Transactions</p>
        </div>
        <FormSelectCard
          transaction={transaction}
          setTransaction={setTransaction}
        />
      </header>
      <div
        title="Description"
        className="flex flex-wrap items-stretch gap-2 group/desc"
      >
        {activeDesc.map((item, index) => (
          <ToolTip key={index} title={item.label}>
            <img
              key={index}
              src={item?.icon}
              className={
                (transaction?.description === item.value
                  ? " bg-yellow-300"
                  : " bg-white") +
                " p-1 rounded-lg w-16 hover:scale-110 duration-200"
              }
              onClick={() => handleDesc(item)}
            />
          </ToolTip>
        ))}
        <button
          title="More options"
          onClick={() => setEditDescriptions(true)}
          type="button"
          className="flex items-center justify-center w-16 hover:scale-110 duration-200 bg-white rounded-lg "
        >
          {/* invisible opacity-0 group-hover/desc:visible group-hover/desc:opacity-100 */}
          <Ellipsis size={30} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap flex-col md:flex-row items-stretch md:items-end justify-start gap-2"
      >
        <InputField
          type="text"
          label="Description"
          name="description"
          value={transaction?.description ?? ""}
          handleChange={handleChange}
          disabled={!isCustomDesc}
          className="flex-1"
        />
        <InputField
          label="Details"
          name="details"
          type="text"
          value={transaction?.details ?? ""}
          handleChange={handleChange}
          className="flex-1"
        />
        <InputField
          type="number"
          value={transaction?.amount}
          label="Amount"
          name="amount"
          handleChange={handleChange}
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>
      <div className="flex flex-col gap-2">{content}</div>
      {editDescriptions && (
        <FormSelectDescriptions setShowForm={setEditDescriptions} />
      )}
      {edit && editItem && (
        <FormEditTransaction transaction={editItem} setEdit={setEdit} />
      )}
    </main>
  );
}
