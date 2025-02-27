import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAddTransactionMutation } from "./transactionApiSlice";
import { toast } from "react-hot-toast";

interface Props {
  transaction: Transaction;
  setTransaction: Dispatch<SetStateAction<Transaction>>;
}

export default function CardTransAmount({
  transaction,
  setTransaction,
}: Props) {
  const [addTransaction] = useAddTransactionMutation();
  const [amount, setAmount] = useState(transaction?.amount ?? 0);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();

      const response = await addTransaction({
        ...transaction,
        id: crypto.randomUUID(),
      });

      if (response?.data) {
        toast.success("Transaction Saved");
      } else if (response?.error) {
        toast.error("Error saving transaction");
      }
    } catch (error) {
      toast.error("Error saving transaction");
    }
  };

  useEffect(() => {
    setTransaction((curr) => ({ ...curr, amount }));
  }, [amount]);

  useEffect(() => {
    setAmount(transaction?.amount ?? 0);
  }, [transaction]);

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex items-center justify-center gap-2">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
        <Button>Add</Button>
      </div>
    </form>
  );
}
