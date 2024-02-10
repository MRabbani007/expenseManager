import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const CardDatePayMethod = () => {
  const { paymethod, transactionDate, handlePayMethod, handleDate } =
    useContext(GlobalContext);
  return (
    <div className="flex items-center justify-center">
      <input
        type="date"
        value={transactionDate}
        onChange={(e) => handleDate(e.target.value)}
        className=" h-[40px]"
      />
      <select
        name="paymethod"
        id=""
        value={paymethod}
        onChange={(e) => handlePayMethod(e.target.value)}
        className="btn btn-red mx-3 h-[40px]"
      >
        <option value="Halyk">Halyk</option>
        <option value="Kaspi">Kaspi</option>
        <option value="Cash">Cash</option>
      </select>
    </div>
  );
};

export default CardDatePayMethod;
