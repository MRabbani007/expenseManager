import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useEditTransactionMutation } from "./transactionApiSlice";
import toast from "react-hot-toast";
import FormContainer from "@/components/forms/FormContainer";
import { DatePicker } from "@/components/ui/datepicker";
import { getDate } from "@/lib/date";
import SelectField from "@/components/SelectField";
import RadioGroup from "@/components/RadioGroup";
import { useAppSelector } from "@/app/hooks";
import {
  selectSelectedDescriptions,
  selectUserDescriptions,
} from "../globals/globalsSlice";
import InputField from "@/components/InputField";
import { ChevronRight } from "lucide-react";

const payMethods = [
  { label: "Halyk", value: "halyk" },
  { label: "Kaspi", value: "kaspi" },
  { label: "Cash", value: "cash" },
];

const currencyOptions = [
  { label: "KZT", value: "KZT", image: "images/currency/tenge.png" },
  { label: "RUB", value: "RUB", image: "images/currency/ruble.png" },
  { label: "USD", value: "USD", image: "images/currency/dollar.png" },
  { label: "EUR", value: "EUR", image: "images/currency/euro.png" },
];

export default function FormEditTransaction({
  transaction,
  setEdit,
}: {
  transaction: Transaction;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editTransaction] = useEditTransactionMutation();
  const [expandDesc, setExpandDesc] = useState(false);

  const [state, setState] = useState<Transaction>(transaction);

  const onSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      await editTransaction(state);
      toast.success("Transaction saved");
      setEdit(false);
    } catch (error) {
      toast.error("Error updating transaction");
    }
  };

  const handleDate = (date: Date | undefined) => {
    setState((curr) => ({ ...curr, date: getDate(date ?? new Date()) }));
  };

  const handleDesc = (desc: Description) => {
    setState((curr) => ({
      ...curr,
      category: desc.category,
      description: desc.value,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const descriptions = useAppSelector(selectUserDescriptions);
  const selectedDescriptions = useAppSelector(selectSelectedDescriptions);

  const [activeDesc, setActiveDesc] = useState<Description[]>([]);

  useEffect(() => {
    const handleActiveDesc = () => {
      setActiveDesc(() => {
        if (!descriptions) return [];

        if (!selectedDescriptions || selectedDescriptions.length === 0) {
          return descriptions?.filter((item) => item?.isSelected === true);
        }

        return descriptions.filter((item) =>
          selectedDescriptions?.find((selDesc) => selDesc.id === item.id)
            ? true
            : false
        );
      });
    };

    handleActiveDesc();
  }, [descriptions, selectedDescriptions]);

  return (
    <FormContainer
      closeForm={setEdit}
      onSubmit={onSubmit}
      title="Update Transaction"
    >
      <div className="flex flex-col">
        <p className="text-sm">Date</p>
        <DatePicker
          date={
            typeof state?.date === "string" ? new Date(state?.date) : new Date()
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
      <SelectField
        label="Card"
        options={payMethods}
        value={state?.paymethod}
        onValueChange={(paymethod) =>
          setState((curr) => ({ ...curr, paymethod }))
        }
      />
      <button
        type="button"
        onClick={() => setExpandDesc((curr) => !curr)}
        className="flex items-center gap-2"
      >
        <span className="text-sm font-medium">Description</span>
        <ChevronRight
          size={20}
          className={(expandDesc ? "rotate-90" : "") + " duration-200"}
        />
      </button>
      <div
        title="Description"
        className="flex flex-wrap items-stretch gap-2 group/desc"
      >
        {activeDesc.map((item, index) => (
          <div key={index} className="">
            <img
              key={index}
              src={item?.icon}
              title={item.label}
              className={
                (state?.description === item.value
                  ? " bg-yellow-300"
                  : " bg-white") +
                " p-1 rounded-lg w-16 hover:scale-110 duration-200"
              }
              onClick={() => handleDesc(item)}
            />
          </div>
        ))}
      </div>
      <InputField
        type="text"
        label=""
        name="description"
        value={state?.description ?? ""}
        handleChange={handleChange}
      />
      <InputField
        label="Details"
        name="details"
        type="text"
        value={state?.details ?? ""}
        handleChange={handleChange}
      />
      <div className="flex flex-wrap items-start gap-4">
        <SelectField
          label="Currency"
          value={state?.currency}
          options={currencyOptions}
          onValueChange={(currency) =>
            setState((curr) => ({ ...curr, currency: currency as Currency }))
          }
        />
        <InputField
          label="Amount"
          name="amount"
          type="number"
          value={state?.amount}
          handleChange={handleChange}
          className="flex-1"
        />
      </div>
    </FormContainer>
  );
}
