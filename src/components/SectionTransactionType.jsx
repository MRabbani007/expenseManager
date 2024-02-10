import React, { useContext } from "react";
import IMG_expense from "../assets/expense.png";
import IMG_income from "../assets/income.png";
import IMG_budget from "../assets/budget.png";
import { GlobalContext } from "../context/GlobalState";

const SectionTransactionType = () => {
  const { transactionType, handleType } = useContext(GlobalContext);

  return (
    <div className="flex items-center justify-center my-3 gap-3">
      <img
        src={IMG_income}
        alt=""
        className={(transactionType === "income" ? "" : "hidden") + " w-12"}
        onClick={() => handleType("expense")}
      />
      <img
        src={IMG_expense}
        alt=""
        className={(transactionType === "expense" ? "" : "hidden") + " w-12"}
        onClick={() => handleType("income")}
      />
      {/* <img src={IMG_budget} alt="" className="icon-lg" onClick={() => null} /> */}
    </div>
  );
};

export default SectionTransactionType;
