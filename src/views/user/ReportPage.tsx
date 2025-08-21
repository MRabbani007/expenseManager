import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  useLazyGetSummaryQuery,
  useLazyGetTransactionsQuery,
} from "@/features/transaction/transactionApiSlice";
import { format } from "date-fns";
import { ClipboardMinus, List, Rows3 } from "lucide-react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
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
import FormEditTransaction from "@/features/transaction/FormEditTransaction";
import ToolTip from "@/components/ToolTip";

const initialState: TransactionFilter = {
  filterType: "latest",
  period: "day",
  startDate: getDate(new Date()),
  endDate: getDate(new Date()),
  offset: 0,
};

export default function ReportPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const descId = searchParams.get("descId");

  const [display, setDisplay] = useState("table");

  const [state, setState] = useState<TransactionFilter>(initialState);

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState<Transaction | null>(null);

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

  const [getSummary, { data: summary }] = useLazyGetSummaryQuery();

  useEffect(() => {
    if (!showSelect) {
      getTransactions({
        type: state?.filterType,
        period: state?.period,
        startDate: state?.startDate,
        endDate: state?.endDate,
        page,
        descId,
      });
      getSummary({
        startDate: state?.startDate,
        endDate: state?.endDate,
        descId,
      });
      setLastUsed(state);
    }
  }, [state, page, descId]);

  const handleDescription = (desc: string) => {
    searchParams.set("descId", desc);

    setSearchParams(searchParams);
  };

  const days: string[] = [];

  let content = null;
  let noContent = null;
  let income = 0;
  let expense = 0;

  // const getCategorySummary = (category: string) => {
  //   const catSummary = summary?.breakDown.find(
  //     (item) => item?._id === category
  //   );
  //   return catSummary;
  // };

  if (isLoading) {
    noContent = <p>Loading...</p>;
  } else if (isError) {
    noContent = <p>Error Loading Transactions</p>;
  } else if (isSuccess) {
    if (state?.filterType === "latest") {
      data.data.map((item) => {
        if (item?.type === "expense") {
          expense += item?.amount ?? 0;
        } else if (item?.type === "income") {
          income += item?.amount ?? 0;
        }
      });
    } else {
      income = summary?.totals?.totalIncome ?? 0;
      expense = summary?.totals?.totalSpending ?? 0;
    }
    count = data?.count;
    if (data.data.length === 0) {
      noContent = <p>No Transactions</p>;
    } else {
      data.data.map((item) => {
        const foundDay = days.find((day) => day === item?.date);
        if (!foundDay && item?.date) {
          days.push(item?.date);
        }
      });
      if (display === "table") {
        content = data.data.map((transaction, index) => (
          <RenderTransactionRow
            page={+page}
            index={index}
            key={transaction?.id}
            transaction={transaction}
            setEdit={setEdit}
            setEditItem={setEditItem}
          />
        ));
      } else {
        content = days.map((day) => (
          <div key={day.toString()} className="flex flex-col">
            <p className="font-medium text-zinc-900 text-sm py-2 px-4 bg-zinc-200 rounded-md mb-2 w-fit">
              {format(day ?? "", "EE dd MMM")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
              {data.data
                .filter((item) => item.date === day)
                .map((transaction) => (
                  <RenderTransactionCard
                    key={transaction?.id}
                    transaction={transaction}
                    setEdit={setEdit}
                    setEditItem={setEditItem}
                  />
                ))}
            </div>
          </div>
        ));
      }
    }
  }

  // const summaryCategories = Array.from(
  //   new Map(
  //     summary?.breakDown.map((item) => [item?.categoryId, item.categoryLabel])
  //   )
  // );

  const summaryTotal = summary?.breakDown.reduce(
    (prev, curr) => prev + curr.spending,
    0
  );

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
      <div className="flex flex-wrap items-stretch gap-2">
        {Array.isArray(summary?.breakDown) &&
          [...summary?.breakDown]
            .sort((a, b) => (a.spending > b.spending ? -1 : 1))
            .map((item, idx) => {
              // const catSummary = getCategorySummary(item.label);
              return (
                <div
                  key={idx}
                  onClick={() => handleDescription(item?._id)}
                  className="flex flex-col items-center gap-2 bg-zinc-100 rounded-lg py-2 px-6"
                >
                  <ToolTip title={item?.descLabel ?? ""}>
                    <img
                      src={item?.descIcon}
                      className="w-10 max-h-12 mx-auto"
                    />
                    {/* <p className="font-semibold text-mono"></p> */}
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-mono">
                        {item.spending.toLocaleString("en-us")}
                      </p>
                      {item?.income !== 0 && (
                        <p className="font-semibold text-mono">
                          {item.income.toLocaleString("en-us")}
                        </p>
                      )}
                    </div>
                  </ToolTip>
                </div>
              );
            })}
        <div
          title={"Total Spent"}
          className="flex flex-col items-center gap-2 bg-zinc-100 rounded-lg py-2 px-6"
        >
          <p className="font-semibold text-mono">Total</p>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-mono">
              {summaryTotal?.toLocaleString("en-us")}
            </p>
          </div>
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
              {/* <TableHead className="">Category</TableHead> */}
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
      {noContent && <div>{noContent}</div>}
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
      {edit && editItem && (
        <FormEditTransaction transaction={editItem} setEdit={setEdit} />
      )}
    </main>
  );
}

function RenderTransactionRow({
  page,
  index,
  transaction,
  setEdit,
  setEditItem,
}: {
  page: number;
  index: number;
  transaction: Transaction;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditItem: Dispatch<SetStateAction<Transaction | null>>;
}) {
  return (
    <TableRow
      key={transaction?.id}
      onClick={() => {
        setEdit(true);
        setEditItem(transaction);
      }}
    >
      <TableCell>{index + (+page - 1) * 20 + 1}</TableCell>
      <TableCell>{format(transaction?.date ?? "", "EE dd MMM")}</TableCell>
      {/* <TableCell>{transaction?.category}</TableCell> */}
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
}

function RenderTransactionCard({
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

  return (
    <div
      onClick={() => {
        setEdit(true);
        setEditItem(transaction);
      }}
      className={
        "flex justify-start items-stretch gap-4 bg-zinc-100 pl-4 group rounded-lg"
      }
    >
      <div className="my-auto">
        <img src={image} alt="desc" className="w-10" />
        {/* {transaction?.descId?.toString()} */}
      </div>
      <div className="flex-1 py-2 my-auto grid grid-cols-1">
        <p className="font-medium">{transaction?.details}</p>
        <p className="font-bold">{transaction.description}</p>
        <p className="md:hidden font-semibold text-zinc-700">
          {transaction.category}
        </p>
      </div>
      <div className="flex-1 py-2 px-4 my-auto grid grid-cols-1 text-end">
        <p
          className={
            transaction?.type === "expense"
              ? "text-red-700"
              : transaction?.type === "income"
              ? "text-green-700"
              : "text-zinc-800"
          }
        >
          <span className="font-bold text-lg">
            {transaction.amount?.toLocaleString("en-US")}
          </span>
          <span className="text-sm ml-1">{transaction.currency}</span>
        </p>
        <p className="font-semibold text-zinc-700 text-sm">
          {transaction.paymethod}
        </p>
        <p className="md:hidden">
          {format(transaction?.date ?? "", "EE dd MMM")}
        </p>
      </div>
    </div>
  );
}
