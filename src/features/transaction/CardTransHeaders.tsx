import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { getDate } from "@/lib/date";
import { CURRENCY_OBJ, TYPE_OBJ } from "@/lib/data";

interface Props {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
}

export default function CardTransHeaders({
  transaction,
  setTransaction,
}: Props) {
  const [state, setState] = useState(transaction);

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
    setState((curr) => ({ ...curr, date: getDate(date ?? new Date()) }));
  };

  useEffect(() => {
    setTransaction(state);
  }, [state]);

  return (
    <div className="flex flex-wrap items-stretch gap-2">
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
