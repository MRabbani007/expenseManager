import React, { useContext } from "react";
// Imported Components
import { GlobalContext } from "../context/GlobalState";
import CardTableHeader from "./CardTableHeader";
import CardExpense from "./CardExpense";

const SectionViewTransactions = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <table className="mx-auto">
      <thead>
        <CardTableHeader />
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          return (
            <CardExpense transaction={transaction} key={index} index={index} />
          );
        })}
      </tbody>
    </table>
  );
};

export default SectionViewTransactions;
