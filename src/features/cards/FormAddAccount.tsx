import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import FormContainer from "../../components/forms/FormContainer";
import { T_AccountInfo } from "@/lib/templates";
import RadioGroup from "@/components/RadioGroup";
import InputField from "@/components/InputField";
import { useAddAccountMutation } from "./accountSlice";
import toast from "react-hot-toast";
import {
  ACCOUNT_TYPES,
  CARD_COLOR_OPTIONS,
  CASH_OPTIONS,
  SAVINGS_OPTIONS,
} from "@/lib/data";

export default function FormAddAccount({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [addAccount] = useAddAccountMutation();
  const [state, setState] = useState(T_AccountInfo);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await addAccount(state);
      toast.success("Account Created");
      setAdd(false);
    } catch (error) {
      toast.error("Error creating account");
    }
  };

  return (
    <FormContainer onSubmit={onSubmit} closeForm={setAdd} title="Add Account">
      <RadioGroup
        label="Account Type"
        name="type"
        options={ACCOUNT_TYPES}
        value={state?.type}
        onChange={(_, val) => setState((curr) => ({ ...curr, type: val }))}
      />
      <InputField
        label="Account Name"
        name="name"
        type="text"
        value={state?.name ?? ""}
        handleChange={handleChange}
      />
      {state?.type === "card" && (
        <>
          <InputField
            label="Bank Name"
            name="bank"
            type="text"
            value={state?.bank ?? ""}
            handleChange={handleChange}
          />
          <InputField
            label="Name on Card"
            name="nameOnCard"
            type="text"
            value={state?.nameOnCard ?? ""}
            handleChange={handleChange}
          />
          <RadioGroup
            label="Color"
            name="color"
            value={state?.color ?? ""}
            onChange={(_, color) => setState((curr) => ({ ...curr, color }))}
            options={CARD_COLOR_OPTIONS}
            showIcon={true}
          />
        </>
      )}

      {state?.type === "cash" && (
        <RadioGroup
          label="Icon"
          name="icon"
          options={CASH_OPTIONS}
          value={state?.icon ?? ""}
          onChange={(_, icon) => setState((curr) => ({ ...curr, icon }))}
          showIcon={true}
        />
      )}
      {state?.type === "savings" && (
        <RadioGroup
          label="Icon"
          name="icon"
          options={SAVINGS_OPTIONS}
          value={state?.icon ?? ""}
          onChange={(_, icon) => setState((curr) => ({ ...curr, icon }))}
          showIcon={true}
        />
      )}
    </FormContainer>
  );
}
