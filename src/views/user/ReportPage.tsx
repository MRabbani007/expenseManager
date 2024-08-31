import { Button } from "@/components/ui/button";
import CardSelectPeriod from "@/features/report/CardSelectPeriod";
import { useLazyGetTransactionsQuery } from "@/features/transaction/transactionApiSlice";
import { DESCRIPTIONS } from "@/lib/data";
import { getDate } from "@/lib/date";
import { TimePeriod, Transaction } from "@/types/type";
import { ClipboardMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

const initialState: TimePeriod = {
  period: "day",
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
  offset: 0,
};

export default function ReportPage() {
  const [state, setState] = useState<TimePeriod | null>(initialState);

  const [getTransactions, { data, isLoading, isSuccess, isError }] =
    useLazyGetTransactionsQuery();

  useEffect(() => {}, []);

  const onSubmit = async () => {
    if (state?.startDate && state?.endDate) {
      await getTransactions({
        startDate: state?.startDate,
        endDate: state?.endDate,
      });
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
    <main className="flex flex-col gap-4">
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <ClipboardMinus size={30} />
        <h1 className="font-bold text-2xl">View Transactions</h1>
      </header>
      <CardSelectPeriod state={state} setState={setState} />
      <Button onClick={onSubmit} className="w-fit">
        Submit
      </Button>
      <div className="flex items-stretch gap-4 justify-center">
        <div className="p-4 bg-green-800/20 text-green-800 rounded-lg font-bold flex-1 flex items-center justify-between">
          <p className="">
            <GiReceiveMoney size={40} />
          </p>
          <p className="space-x-2 text-xl">
            <span>{"KZT"}</span>
            <span>{income.toLocaleString("en-us")}</span>
          </p>
        </div>
        <div className="p-4 bg-red-700/20 text-red-700 rounded-lg font-bold flex-1 flex items-center justify-between">
          <p>
            <GiPayMoney size={40} />
          </p>
          <p className="space-x-2 text-xl">
            <span>{"KZT"}</span>
            <span>{expense.toLocaleString("en-us")}</span>
          </p>
        </div>
      </div>
      <>{content}</>
    </main>
  );
}
