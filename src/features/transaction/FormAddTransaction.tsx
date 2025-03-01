import { T_Transaction } from "@/lib/templates";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useAddTransactionMutation } from "./transactionApiSlice";
import FormContainer from "@/components/forms/FormContainer";
import { Input } from "@/components/ui/input";
import InputField from "@/components/InputField";
import { useAppSelector } from "@/app/hooks";
import {
  selectSelectedDescriptions,
  selectUserDescriptions,
} from "../globals/globalsSlice";
import SelectField from "@/components/SelectField";
import { ChevronRight } from "lucide-react";

const currencyOptions = [
  { label: "KZT", value: "KZT", image: "images/currency/tenge.png" },
  { label: "RUB", value: "RUB", image: "images/currency/ruble.png" },
  { label: "USD", value: "USD", image: "images/currency/dollar.png" },
  { label: "EUR", value: "EUR", image: "images/currency/euro.png" },
];

export default function FormAddTransaction({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [addTransaction] = useAddTransactionMutation();
  const [expandDesc, setExpandDesc] = useState(false);

  const [state, setState] = useState<Transaction>(T_Transaction);

  const onSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      const response = await addTransaction(state);

      if (response?.data) {
        toast.success("Transaction saved");
      } else {
        toast.error("Error adding transaction");
      }
    } catch (error) {
      toast.error("Error adding transaction");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleDesc = (desc: Description) => {
    setState((curr) => ({
      ...curr,
      category: desc.category,
      description: desc.value,
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
      closeForm={setAdd}
      onSubmit={onSubmit}
      title="Add Transaction"
    >
      <div>
        <p className="text-sm font-medium">Category</p>
        <Input
          type="text"
          placeholder="Category"
          name="category"
          value={state?.category ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
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
          className={
            (expandDesc
              ? ""
              : " h-0 invisible opacity-0 -translate-y-4 overflow-hidden ") +
            " flex flex-wrap items-stretch gap-2 group/desc duration-200"
          }
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
        <Input
          type="text"
          placeholder="Description"
          name="description"
          value={state?.description ?? ""}
          onChange={handleChange}
        />
      </div>
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
