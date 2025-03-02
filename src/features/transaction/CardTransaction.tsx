import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
// import { DESCRIPTIONS } from "@/lib/data";

export default function CardTransaction({
  transaction,
  setEdit,
  setEditItem,
}: {
  transaction: Transaction;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Transaction | null>>;
}) {
  const image =
    typeof transaction?.descId === "string"
      ? transaction?.descId
      : transaction?.descId?.icon;
  // DESCRIPTIONS.find((item) => item.value === transaction.description)?.icon ??
  // "images/expense.png";

  const type =
    transaction?.type === "expense"
      ? "bg-red-700"
      : transaction?.type === "income"
      ? "bg-green-700"
      : "bg-zinc-700";

  return (
    <div
      onClick={() => {
        setEdit(true);
        setEditItem(transaction);
      }}
      className={
        "flex justify-start items-stretch gap-2 bg-zinc-100 pl-4 group"
      }
    >
      <div className="my-auto">
        <img src={image} alt="desc" className="w-10" />
        {/* {transaction?.descId?.toString()} */}
      </div>
      <div className="flex-1 py-2 my-auto grid grid-cols-1 md:grid-cols-2">
        <p className="font-medium">{transaction?.details}</p>
        <p className="font-bold">{transaction.description}</p>
        <p className="md:hidden font-semibold text-zinc-700">
          {transaction.category}
        </p>
      </div>
      <div className="flex-1 py-2 my-auto hidden md:grid grid-cols-1 md:grid-cols-2">
        <p className="font-semibold text-zinc-700">
          {format(transaction?.date ?? "", "EE dd MMM")}
        </p>
        <p className="font-semibold text-zinc-700">{transaction.category}</p>
      </div>
      <div className="flex-1 py-2 px-4 my-auto grid grid-cols-1 sm:grid-cols-2 text-end">
        <p className="flex gap-1 items-center justify-end sm:text-start">
          <span className="">{transaction.currency}</span>
          <span className="font-bold">
            {transaction.amount?.toLocaleString("en-US")}
          </span>
        </p>
        <p className="font-semibold text-zinc-700 text-sm">
          {transaction.paymethod}
        </p>
        <p className="md:hidden">
          {format(transaction?.date ?? "", "EE dd MMM")}
        </p>
      </div>
      <div className={"w-2 " + type} />
    </div>
  );
}
