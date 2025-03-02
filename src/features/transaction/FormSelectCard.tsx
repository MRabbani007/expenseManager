import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useLazyGetAccountsQuery } from "../cards/accountSlice";
import FormContainer from "@/components/forms/FormContainer";
import { DatePicker } from "@/components/ui/datepicker";
import { getDate } from "@/lib/date";
import RadioGroup from "@/components/RadioGroup";
import { CURRENCY_OPTIONS } from "@/lib/data";

export default function FormSelectCard({
  transaction,
  setTransaction,
}: {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
}) {
  const [getAccounts, { data, isSuccess }] = useLazyGetAccountsQuery();

  const userAccounts = isSuccess ? data?.data : [];

  const [state, setState] = useState(transaction);
  const [show, setShow] = useState(false);

  const displayCards = [
    ...userAccounts.filter((item) => item?.type === "card"),
    ...userAccounts?.filter((item) => item?.type === "cash"),
  ];

  const [selected, setSelected] = useState<AccountInfo | null>(
    displayCards?.length ? displayCards[0] : null
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setTransaction(() => ({
      ...state,
      paymethod: selected?.name ?? "",
      accountId: selected?._id ?? "",
    }));
    setShow(false);
  };

  useEffect(() => {
    getAccounts(null);
  }, []);

  useEffect(() => {
    setState(transaction);
  }, [transaction]);

  useEffect(() => {
    setSelected(() => {
      if (!displayCards?.length) return null;
      else if (transaction) {
        return (
          displayCards?.find((item) => item._id === transaction?.accountId) ??
          null
        );
      } else return displayCards[0];
    });
  }, [data?.data, state]);

  const handleDate = (date: Date | undefined) => {
    setState((curr) => ({ ...curr, date: getDate(date ?? new Date()) }));
  };

  const selectedColor =
    selected?.type === "card"
      ? selected?.color === "green"
        ? "from-green-700 to-green-950 text-white"
        : selected?.color === "red"
        ? "from-red-700 to-red-950 text-white"
        : selected?.color === "blue"
        ? "from-blue-700 to-sky-950 text-white"
        : "from-stone-700 to-zinc-950 text-white"
      : "from-zinc-200 to-zinc-300";

  return (
    <div>
      <button
        onClick={() => setShow(true)}
        className={
          " bg-gradient-to-br py-2 px-4 text-sm rounded-md duration-200 " +
          selectedColor
        }
      >
        {selected?.name}
      </button>
      {show && (
        <FormContainer
          closeForm={setShow}
          onSubmit={onSubmit}
          title="Select Account"
        >
          <div>
            <p className="text-sm font-medium">Transaction Date</p>
            <DatePicker
              date={
                typeof state?.date === "string"
                  ? new Date(state?.date)
                  : new Date()
              }
              setDate={handleDate}
            />
          </div>
          <RadioGroup
            label="Type"
            value={state?.type}
            name="type"
            options={[
              { label: "Expense", value: "expense" },
              { label: "Income", value: "income" },
            ]}
            onChange={(_, val) =>
              setState((curr) => ({ ...curr, type: val as TransactionType }))
            }
          />
          <div>
            <p className="text-sm font-medium">Account</p>
            <div className="flex items-stretch gap-4">
              {displayCards?.map((item) => {
                const color =
                  item.type === "card"
                    ? item?.color === "green"
                      ? "from-green-700 to-green-950 text-white"
                      : item?.color === "red"
                      ? "from-red-700 to-red-950 text-white"
                      : item?.color === "blue"
                      ? "from-blue-700 to-sky-950 text-white"
                      : "from-stone-700 to-zinc-950 text-white"
                    : "from-zinc-200 to-zinc-300";

                return (
                  <button
                    key={item?.id}
                    type="button"
                    onClick={() => setSelected(item)}
                    className={
                      " bg-gradient-to-br py-2 px-4 rounded-md " +
                      (selected?.id === item?.id
                        ? " ring-2 ring-yellow-400 "
                        : " ") +
                      color
                    }
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
          <RadioGroup
            label="Currency"
            name="currency"
            value={state?.currency}
            options={CURRENCY_OPTIONS}
            onChange={(_, currency) =>
              setState((curr) => ({ ...curr, currency: currency as Currency }))
            }
            showIcon={true}
          />
        </FormContainer>
      )}
    </div>
  );
}
