import { useEffect, useState } from "react";

import CardSelectPeriod from "@/features/report/CardSelectPeriod";
import { useLazyGetTransactionsQuery } from "@/features/transaction/transactionApiSlice";
import { Button } from "@/components/ui/button";
import { getDate } from "@/lib/date";
import { format } from "date-fns";
import { ClipboardMinus } from "lucide-react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import CardTransaction from "@/features/transaction/CardTransaction";
import useLocalStorage from "@/hooks/useLocalStorage";

const initialState: TimePeriod = {
  period: "day",
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
  offset: 0,
};

export default function ReportPage() {
  const [lastUsed, setLastUsed] = useLocalStorage({
    key: "reportPage",
    initValue: initialState,
  });

  const [state, setState] = useState<TimePeriod | null>(initialState);
  const [showSelect, setShowSelect] = useState(false);

  const [getTransactions, { data, isLoading, isSuccess, isError }] =
    useLazyGetTransactionsQuery();

  useEffect(() => {
    if (lastUsed) {
      setState(lastUsed);
    }
  }, []);

  useEffect(() => {
    if (!showSelect) {
      onSubmit();
    }
  }, [state]);

  const onSubmit = async () => {
    if (state?.startDate && state?.endDate) {
      setShowSelect(false);

      setLastUsed(state);
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
        return <CardTransaction key={index} transaction={transaction} />;
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
