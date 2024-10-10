import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { getDate } from "@/lib/date";

// const CURRENCIES = [
//   { label: "KZT", value: "KZT", image: "/images/currency/tenge.png" },
//   { label: "RUB", value: "RUB", image: "/images/currency/ruble.png" },
//   { label: "USD", value: "USD", image: "/images/currency/dollar.png" },
//   { label: "EUR", value: "EUR", image: "/images/currency/euro.png" },
// ];

const CURRENCY_OBJ = {
  KZT: "images/currency/tenge.png",
  RUB: "images/currency/ruble.png",
  USD: "images/currency/dollar.png",
  EUR: "images/currency/euro.png",
};

const TYPE_OBJ = {
  income: "images/income.png",
  expense: "images/expense.png",
};

interface Props {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
}

export default function CardTransHeaders({
  transaction,
  setTransaction,
}: Props) {
  const [state, setState] = useState(transaction);

  // const handleChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   setState((curr) => {
  //     return { ...curr, [event.target.name]: event.target.value };
  //   });
  // };

  const TogglePaymethod = () => {
    setState((curr) => {
      const paymethod =
        curr?.paymethod === "Kaspi"
          ? "Halyk"
          : curr?.paymethod === "Halyk"
          ? "Cash"
          : "Kaspi";
      return { ...curr, paymethod };
    });
  };

  const ToggleCurrency = () => {
    setState((curr) => {
      const currency =
        curr?.currency === "KZT"
          ? "RUB"
          : curr?.currency === "RUB"
          ? "USD"
          : curr?.currency === "USD"
          ? "EUR"
          : "KZT";
      return { ...curr, currency };
    });
  };

  const ToggleType = () => {
    setState((curr) => {
      const type = curr?.type === "income" ? "expense" : "income";
      return { ...curr, type };
    });
  };

  const handleDate = (date: Date | undefined) => {
    if (date) {
      setState((curr) => ({ ...curr, date: getDate(date) }));
    } else {
      setState((curr) => ({ ...curr, date: null }));
    }
  };

  useEffect(() => {
    setTransaction(state);
  }, [state]);

  return (
    <div className="flex flex-wrap items-stretch gap-2">
      <DatePicker
        date={
          typeof state?.date === "string" ? new Date(state?.date) : new Date()
        }
        setDate={handleDate}
      />
      {/* <input
        type="date"
        id="date"
        name="date"
        value={state?.date ?? ""}
        onChange={handleChange}
      /> */}
      {/* <select
        id="paymethod"
        name="paymethod"
        value={state?.paymethod ?? ""}
        onChange={handleChange}
        className="btn btn-red mx-3 h-[40px]"
      >
        <option value="Halyk">Halyk</option>
        <option value="Kaspi">Kaspi</option>
        <option value="Cash">Cash</option>
      </select> */}
      <Button variant="default" onClick={() => TogglePaymethod()}>
        {state.paymethod ?? "Payment"}
      </Button>
      <Button variant="ghost" className="p-0" onClick={() => ToggleCurrency()}>
        <img
          src={CURRENCY_OBJ[state?.currency ?? "KZT"]}
          alt={state?.currency ?? "Currency"}
          className="w-12"
        />
      </Button>
      <Button variant="ghost" className="p-0" onClick={() => ToggleType()}>
        <img
          src={TYPE_OBJ[state?.type ?? "expense"]}
          alt={state?.type ?? "expense"}
          className="w-12"
        />
      </Button>
    </div>
  );
}
