import { useEffect, useState } from "react";
import { useLazyGetTransactionsQuery } from "@/features/transaction/transactionApiSlice";
import { format } from "date-fns";
import { ClipboardMinus, List, Rows3 } from "lucide-react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import CardTransaction from "@/features/transaction/CardTransaction";
import Pagination from "@/features/layout/Pagination";
import FormFilterTransactions from "@/features/transaction/FormFilterTransactions";
import { getDate } from "@/lib/date";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialState: TransactionFilter = {
  filterType: "latest",
  period: "day",
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
  offset: 0,
};

export default function ReportPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const [display, setDisplay] = useState("table");

  const [state, setState] = useState<TransactionFilter>(initialState);

  useEffect(() => {
    if (lastUsed) {
      setState(lastUsed);
    }
  }, []);

  const [lastUsed, setLastUsed] = useLocalStorage({
    key: "reportPage",
    initValue: initialState,
  });

  const [showSelect, setShowSelect] = useState(false);

  let count = 0;

  const [getTransactions, { data, isLoading, isSuccess, isError }] =
    useLazyGetTransactionsQuery();

  useEffect(() => {
    if (!showSelect) {
      getTransactions({
        type: state?.filterType,
        period: state?.period,
        startDate: state?.startDate,
        endDate: state?.endDate,
        page,
      });
      setLastUsed(state);
    }
  }, [state, page]);

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
    count = data?.count;

    if (data.data.length === 0) {
      content = <p>No Transactions</p>;
    } else {
      content = data.data.map((transaction, index) => {
        if (display === "table") {
          return (
            <TableRow key={transaction?.id}>
              <TableCell>{index + (+page - 1) * 20 + 1}</TableCell>
              <TableCell>
                {format(transaction?.date ?? "", "EE dd MMM")}
              </TableCell>
              <TableCell>{transaction?.category}</TableCell>
              <TableCell>{transaction?.description}</TableCell>
              <TableCell>{transaction?.details}</TableCell>
              <TableCell>{transaction?.currency}</TableCell>
              <TableCell
                className={
                  transaction?.type === "expense"
                    ? "text-red-600"
                    : transaction?.type === "income"
                    ? "text-green-700"
                    : "text-zinc-800"
                }
              >
                {transaction?.amount.toLocaleString("en-us")}
              </TableCell>
              <TableCell>{transaction?.paymethod}</TableCell>
            </TableRow>
          );
        } else
          return (
            <CardTransaction key={transaction?.id} transaction={transaction} />
          );
      });
    }
  }

  return (
    <main>
      {/* Header */}
      <header className="flex items-stretch gap-2">
        <ClipboardMinus size={30} />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Report</h1>
          <p className="text-sm">View Transactions</p>
        </div>
        <div className="relative my-auto">
          <div
            onClick={() => setShowSelect(true)}
            className="my-auto p-2 bg-stone-50 hover:bg-stone-100 duration-200 rounded-lg text-end"
          >
            <p className="text-xs text-stone-500">Show transactions for</p>
            <p className="text-base text-stone-900">
              <span>{format(state?.startDate ?? "", "EE dd MMM")}</span>
              {state?.period === "day" ? null : (
                <span> - {format(state?.endDate ?? "", "EE dd MMM")}</span>
              )}
            </p>
          </div>
        </div>
      </header>
      {/* Summary Income / Expense */}
      <div className="flex flex-wrap items-stretch gap-4 justify-center">
        <div className="py-2 px-4 bg-green-800/20 text-green-800 rounded-lg font-bold flex-1 flex items-center justify-between">
          <p className="">
            <GiReceiveMoney size={30} />
          </p>
          <p className="space-x-2">
            <span>{"KZT"}</span>
            <span>{income.toLocaleString("en-us")}</span>
          </p>
        </div>
        <div className="py-2 px-4 bg-red-700/20 text-red-700 rounded-lg font-bold flex-1 flex items-center justify-between">
          <p>
            <GiPayMoney size={30} />
          </p>
          <p className="space-x-2">
            <span>{"KZT"}</span>
            <span>{expense.toLocaleString("en-us")}</span>
          </p>
        </div>
      </div>
      {/* Content */}
      {display === "card" ? (
        <div className="flex flex-col gap-4">{content}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className="">Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead className="">Amount</TableHead>
              <TableHead className="">Account</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{content}</TableBody>
        </Table>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDisplay("table")}
            className={
              (display === "table" ? "bg-zinc-300" : "bg-zinc-100") +
              " p-1 rounded-lg duration-200"
            }
          >
            <Rows3 size={25} />
          </button>
          <button
            onClick={() => setDisplay("card")}
            className={
              (display === "card" ? "bg-zinc-300" : "bg-zinc-100") +
              " p-1 rounded-lg duration-200"
            }
          >
            {" "}
            <List size={25} />
          </button>
        </div>
        <Pagination count={count} />
      </div>
      {showSelect && (
        <FormFilterTransactions
          setShowForm={setShowSelect}
          setState={setState}
          state={state}
        />
      )}
    </main>
  );
}
