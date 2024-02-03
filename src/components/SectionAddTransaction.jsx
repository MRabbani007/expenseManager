import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { getDate } from "../data/utils";
import CardCurrency from "./CardCurrency";

const SectionAddTransaction = () => {
  const [amount, setAmount] = useState(0);
  const [paymethod, setPayMethod] = useState("Halyk");

  const {
    description,
    category,
    transactionType,
    currency,
    transactionDate,
    handleDate,
    addTransaction,
  } = useContext(GlobalContext);

  const handleAdd = (event) => {
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
    <form action="" onSubmit={handleAdd} className="flex flex-col">
      <div className="flex items-center">
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => handleDate(e.target.value)}
          className=" h-[40px]"
        />
        {/* <label htmlFor="amount">Amount</label> */}
        <CardCurrency />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className=" h-[40px]"
        />
        <select
          name="paymethod"
          id=""
          value={paymethod}
          onChange={(e) => setPayMethod(e.target.value)}
          className="btn btn-red mx-3 h-[40px]"
        >
          <option value="Halyk">Halyk</option>
          <option value="Kaspi">Kaspi</option>
          <option value="Cash">Cash</option>
        </select>
        <button type="submit" className="btn btn-red h-[40px]">
          Add
        </button>
      </div>
      <div className="flex items-center"></div>
    </form>
  );
};

export default SectionAddTransaction;
