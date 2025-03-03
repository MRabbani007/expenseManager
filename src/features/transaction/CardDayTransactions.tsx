import { useEffect } from "react";
import { useLazyGetTransactionsQuery } from "./transactionApiSlice";
import { getDate } from "@/lib/date";
import CardTransaction from "./CardTransaction";

export default function CardDayTransactions({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [getTransactions, { data, isLoading, isSuccess, isError }] =
    useLazyGetTransactionsQuery();

  useEffect(() => {
    const temp = transaction?.date ?? getDate(new Date());
    getTransactions({ type: "period", startDate: temp, endDate: temp });
  }, [transaction?.date]);

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
        return <CardTransaction key={item?.id} transaction={item} />;
      });
    }
  }

  return <div className="flex flex-col gap-2">{content}</div>;
}
