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
        return <CardTransaction key={index} transaction={transaction} />;
      });
    }
  }

  return <div className="flex flex-col gap-2">{content}</div>;
}
