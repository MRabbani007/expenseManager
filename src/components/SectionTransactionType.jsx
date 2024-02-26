import React, { useContext } from "react";
import IMG_expense from "../assets/expense.png";
import IMG_income from "../assets/income.png";
import IMG_budget from "../assets/budget.png";
import { GlobalContext } from "../context/GlobalState";

const SectionTransactionType = () => {
  const { transactionType, handleType } = useContext(GlobalContext);

  return (
    <div className="cursor-pointer">
      <img
        src={IMG_income}
        alt=""
        className={
          (transactionType === "income" ? "" : "hidden") + " w-12 min-w-12"
        }
        onClick={() => handleType("expense")}
      />
      <img
        src={IMG_expense}
        alt=""
        className={
          (transactionType === "expense" ? "" : "hidden") + " w-12 min-w-12"
        }
        onClick={() => handleType("income")}
      />
    </div>
  );
};

export default SectionTransactionType;
