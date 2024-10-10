import { Dispatch, SetStateAction } from "react";
import FormContainer from "./FormContainer";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function FormAddPayment({
  setAdd,
  type,
}: {
  type: string;
  setAdd: Dispatch<SetStateAction<boolean>>;
}) {
  const onSubmit = () => {
    return null;
  };

  return (
    <FormContainer onSubmit={onSubmit} closeForm={setAdd} title={"Add " + type}>
      <div className="flex items-center gap-4">
        <Label htmlFor="name">Payment</Label>
        <Input type="number" id="name" />
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="amount">Amount</Label>
        <Input type="number" id="amount" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input type="radio" name="recurring" id="ondate" />
          <label htmlFor="ondate">Once</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="recurring" id="monthly" />
          <label htmlFor="monthly">Monthly</label>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" name="recurring" id="weekly" />
          <label htmlFor="weekly">Weekly</label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="dueDate">dueDate</Label>
        <Input type="date" id="dueDate" />
      </div>
    </FormContainer>
  );
}
