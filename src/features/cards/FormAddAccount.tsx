import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import FormContainer from "../../components/forms/FormContainer";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { T_AccountInfo } from "@/lib/templates";
import RadioGroup from "@/components/RadioGroup";

// const ACCOUNT_TYPES = [
//   { label: "Bank Account", value: "card" },
//   { label: "Cash", value: "cash" },
//   { label: "Savings", value: "savings" },
// ];

export default function FormAddAccount({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, setState] = useState(T_AccountInfo);
  const [tab, setTab] = useState("selectType");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <FormContainer onSubmit={onSubmit} closeForm={setAdd} title="Add Account">
      <RadioGroup
        label="Account Type"
        name="type"
        options={[]}
        value={state?.type}
        onChange={(_, val) => setState((curr) => ({ ...curr, type: val }))}
      />
      {/* <Tabs defaultValue="selectType">
        <TabsList>
          <TabsTrigger value="bankCard">Card</TabsTrigger>
          <TabsTrigger value="cash">Cash</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>
        <TabsContent value="bankCard" className="flex flex-col gap-4">
          <Input type="text" placeholder="Bank Name" />
          <Input type="text" placeholder="Card Name" />
          <Input type="text" placeholder="Card Expiry" />
        </TabsContent>
        <TabsContent value="cash">
          <Input type="text" placeholder="Wallet Name" />
        </TabsContent>
        <TabsContent value="savings">
          <Input type="text" placeholder="Savings Name" />
        </TabsContent>
      </Tabs> */}
    </FormContainer>
  );
}
