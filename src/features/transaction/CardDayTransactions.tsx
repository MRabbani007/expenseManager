import { useEffect, useState } from "react";
import { useLazyGetTransactionsQuery } from "./transactionApiSlice";
import { getDate } from "@/lib/date";
import { Transaction } from "@/types/type";
import { FiEdit } from "react-icons/fi";
import FormEditTransaction from "./FormEditTransaction";
import { DESCRIPTIONS } from "@/lib/data";

export default function CardDayTransactions({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [getTransactions, { data, isLoading, isSuccess, isError }] =
    useLazyGetTransactionsQuery();

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Transaction | null>(null);

  useEffect(() => {
    const temp = transaction?.date ?? getDate(new Date());
    getTransactions({ startDate: temp, endDate: temp });
  }, [transaction?.date]);

  let content = null;
  let income = 0;
  let expense = 0;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <p>Error Loading Transactions</p>;
  } else if (isSuccess) {
    data.ids.map((id) => {
      const item = data.entities[id] as Transaction;
      if (item?.type === "expense") {
        expense += item?.amount ?? 0;
      } else if (item?.type === "income") {
        income += item?.amount ?? 0;
      }
    });

    if (data.ids.length === 0) {
      content = <p>No Transactions</p>;
    } else {
      content = data.ids.map((id, index) => {
        const transaction = data.entities[id] as Transaction;
        const image =
          DESCRIPTIONS.find((item) => item.value === transaction.description)
            ?.image ?? "images/expense.png";
        const type =
          transaction?.type === "expense"
            ? "bg-red-700"
            : transaction?.type === "income"
            ? "bg-green-700"
            : "bg-zinc-700";
        return (
          <div key={index} className={"flex items-stretch gap-2 bg-zinc-100"}>
            <div className="py-2 px-2 my-auto">
              <img src={image} alt="desc" className="w-10" />
            </div>
            <div className="py-2 flex-1 my-auto">
              <p className="font-bold text-xl">{transaction.description}</p>
              <p className="font-semibold text-zinc-700">
                {transaction.category}
              </p>
            </div>
            <div className="py-2 px-4 my-auto">
              <p className="space-x-2 font-bold text-xl">
                <span className="">{transaction.currency}</span>
                <span>{transaction.amount?.toLocaleString("en-US")}</span>
              </p>
              <p className="font-semibold text-zinc-700 text-end">
                {transaction.paymethod}
              </p>
            </div>
            <div className={"w-2 " + type} />
          </div>
        );
      });
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <>{content}</>
      {editItem === null ? null : (
        <FormEditTransaction transaction={editItem} setEdit={setEditItem} />
      )}
    </div>
  );
}
