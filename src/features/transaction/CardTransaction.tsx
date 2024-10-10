import { Edit, Paperclip } from "lucide-react";
import { useState } from "react";
import FormEditTransaction from "./FormEditTransaction";
import { DESCRIPTIONS } from "@/lib/data";

export default function CardTransaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [edit, setEdit] = useState(false);

  const image =
    DESCRIPTIONS.find((item) => item.value === transaction.description)?.icon ??
    "images/expense.png";

  const type =
    transaction?.type === "expense"
      ? "bg-red-700"
      : transaction?.type === "income"
      ? "bg-green-700"
      : "bg-zinc-700";

  return (
    <div
      className={
        "flex justify-start items-stretch gap-2 bg-zinc-100 pl-4 group"
      }
    >
      <div className="my-auto">
        <img src={image} alt="desc" className="w-8" />
      </div>
      <div className="py-2 flex-1 my-auto grid grid-cols-1 sm:grid-cols-2">
        <p className="font-bold">{transaction.description}</p>
        <p className="font-semibold text-zinc-700 text-xs sm:text-base">
          {transaction.category}
        </p>
      </div>
      <div className="py-2 px-4 flex-1 my-auto grid grid-cols-1 sm:grid-cols-2">
        <p className="space-x-2 font-bold text-end sm:text-start">
          <span className="">{transaction.currency}</span>
          <span>{transaction.amount?.toLocaleString("en-US")}</span>
        </p>
        <p className="font-semibold text-zinc-700 text-end text-sm">
          {transaction.paymethod}
        </p>
      </div>
      <div className="invisible group-hover:visible duration-200 my-auto">
        <button>
          <Paperclip />
        </button>
        <button onClick={() => setEdit(true)}>
          <Edit />
        </button>
      </div>
      <div className={"w-2 " + type} />
      {edit ? (
        <FormEditTransaction transaction={transaction} setEdit={setEdit} />
      ) : null}
    </div>
  );
}
