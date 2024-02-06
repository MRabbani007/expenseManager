import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import CardCurrency from "./CardCurrency";
import SectionTransactionType from "./SectionTransactionType";

const SectionAddTransaction = () => {
  const {
    description,
    category,
    transactionType,
    currency,
    paymethod,
    transactionDate,
    addTransaction,
  } = useContext(GlobalContext);

  const [amount, setAmount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    addTransaction({
      id: crypto.randomUUID(),
      type: transactionType,
      date: transactionDate,
      category: category,
      description: description,
      amount: amount,
      paymethod: paymethod,
      currency: currency,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex lg:flex-row flex-col items-center">
        <div className="flex justify-center items-center gap-3 my-3">
          <CardCurrency />
          <SectionTransactionType />
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className=" h-[40px]"
          />
          <button type="submit" className="btn btn-red h-[40px]">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default SectionAddTransaction;
