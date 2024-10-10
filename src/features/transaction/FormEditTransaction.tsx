import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import CardTransHeaders from "./CardTransHeaders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiCheck, BiX } from "react-icons/bi";
import CardTransDesc from "./CardTransDesc";
import { useEditTransactionMutation } from "./transactionApiSlice";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

export default function FormEditTransaction({
  transaction,
  setEdit,
}: {
  transaction: Transaction;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [editTransaction] = useEditTransactionMutation();
  const [state, setState] = useState<Transaction>(transaction);

  const onSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      const response = await editTransaction(state);

      if (response?.data) {
        toast.success("Transaction saved");
      } else {
        toast.error("Error updating transaction");
      }
      setEdit(false);
    } catch (error) {
      toast.error("Error updating transaction");
    }
  };

  const onReset = () => {
    setEdit(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-400/70">
      <form
        onSubmit={onSubmit}
        onReset={onReset}
        className="bg-zinc-100 flex flex-col gap-4 max-w-[1024px]"
      >
        <p className="bg-zinc-300 py-2 px-4 font-semibold text-zinc-900 text-center">
          Edit Transaction
        </p>
        <div className="p-8 space-y-4">
          <CardTransHeaders transaction={state} setTransaction={setState} />
          <CardTransDesc transaction={state} setTransaction={setState} />
          <div>
            <Label htmlFor="amount"></Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={state?.amount ?? 0}
              onChange={(e) =>
                setState((curr) => {
                  return { ...curr, amount: +e.target.value };
                })
              }
            />
          </div>
        </div>
        <div className="mx-auto">
          <Button type="submit" variant="ghost">
            <BiCheck size={30} />
          </Button>
          <Button type="reset" variant="ghost">
            <BiX size={30} />
          </Button>
        </div>
      </form>
    </div>
  );
}
