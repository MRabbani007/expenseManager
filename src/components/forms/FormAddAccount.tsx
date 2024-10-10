import { Dispatch, SetStateAction, useState } from "react";
import FormContainer from "./FormContainer";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const ACCOUNT_TYPES = [
//   { label: "Bank Account", value: "card" },
//   { label: "Cash", value: "cash" },
//   { label: "Savings", value: "savings" },
// ];

const initialState = {
  userID: "",
  type: "",
  name: "",
};

export default function FormAddAccount({
  setAdd,
}: {
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const [state, setState] = useState(initialState);
  const [tab, setTab] = useState("selectType");

  const onSubmit = () => {
    return null;
  };

  return (
    <FormContainer onSubmit={onSubmit} closeForm={setAdd} title="Add Account">
      <Tabs defaultValue="selectType">
        <TabsList>
          <TabsTrigger value="bankCard">Card</TabsTrigger>
          <TabsTrigger value="Cash">Cash</TabsTrigger>
          <TabsTrigger value="Savings">Savings</TabsTrigger>
        </TabsList>
        {/* <TabsContent value={"selectType"}>
          <select
            value={state?.type}
            onChange={(e) => {
              setState((curr) => ({ ...curr, type: e.target.value }));
              setTab(e.target.value);
            }}
          >
            {ACCOUNT_TYPES.map((item, idx) => (
              <option value={item.label} key={idx}>
                {item.label}
              </option>
            ))}
          </select>
        </TabsContent> */}
        <TabsContent value="bankCard">
          <Input type="text" placeholder="Bank Name" />
          <Input type="text" placeholder="Card Name" />
          <Input type="text" placeholder="Card Expiry" />
        </TabsContent>
        <TabsContent value="Cash">
          <Input type="text" placeholder="Wallet Name" />
        </TabsContent>
        <TabsContent value="Savings">
          <Input type="text" placeholder="Savings Name" />
        </TabsContent>
      </Tabs>
    </FormContainer>
  );
}
