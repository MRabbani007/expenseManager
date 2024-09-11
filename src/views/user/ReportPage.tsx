import { useState } from "react";

import CardSelectPeriod from "@/features/report/CardSelectPeriod";
import { useLazyGetTransactionsQuery } from "@/features/transaction/transactionApiSlice";
import { Button } from "@/components/ui/button";
import { getDate } from "@/lib/date";
import { format } from "date-fns";
import { ClipboardMinus } from "lucide-react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

const initialState: TimePeriod = {
  period: "day",
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
  offset: 0,
};

export default function ReportPage() {
  const [state, setState] = useState<TimePeriod | null>(initialState);
  const [showSelect, setShowSelect] = useState(false);

  const [getTransactions, { data, isLoading, isSuccess, isError }] =
    useLazyGetTransactionsQuery();

  const onSubmit = async () => {
    if (state?.startDate && state?.endDate) {
      setShowSelect(false);

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
        const type =
          transaction?.type === "expense"
            ? "bg-red-700"
            : transaction?.type === "income"
            ? "bg-green-700"
            : "bg-zinc-700";
        return (
          <div key={index} className={"flex items-stretch gap-2 bg-zinc-100"}>
            {/* <div className="py-2 px-2 my-auto">
              <img src={transaction?.description ?? "images/expense.png"} alt="desc" className="w-10" />
            </div> */}
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
    <main>
      <header className="flex items-stretch gap-2">
        <ClipboardMinus size={30} />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Report</h1>
          <p className="text-sm">View Transactions</p>
        </div>
        <div
          onMouseLeave={() => {
            setShowSelect(false);
          }}
          onMouseEnter={() => setShowSelect(true)}
          className="relative my-auto"
        >
          <div className="my-auto p-2 bg-stone-50 hover:bg-stone-100 duration-200 rounded-lg text-end">
            <p className="text-xs text-stone-500">Show transactions for</p>
            <p className="text-base text-stone-900">
              <span>{format(state?.startDate ?? "", "EE dd MMM")}</span>
              {state?.period === "day" ? null : (
                <span> - {format(state?.endDate ?? "", "EE dd MMM")}</span>
              )}
            </p>
          </div>
          <div
            className={
              (showSelect ? "" : "-translate-y-4 opacity-0 invisible") +
              " absolute top-full right-0 bg-stone-100 p-4 rounded-lg duration-200"
            }
          >
            <CardSelectPeriod state={state} setState={setState} />
            <Button onClick={onSubmit} className="w-fit mt-4">
              Submit
            </Button>
          </div>
        </div>
      </header>
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
